EBG = EBG || {};
EBG.Adaptors = EBG.Adaptors || {};

EBG.Adaptors.LiveRamp = function(adConfig){
    this.timeoutCalled = false;
    this.maxPreservingWaitTime = 3000;
    this.continueFlowExecuted;
    this.method;
    this.startTime;
    this.timeout;
    this.idString = "";
    this.debuglog ={};
    this.adConfig = adConfig;
    
    // list of id providers and api methods to retreive identifiers.
    // live status reasons
    // 0 : successfull api response. (both for consent and non consent)
    // 1 : no api present 
    // 2: exception occured.
    // 3 : timeout
    
    this.reasons = [0,1,2,3];
};

EBG.Adaptors.LiveRamp.prototype =  {
    
    // entry point function, check if we are in an unfriendly iframe, if so use post message, otherwise call api directly
    // once the ids have been retrieved they will be returned using the callback function passed to the getIds method.
    getIds : function(callback){
        
        try {
            
            this.startTimer(callback);
        
            if (this.adConfig.actualServingMode == "IFRAME" || window.origin == "null" || window.origin == "undefined"){
            this.post(callback);
            }else{
            this.direct(callback);
            }
        } catch (e) {
            
            var logData = {
                lr_status: 2,
                lr_method: this.method,
                lr_origin : "wo:"+window.origin,
                lr_ref: document.referrer,
                lr_sm:this.adConfig.actualServingMode,
                lr_dbgv:"01",
                errinfo: e.message,
                errfunc: "getIds",
                errpos: "none",
                errstack: e.stack ? e.stack.replace(/\(.*\/|(ccfix)/g, '(').replace(/\n(\s)*/g, ' || ').substr(0, 1000) : "none" // remove file location and change new line to double pipe (||). the (ccfix) is to fix a problem with the CC because of //   
            }
            this.log(logData);
            this.continuePreservingFlow(callback,1);
        }
    },

    startTimer: function(callback){

        this.startTime = new Date().getTime();
        var $this = this;
      
        // set a timeout so we can continue the flow regardless of how many ids we collected to not create unwanted latancy.
        this.timeout = setTimeout(function(){
            var ms = new Date().getTime() - $this.startTime;
            var logData = {
                lr_status: 3,
                lr_method: $this.method,
                lr_latency: ms
            }
        
            $this.log(logData);
            $this.continuePreservingFlow(callback,0);
        },this.maxPreservingWaitTime);

    },

    log:function(obj){
        // dont log if we have already continued the flow
        if(this.continueFlowExecuted)return;

        if(Object.assign){
            Object.assign(this.debuglog,obj);          
        }else{
            for( i in obj){
                this.debuglog[i] = obj[i];
            }
        }
    },

    // continue the preserving flow once the provider queue is empty or once we are out of time set by the timeout.
    // provider queue is only relevant for direct calls, when using postMessage
    continuePreservingFlow: function(callback,logError){
        if(!this.continueFlowExecuted){
            this.continueFlowExecuted = true;
            if(this.timeout){
                clearTimeout(this.timeout);
            }
            callback(this.idString,this.debuglog,logError);
        }
    },

    /* we dont want to send anything on the secCall for now, POC will only use logModule.
    addProvider: function(provider,result,ms,flow){
        
        this.idString+="&"+provider+"="+result+"_"+flow+"_"+ms;
    },
    */
   
    // loop through providers and try get an id. if we get 1 then we will attach an id.
    direct: function(callback){
        // get the liveramp envelops from the top page. 
        var $this = this;
        var method = this.method = "direct";
        var logData = {lr_method: method};
        var topMost = EBG.Adaptors.StdWebAdaptor._getTopAccessibleWindow(false) || window;
        
        try{
            var lr = (topMost.ats && topMost.ats.retrieveEnvelope);
            if(lr){
                topMost.ats.retrieveEnvelope(function(lrString){
                    if(lrString){
                        var ms = new Date().getTime() - $this.startTime;
                        var env = JSON.parse(lrString).envelope;

                        logData.lr_result = env;
                        logData.lr_latency = ms;
            
                        
                    }
                    logData.lr_status = 0;
                    $this.log(logData);
                    $this.continuePreservingFlow.apply($this,[callback,0]);      
                }) 
            }else{
                var logData = {
                    lr_status: 1,
                    lr_method: method
                }
            
                $this.log(logData);
                $this.continuePreservingFlow.apply($this,[callback,0]);      

            }
        }catch(e){
            this.post(callback);
        }       
    },
    // try get ids using post message when in unfriendly iframes, if available we will attach the id
    post : function(callback){
         var $this= this;  
         var method = this.method = "post";                                                                 
        // post message event handlers set up to catch the events, ive added how many milliseconds it takes to get the post message back, ive currently set a timeout of 50ms
        // so if we hit that then the ad requests should be sent without the ids.
        window.addEventListener("message",function(event){                             
            var ms = new Date().getTime() - $this.startTime;
                        
            if(event && event.data && event.data.message === 'ats-modules-liveramp-envelope-result'){
                var logData = {
                        lr_status: 0,
                        lr_method: method,
                        lr_latency: ms
                };

                if(event.data.result){
                    var env = JSON.parse(event.data.result).envelope;
                    logData.lr_result = env;
                }

                $this.log(logData);
                $this.continuePreservingFlow.apply($this,[callback,0]);
            }           
        },false);
  
        top.postMessage('ats-modules-liveramp-envelope-request','*');          
    }
};