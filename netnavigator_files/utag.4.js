//tealium universal tag - utag.4 ut4.0.202307240944, Copyright 2023 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={"id":id};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}
var match=/ut\d\.(\d*)\..*/.exec(utag.cfg.v);if(utag.ut.loader===undefined||!match||parseInt(match[1])<41){u.loader=function(o,a,b,c,l,m){utag.DB(o);a=document;if(o.type=="iframe"){m=a.getElementById(o.id);if(m&&m.tagName=="IFRAME"){b=m;}else{b=a.createElement("iframe");}o.attrs=o.attrs||{};utag.ut.merge(o.attrs,{"height":"1","width":"1","style":"display:none"},0);}else if(o.type=="img"){utag.DB("Attach img: "+o.src);b=new Image();}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";}if(o.id){b.id=o.id;}for(l in utag.loader.GV(o.attrs)){b.setAttribute(l,o.attrs[l]);}b.setAttribute("src",o.src);if(typeof o.cb=="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){this.onreadystatechange=null;o.cb();}};}}if(o.type!="img"&&!m){l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l=="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}}};}else{u.loader=utag.ut.loader;}
u.ev={"view":1};u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){utag.DB("send:4");utag.DB(b);var c,d,e,f,key;u.data={"qsp_delim":"&","kvp_delim":"=","base_url":"//cm.g.doubleclick.net/pixel?","google_nid":"tealium_dmp","tealium_selector":"","tealium_trace_id":"","tealium_account":"hkt-cg","tealium_profile":"main","custom":{},"iab_v20_compliance":true,"tc_string":""};utag.DB("send:4:EXTENSIONS");utag.DB(b);c=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(u.data.hasOwnProperty(e[f])){u.data[e[f]]=b[d];}else{u.data.custom[e[f]]=b[d];}}}}
utag.DB("send:4:MAPPINGS");utag.DB(u.data);if(u.data.iab_v20_compliance===true||u.data.iab_v20_compliance==="true"){if(typeof __tcfapi==="function"){__tcfapi("getTCData",2,function(tcData,success){if(success){u.data.tc_string+="gdpr=";if(tcData.gdprApplies===true){u.data.tc_string+="1";}else if(tcData.gdprApplies===false){u.data.tc_string+="0";}else{u.data.tc_string+=String(tcData.gdprApplies);}
u.data.tc_string+="&gdpr_consent="+tcData.tcString;execute_send();}});}else{var frame=window;var cmpFrame;var cmpCallbacks={};while(frame){try{if(frame.frames["__tcfapiLocator"]){cmpFrame=frame;break;}}catch(error){utag.DB(error);}
if(frame===window.top){break;}
frame=frame.parent;}
if(!cmpFrame){execute_send();}else{window.__tcfapi=function(cmd,version,callback,arg){var callId=String(Math.random());var msg={__tcfapiCall:{command:cmd,parameter:arg,version:version,callId:callId}};cmpCallbacks[callId]=callback;cmpFrame.postMessage(msg,"*");};window.tealiumiabPostMessageHandler=function(event){var json={};try{json=typeof event.data==="string"?JSON.parse(event.data):event.data;}catch(error){utag.DB(error);}
var payload=json.__tcfapiReturn;if(payload){if(typeof cmpCallbacks[payload.callId]==="function"){cmpCallbacks[payload.callId](payload.returnValue,payload.success);cmpCallbacks[payload.callId]=null;}}};window.addEventListener("message",tealiumiabPostMessageHandler,false);__tcfapi("getTCData",2,function(tcData,success){if(success){u.data.tc_string+="gdpr=";if(tcData.gdprApplies===true){u.data.tc_string+="1";}else if(tcData.gdprApplies===false){u.data.tc_string+="0";}else{u.data.tc_string+=String(tcData.gdprApplies);}
u.data.tc_string+="&gdpr_consent="+tcData.tcString;execute_send();}});}}}else{execute_send();}
function execute_send(){u.data.tealium_account=u.data.tealium_account||utag.cfg.utid.split("/")[0];u.data.tealium_profile=u.data.tealium_profile||utag.cfg.utid.split("/")[1];c.push("tealium_cookie_sync"+u.data.kvp_delim+"true");c.push("google_nid"+u.data.kvp_delim+u.data.google_nid);c.push("google_cm");c.push("tealium_vid"+u.data.kvp_delim+b["cp.utag_main_v_id"]);c.push("tealium_account"+u.data.kvp_delim+u.data.tealium_account);c.push("tealium_profile"+u.data.kvp_delim+u.data.tealium_profile);if(u.data.tealium_selector){c.push("tealium_selector"+u.data.kvp_delim+u.data.tealium_selector);}
if(u.data.tealium_trace_id){c.push("tealium_trace_id"+u.data.kvp_delim+u.data.tealium_trace_id);}
if(!utag.ut.isEmptyObject(u.data.custom))
for(key in u.data.custom){if(u.data.custom.hasOwnProperty(key)){c.push(key+u.data.kvp_delim+u.data.custom[key]);}}
if(u.data.tc_string){u.data.base_url+=u.data.tc_string+"&"+c.join(u.data.qsp_delim);}else{u.data.base_url+=c.join(u.data.qsp_delim);}
u.loader({"type":"img","src":u.data.base_url});utag.DB("send:4:COMPLETE");}}};utag.o[loader].loader.LOAD(id);}("4","hkt-cg.pcd-web"));}catch(error){utag.DB(error);}
