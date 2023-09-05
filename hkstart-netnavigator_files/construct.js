/* before dom loaded */////////////

/* progress bar */
// paceOptions = {
//    ajax: {
//          trackMethods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
//    }
// }
// Pace.on("done", function(){
//    paceDoneHandler();
//    function paceDoneHandler(){
//         // TweenMax.to($('.wrapper'),0,{ opacity: 1 });
//     }
    
// });




/* get user agent */
var md = new MobileDetect(window.navigator.userAgent);
var os = null;
if( !md.mobile() ){
    // computer os
    os = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? 'mac' : 'windows';
}else{
    // phone os
    os = md.os();
}



// init
console.log(md);
console.log('mobile : ' + md.mobile());
console.log('tablet : ' + md.tablet());
console.log('OS : ' + os);


$(document).ready(function(){
    window.currentPage = getCurrentPage();
    osUniqueContent();
    setBodyDeviceClass();
});




// function
function get_browser() {
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
};


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function osUniqueContent(){
    $(".osUnique").removeClass('active');
    if( os == 'mac' || os == 'windows' ){
        $(".osUnique.computer").addClass('active');
    }
    if( os == 'mac' ){
        $(".osUnique.mac").addClass('active');
    }
    if( os == 'windows' ){
        $(".osUnique.windows").addClass('active');
    }
     if( os == 'iOS' || os == 'AndroidOS' ){
        $(".osUnique.mobile").addClass('active');
    }
    if( os == 'iOS' ){
        $(".osUnique.ios").addClass('active');
    }
    if( os == 'AndroidOS' ){
        $(".osUnique.android").addClass('active');
    }
}




function getCurrentPage(){
    var name = $(location).attr('pathname').split("/").pop();
    // console.log('name:'+name)
    // if( $('.pageMenu').length ){
        var pageMenuItem = $('.pageMenu ul li');
        // console.log('pageMenuItem:'+pageMenuItem)
        if( name ){
            $.each(pageMenuItem.find('a'),function(index,value){
                var href = pageMenuItem.find('a').eq(index).attr('href');
                var re = new RegExp(name, 'g');
                if( href.match(re) ){
                    name = pageMenuItem.find('a').eq(index).text();
                    pageMenuItem.eq(index).addClass('active');
                }
            });
        }else{
            name = pageMenuItem.find('a').eq(0).text();
            pageMenuItem.eq(0).addClass('active');
        }
    // }else{
    //     name = 'hihi';
    // }
    return name;
};




function setBodyDeviceClass(){
    var currentBodyClass = null;
    set();
    $(window).resize(function() {
        set();
    });
    function set(){  
        var bodyClass = null;
        var windowW = $(window).width();
        if( windowW <= 640 ){
            bodyClass = 'mobile';
        }else if( windowW <= 800 ){
            bodyClass = 'tablet';
        }else if( windowW <= 1280 ){
            bodyClass = 'laptop';
        }else{
            bodyClass = 'desktop';
        }
        if( currentBodyClass !== bodyClass ){
            currentBodyClass = bodyClass;
            $('body').removeClass('desktop laptop tablet mobile');
            $('body').addClass(bodyClass);
        }
        return bodyClass; 
    } 
};