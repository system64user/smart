/* after dom loaded */////////////
// pace when ajax start
$(document).ajaxStart(function() {
    Pace.restart();
});

	var screenWidth = $(window).width();
	var screenHeight = $(window).height();
$(document).ready(function(){

    console.log('currentPage : '+currentPage);
	var pname = location.pathname.substring(5);
    /* global var */
    window.lastScrollTop = $(window).scrollTop();
	
	/* init */
    setBodyDeviceClass();
	
	if ((pname == "index.html")||(pname == "aboutus/contact-us.html")){
		stickcallbtn();
	}else{
		setMobileKeyBtn();
	}

	templateStatus();
	
    /* controller */
    siteMapController();
    pageMenuController();
    headerController();
    extendContentController();
    popupController();
    collapsedController();
    inputController();
    tableCollapsedController();

    /* other */
    validaterAddMethod();
	
	$("#loginarea, #logoutplate").hide();

	if (screen.width == 320){
		var totalheight = $("header").outerHeight();
	}else if (screen.width > 640){
		var totalheight = $("#loginicon").outerHeight();
	}
	
	$("#loginicon").mouseover(function(){
		$("#loginarea").css({"display":"block","top":totalheight+"px"}).slideDown(800);
		$("#logoutplate").show();
		console.log(totalheight);
	});
	$("#loginicon").mouseout(function(){
		$("#loginarea").css({"display":"none","top":totalheight+"px"}).slideUp(800);
		$("#logoutplate").hide();
		console.log(totalheight);
	});

});

/* global function */////////////

function stickcallbtn(){
	if (lang=="chi"){
		var callbtn = '<div class="btnGroup"><a href="tel:28881888" class="btn gradientOrange large keyBtn heightzero"><span class="callicon"></span>按此通話</a></div>';
	}else{
		var callbtn = '<div class="btnGroup"><a href="tel:28880008" class="btn gradientOrange large keyBtn heightzero"><span class="callicon"></span>Click to call</a></div>';
	}
	
	$("#floating .cloneKeyBtn").html(callbtn);
}


var getScrollPos = function(){
    var current = $(document).scrollTop();
    var pageMenuPos = $('#visual .base').offset().top - $('header .netvigator').height();
    var ScrollPos = { area: null, direction: null };
    // var area = null;
    // var direction = null;
    // define scrollPos
    if ( current <= $('#visual').offset().top ){
        ScrollPos.area = 'documentTop';
    }else if( $('.pageMenu').length ){ // check if pageMenu exist
        if( current < pageMenuPos ){
            ScrollPos.area = 'beforePageMenu';
        }else{
            ScrollPos.area = 'afterPageMenu';
        }
    }else{
        ScrollPos.area = current;
    }
    // scroll direction
	
    if( current < lastScrollTop ){
        // upscroll code
        ScrollPos.direction = 'up';
    }else if( current > lastScrollTop ){
        // downscroll code
        ScrollPos.direction = 'down';
    }
    lastScrollTop = current;
    // console.log('pageMenuPos : '+pageMenuPos+', current : '+current+', ScrollPos.area : '+ScrollPos.area);
    return ScrollPos;
};

var hovered = function(dom){
    dom.hover(function() {
        $(this).addClass('hovered');
    }, function() {
        $(this).removeClass('hovered');
    });
    dom.focus(function() {
        $(this).addClass('hovered');
    });
    $('#main, .sitemap, footer').click(function() {
        dom.removeClass('hovered');
    });
};

var bodyScroll = function(mode){
    if( mode == 'disable' ){
        disableScroll();
    }else if( mode == 'enable' ){
        enableScroll();
    }

    var keys = {37: 1, 38: 1, 39: 1, 40: 1};
    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;
    }
    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }
    function disableScroll() {
        if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        // window.ontouchmove  = preventDefault; // mobile
        $('header .account').bind("touchmove", {}, function(event){
            event.preventDefault();
        });
        document.onkeydown  = preventDefaultForScrollKeys;
    }
    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        // window.ontouchmove = null;
        $('header .account').unbind("touchmove");
        document.onkeydown = null;
    }
};

var templateStatus = function(){
    set(getScrollPos());
    $(window).scroll(function(event) {
        set(getScrollPos());
    });
    function set(scrollPos){
        // console.log(scrollPos.area);
        // header
        if( scrollPos.area == 'documentTop' ){
            $('header').removeClass('lite');
        }else{
            $('header').addClass('lite');
        }
        // page menu
		
        if( scrollPos.area == 'afterPageMenu' ){
            $('.pageMenu').addClass('pin');
			$('.faqmenu').addClass('stickmenu');
        }else{
            $('.pageMenu').removeClass('pin');
			$('.faqmenu').removeClass('stickmenu');
        }
    }
};

var differentAgent = function(){
    $(window).resize(function() {
        var mdNew = new MobileDetect(window.navigator.userAgent);
        if( md.mobile() !== mdNew.mobile() ){
            window.location.reload();
        }
    });
};

var setMobileKeyBtn = function(){
    if( !$('#floating .tools').hasClass('disableKeyBtn') ){
        var pos = null;
        // multi btn
        if ( $('.keyBtn').length ){
            pos = $('.keyBtn').eq(0).offset().top;
            var btn = $('.keyBtn').eq(0).clone();
            //console.log( keyBtn );
            $('#floating .tools .cloneKeyBtn').append(btn);
            $(window).scroll(function(event) {
                var current = $(window).scrollTop() + $(window).height() - btn.height();
                if( current > pos ){
                    $('#floating .tools').addClass('single');
					$('.callicon, .heightzero').css({"display":"none"});
					$('.cloneKeyBtn').css({"width":"0%"});
					//console.log("hide");
                }else{
                    $('#floating .tools').removeClass('single');
					$('.callicon').css({"display":"inline-block"});
					$('.heightzero').css({"display":"block"});
					$('.cloneKeyBtn').css({"width":"50%"});
					//console.log("show");
                }
				//console.log('disable keyBtn function');
            });
            $(window).resize(function(event) {
                pos = $('.keyBtn').eq(0).offset().top;
            });
        }else{
            $('#floating .tools').addClass('single'); // temp
            //console.log('no .keyBtn element, use default');
        }
    }else{
        // single btn
        $('#floating .tools').addClass('single');
		
        //console.log('disable keyBtn function');
    }
};
/*
var setMobileKeyBtn_nothide = function(){
    if( !$('#floating .tools').hasClass('disableKeyBtn') ){
        var pos = null;
        // multi btn
        if ( $('.keyBtn').length ){
            pos = $('.keyBtn').eq(0).offset().top;
            var btn = $('.keyBtn').eq(0).clone();
            //console.log( keyBtn );
            $('#floating .tools .cloneKeyBtn').append(btn);
            $(window).scroll(function(event) {
                var current = $(window).scrollTop() + $(window).height() - 1000;
                if( current > pos ){
                    $('#floating .tools').addClass('single');
					$('.callicon, .heightzero').css({"display":"none"});
					$('.cloneKeyBtn').css({"width":"0%"});
					console.log("hide");
                }else{
                    $('#floating .tools').removeClass('single');
					$('.callicon').css({"display":"inline-block"});
					$('.heightzero').css({"display":"block"});
					$('.cloneKeyBtn').css({"width":"50%"});
					console.log("show");
                }
				//console.log('disable keyBtn function');
            });
            $(window).resize(function(event) {
                pos = $('.keyBtn').eq(0).offset().top;
            });
        }else{
            $('#floating .tools').addClass('single'); // temp
            //console.log('no .keyBtn element, use default');
        }
    }else{
        // single btn
        $('#floating .tools').addClass('single');
		
        //console.log('disable keyBtn function');
    }
};
*/
var documentScrollTo = function(dom){
    var pos = dom.offset().top - $('header').height() - $('.pageMenu').height();
    TweenMax.to($('html,body'),0.5,{scrollTop:pos});
}

var headerController = function(){
    // menu btn
    $('#btn-menu-mobile').click(function(){
        if ( !$(this).hasClass('open') ){
            mainMenuOpen();
            accountMenuClose();
            bodyScroll('disable');
        }else{
            mainMenuClose();
            resetMainMenu();
            bodyScroll('enable');
        }
        $(window).scrollTop(lastScrollTop);
        $('header').focus();
    });

    // main menu control
    var mainMenuItem = $('header nav .mainMenu .frame >ul >li');
    hovered(mainMenuItem);
    mainMenuItem.find('.category.parent').click(function(event) {
        var parent = $(this).closest('li');
        if( $('body').hasClass('mobile') ){
            if ( !parent.hasClass('active') ){
                mainMenuItem.removeClass('active');
                mainMenuItem.find('.subMenu').slideUp(500);
                parent.addClass('active');
                parent.find('.subMenu').slideDown(500);
            }else{
                resetMainMenu();
            }
        }
    });

    // account menu control
    var accountMenuItem = $('header .front .account >ul >li');
    hovered(accountMenuItem);
    accountMenuItem.find('>a').click(function(event) {
        var parent = $(this).closest('li');
        if( $('body').hasClass('mobile') ){
            if ( !parent.hasClass('active') ){
                accountMenuOpen(parent);
                mainMenuClose();
                resetMainMenu();
                bodyScroll('disable');
            }else{
                accountMenuClose();
                bodyScroll('enable');
            }
        }
    });
    accountMenuItem.find('.mask').click(function(event) {
        accountMenuClose();
        bodyScroll('enable');
    });

    // information
    var keywordSearch = $('header nav .information .search');
    keywordSearch.find('input').click(function(event) {
        $(this).closest('.search').addClass('active');
    });
    keywordSearch.find('input').focus(function(event) {
        $(this).closest('.search').addClass('active');
    });
    keywordSearch.find('input').blur(function(event) {
        $(this).val('');
        $(this).closest('.search').removeClass('active');
    });



    function mainMenuOpen(){
        $('#btn-menu-mobile').addClass('open');
        $('header').addClass('open');
    }
    function mainMenuClose(){
        $('#btn-menu-mobile').removeClass('open');
        $('header').removeClass('open');
    }
    function resetMainMenu(){
        $('header nav').scrollTop(0);
        mainMenuItem.removeClass('active');
        mainMenuItem.find('.subMenu').slideUp(500);
    };
    function accountMenuOpen(dom){
        dom.addClass('active');
        dom.find('.subMenu').slideDown(500);
        dom.find('.mask').fadeIn(500);
    }
    function accountMenuClose(){
        accountMenuItem.removeClass('active');
        accountMenuItem.find('.subMenu').slideUp(500);
        accountMenuItem.find('.mask').fadeOut(500);
    }
};

var extendContentController = function(){
    /* test */
    // $('.card.fsecureKeycardDownload').addClass('extend');
    // $('*[data-extend-content]').slideDown(400);

    $('*[data-extend-btn]').click(function(event) {
        var rel = $(this).data('extend-btn');
        var hook = $(this).closest('.hook');
        // var hookList = $(this).closest('.hookList');
        var target = $('*[data-extend-content="'+rel+'"]');
        // console.log(target);
        hook.addClass('extend');
        target.slideDown(400);
        $(this).closest('.customBlock').find('.hookList .hook').addClass('dim');
        hook.removeClass('dim');
        // documentScrollTo(target);
        documentScrollTo(target);
    });

    $('*[data-extend-content]').find('.btn-close').click(function(event) {
        var parent = $(this).closest('.content.extend');
        var rel = parent.data('extend-content');
        parent.slideUp(400);
        $(this).closest('.customBlock').find('.hookList .hook').removeClass('dim extend');
        documentScrollTo($(this).closest('.customBlock'));
    });
}

var showPopup = function(popupName){
    $('.popupContainer').addClass('active');
    $('.popup.'+popupName).addClass('active');
    // $('body').addClass('lockScroll');
}

var popupController = function(){
    $('.popupContainer .mask').click(function(event) {
        $('.popupContainer').removeClass('active');
        $('.popup').removeClass('active');
        // $('body').removeClass('lockScroll');
    });
    $('.popup').find('.btn-close').click(function(event) {
        $('.popupContainer').removeClass('active');
        $(this).closest('.popup').removeClass('active');
        // $('body').removeClass('lockScroll');
    });
}

var collapsedController = function(){
    $('.collapsed .switch').click(function(event) {
        var content = $(this).closest('.collapsed').find('.collapsedContent');
        $(this).closest('.collapsed').toggleClass('active');
        content.slideToggle({
            duration: 1000,
            progress: function(){
                if( $('.slider.byNav').length ){
                    $('.slider.byNav').slick('slickSetOption','', '', true);
                }
            },
            complete: function(){
                if( $('.slider.byNav').length ){
                    $('.slider.byNav').slick('slickSetOption','', '', true);
                }
            }
        });
        documentScrollTo(content);
    });
}

var recaptchaRender = function() {
    window.recaptcha1 = grecaptcha.render('recaptcha-1', {
        'sitekey' : '6Ld0wiQUAAAAAI7Za_uCLY36M2sUxo4z42kSoiGm',
        'callback' : recaptchaCallback
    });
    window.recaptcha2 = grecaptcha.render('recaptcha-2', {
        'sitekey' : '6Ld0wiQUAAAAAI7Za_uCLY36M2sUxo4z42kSoiGm',
        'callback' : recaptchaCallback
    });
};


var recaptchaCallback = function() {
    $.each($('.hiddenRecaptcha'), function(index, value){
        $('.hiddenRecaptcha').eq(index).valid();
    })

  // console.log('hiddenRecaptcha validate');
};


var inputFileMaxSize = function(fileInput){
    if (fileInput.files[0] !== undefined && fileInput.files[0].size > 10485760){
        return false;
    }else{
        return true;
    }
    console.log(fileInput.files[0]);
}

/* class object */
// Define a class like this
function Procedure(dom){
   // Add object properties like this
   console.log(this);
   var procedure = this;
    this.dom = dom;
    this.currentIndex = 0; // init index = 0
    this.targetIndex = null;

    // this.setHeight = function (){
    //     var stepHeight = dom.find('.step').eq(this.currentIndex).height();
    //     console.log('stepHeight:'+stepHeight);
    //     dom.find('.stepContainer').height(stepHeight);
    // }
    this.hideAll = function(){
        // dom.find('.step').removeClass('current').hide();
        dom.find('.step').removeClass('current');
    }
    // this.showStep = function(stepName,speed=1000){
    //     dom.find('.'+stepName).addClass('current');
    // }
    this.showIndex = function(index,transition,speed){
        // parameter default value
        if (transition === undefined) {
            transition = true;
        }
        if ( transition ){
            this.setTransition(index);
        }
        dom.find('.step').eq(index).addClass('current');

    }
    this.log = function(){
        console.log('currentIndex:'+this.currentIndex+', targetIndex:'+this.targetIndex);
    }

    this.next = function(option){
        this.targetIndex = this.currentIndex + 1;
        this.hideAll();
        this.showIndex(this.targetIndex);

        this.currentIndex = this.targetIndex;
        this.setStatus();
        if( option == 'noScroll' ){

        }else{
            documentScrollTo(dom);
        }


    }
    this.prev = function(){
        this.targetIndex = this.currentIndex - 1;
        this.hideAll();
        this.showIndex(this.targetIndex);

        this.currentIndex = this.targetIndex;
        this.setStatus();
        documentScrollTo(dom);

    }
    this.goto = function(stepName){
        this.targetIndex = dom.find('.'+stepName).index();
        this.hideAll();
        this.showIndex(this.targetIndex);

        this.currentIndex = this.targetIndex;
        this.setStatus();
        documentScrollTo(dom);

    }
    this.setTransition = function(targetIndex){
        if( this.currentIndex < targetIndex ){
            // console.log('get right');
            dom.find('.step').eq(targetIndex).css({left: '100%'})
            dom.find('.step').eq(this.currentIndex).css({left: '-100%'})
        }else if( this.currentIndex > targetIndex ){
            // console.log('get left');
            dom.find('.step').eq(targetIndex).css({left: '-100%'})
            dom.find('.step').eq(this.currentIndex).css({left: '100%'})
        }
    }
    this.setStatus = function(){
        dom.find('.progress ul li').removeClass('done current');
        for(var i=0; i<=this.currentIndex; i++){
            dom.find('.progress ul li').eq(i).addClass('done');
        }
        dom.find('.progress ul li').eq(this.currentIndex).addClass('current');
    }

    dom.find('.btn-next').click(function(event) {
        procedure.next();
    });
    dom.find('.btn-previous').click(function(event) {
        procedure.prev();
    });

    /* init */
    this.hideAll();
    this.showIndex(this.currentIndex,false,0);
    this.setStatus();


    // this.setHeight();
}

// var procedureController = function(procedureObj){
//     procedureObj.dom.find('.btn-next').click(function(event) {
//         procedureObj.next();
//     });
//     procedureObj.dom.find('.btn-previous').click(function(event) {
//         procedureObj.prev();
//     });
// }


var siteMapController = function(){
    var siteMapCategory = $('.sitemap .category.parent');
    siteMapCategory.find('.name').click(function(event) {
        var parent = $(this).closest('.category');
        if( $('body').hasClass('mobile') ){
            siteMapCategory.find('.name').not(this).closest('.category.parent').removeClass('active');
            siteMapCategory.find('.name').not(this).closest('.category.parent').find('ul').slideUp(500);
            parent.toggleClass('active');
            parent.find('ul').slideToggle(500);
        }
    });
};


var pageMenuController = function(){
    $('.pageMenu .name').click(function(event) {
        if( $('body').hasClass('mobile') ){
            $(this).closest('.pageMenu').toggleClass('active');
            $(this).closest('.pageMenu').find('ul').slideToggle(150);
        }
    });
    $('.pageMenu ul li').click(function(event) {
        if( $('body').hasClass('mobile') ){
            $(this).closest('.pageMenu').find('ul').slideToggle(150);
        }
    });
    if( $('.pageMenu').closest('.base').hasClass('slide') ){
        currentPage = $('.pageMenu ul.forNav li.current a').text()
    }


    $('.pageMenu .frame').append('<div class="current">'+currentPage+'</div>');
};



var tableCollapsedController = function(){
    var containerAll = $('.table .collapsed');
    var triggerAll = $('.table .collapsed').find('.collapsedTrigger');
    var contentAll = $('.table .collapsed').find('.collapsedContent');
    triggerAll.click(function(event) {
        var container = $(this).closest('.collapsed');
        var content = $(this).closest('.collapsed').find('.collapsedContent');
        triggerAll.not(this).closest('.collapsed').removeClass('active');
        triggerAll.not(this).closest('.collapsed').find('.collapsedContent').slideUp(490);
        container.toggleClass('active');
        content.slideToggle({
            duration: 500,
            progress: function(){
                // if( $('.slider.byNav').length ){
                //     $('.slider.byNav').slick('slickSetOption','', '', true);
                // }
            },
            complete: function(){
                if( $('.slider.byNav').length ){
                    $('.slider.byNav').slick('slickSetOption','', '', true);
                }
                documentScrollTo($(this).closest('.collapsed'));
            }
        });


    });
};





// animation
var animationVisual = function(){
    // TweenMax.fromTo($('#visual .infoBlock .content'),1.5,{ opacity: 0, marginTop: '+=20' },{ opacity: 1, marginTop: '-=20', delay: 0.5 })
}


/* input  *////////////////////////////////////////////////////////////////////////
var inputController = function(){
    $(".numberOnly").keydown(function (e) {
      // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
           // Allow: Ctrl+A
          (e.keyCode == 65 && e.ctrlKey === true) ||
           // Allow: Ctrl+C
          (e.keyCode == 67 && e.ctrlKey === true) ||
           // Allow: Ctrl+X
          (e.keyCode == 88 && e.ctrlKey === true) ||
           // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
               // let it happen, don't do anything
               return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
    });
    // alphabetOnly
    $(".alphabetOnly").keyup(function(e) {
      var regex = /^[A-Za-z ]+$/;
        if (regex.test(this.value) !== true){
            this.value = this.value.replace(/[^a-zA-Z ]+/, '');
        }
    });
    // no space
    $("input.noSpace").on({
        keydown: function(e) {
          if (e.which === 32)
            return false;
        },
        change: function() {
          this.value = this.value.replace(/\s/g, "");
        }
    });
    // trim input
    $('input[type=text], textarea').blur(function(event) {
        var value = $(this).val();
        $(this).val($.trim(value));
    });
    $('.input .file .path').click(function(event) {
        $(this).html('&nbsp;').removeClass('active');
    });
}


function validaterAddMethod(){
    if( jQuery.validator ){
        jQuery.validator.addMethod("laxEmail", function(value, element) {
          // allow any non-whitespace characters as the host part
          return this.optional( element ) || /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test( value );
        });

        jQuery.validator.addMethod("maxSize", function(value, element) {
            console.log(value);
            console.log(element);
            return inputFileMaxSize(element);
        });
    }
}

// file Upload
/*
function fileUploader(input){
    'use strict';
    var url = '../../upload/php/index.php';
    var path = input.closest('.file').find('.path');
    var hidden = path.next('input[type=hidden]');
    input.fileupload({
        url: url,
        dataType: 'json',
        singleFileUploads: true,
        limitMultiFileUploadSize: 10485760,
        done: function (e,data) {
            $.each(data.result.files, function (index, file) {
                console.log(file);
                if( typeof file.error === 'undefined' ){
                    path.text(file.origin).addClass('active');
                    hidden.val(file.name);
                }else{
                    path.text(file.error).removeClass('active');
                }
                // console.log(index);

            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            // $('#progress .progress-bar').css(
            //     'width',
            //     progress + '%'
            // );
        },
        fail: function(e, data){
            path.text('File is too big').removeClass('active');
            console.log(data.errorThrown);
            console.log(data.textStatus);
            console.log(data.jqXHR);
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
}
*/


function pageSlideController(){
    // construct
    var pageMenuSlider = $('.pageMenu ul.forNav');
    var pageSlider = $('.slider.byNav');

    var sliderSize = pageMenuSlider.find('li.for').length;
    if( sliderSize <= 5 ){
        pageMenuSlider.closest('.pageMenu').addClass('trim');
        slidesActive = sliderSize;
    }else{
        slidesActive = 5;
    }

    // slider setting
    pageMenuSlider.slick({
        slide: '.for',
        prevArrow: '<button type="button" class="slick-prev icon arrow-stroke-gray-left"></button>',
        nextArrow: '<button type="button" class="slick-next icon arrow-stroke-gray-right"></button>',
        slidesToShow: slidesActive,
        slidesToScroll: 1,
        centerMode: false,
        adaptiveHeight: true,
        // variableWidth: true,
        speed: 1000,
        infinite: false,
        responsive: [
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1
            }
        }]

        // asNavFor: '.slider.poster'
    });
	
	
    pageSlider.slick({
        lazyLoad: 'ondemand',
        slide: '.slide',
        arrows: false,
        prevArrow: '<button type="button" class="slick-prev icon arrow-stroke-white-left"></button>',
        nextArrow: '<button type="button" class="slick-next icon arrow-stroke-white-right"></button>',
        slidesToShow: 1,
        speed: 1000,
        infinite: false,
        adaptiveHeight: true,
        refresh : true
        // asNavFor: '.pageMenu ul.forNav'
    });


    // event
    var sliderMoving = false;
    pageSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        console.log(nextSlide);
        sliderMoving = true;
        pageMenuSlider.find('li.for').removeClass('current');
        pageMenuSlider.find('li.for').eq(nextSlide).addClass('current');

        $('.actionBase ul li').removeClass('current');
        $('.actionBase ul li').eq(nextSlide).addClass('current');
        $('.pageMenu .frame >.current').text('');
        $('.pageMenu .frame >.current').append($('.pageMenu ul.forNav li.current a').text());
    });
    pageSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
        sliderMoving = false;
    });

    pageMenuSlider.find('li.for').click(function(){
        if( !sliderMoving ){
            var offset = 0;
            var index = ($(this).index() - offset)%sliderSize;
            // console.log(index);

            pageMenuSlider.find('li.for').removeClass('current');
            $(this).addClass('current');

            pageSlider.slick('slickGoTo',index);

            // set base action
            $('.actionBase ul li').removeClass('current');
            $('.actionBase ul li').eq(index).addClass('current');
        }
        documentScrollTo(pageSlider);
    });

    $(window).resize(function(event) {
        if( !$('body').hasClass('mobile') ){
            $('.pageMenu').find('ul').slideDown(0);
        }else{
            $('.pageMenu').find('ul').slideUp(0);
        }
        // pageSlider.slick('slickGoTo',0);
    });

    // construt /////////////////////////////
    if( $('.slick-current .action').length ){
        var controller = new ScrollMagic.Controller();
        var currentAction = pageSlider.find('.slick-current .action');
        var action = pageSlider.find('.slide .action')
        var actionScene = [];

        // scene
        for(var i=0; i<sliderSize; i++){
            // build markup
            $(".actionBase ul").append( "<li></li>" );
            $(".actionBase ul li").eq(i).append( action.eq(i).clone() );
            if ( i=='0' ){
                $(".actionBase ul li").eq(i).addClass('current');
            }

            // anime
            actionScene[i] = new ScrollMagic.Scene({
                triggerElement: '.slide:nth-child('+(i+1)+') .terms',
                offset: $(window).height() * -0.5
            })
        }
        // add scene event to controller
        $.each(actionScene,function(index, el) {
            actionScene[index]
            .on("enter", function (event) {
                action.eq(index).removeClass('hide');
                $('.actionBase ul li').eq(index).addClass('hide');
            })
            .on("leave", function (event) {
                action.eq(index).addClass('hide');
                $('.actionBase ul li').eq(index).removeClass('hide');
            })
            // .addIndicators({name: 'scene['+index+'],'+actionScene[index].duration()});
            actionScene[index].addTo(controller);

            $(window).resize(function(event) {
                actionScene[index].update(true);
            });

        });
    }
    // console.log(actionScene);
    // console.log(controller);
}


// tab
(function( $ ){
   $.fn.tabs = function() {
      // console.log(this);
        var container = this;
        var tab = container.find('.tab >ul >li');
        var content = container.find('.tab-content >ul >li');
        var currentIndex = 0;
        init();
        container.find('.tab >ul >li').click(function(event) {
          var index = $(this).index();
          hideAll();
          showSlide(index);
        });
        function init(){
            hideAll();
            showSlide(currentIndex);
        }
        function hideAll(){
            tab.removeClass('active');
            content.removeClass('active');
        }
        function showSlide(index){
            tab.eq(index).addClass('active');
            content.eq(index).addClass('active');
        }
        return this;
   };
})( jQuery );

// greytab
(function( $ ){
   $.fn.greytabs = function() {
      // console.log(this);
        var container = this;
        var tab = container.find('.greytab >ul >li');
        var content = container.find('.greytab-content >ul >li');
        var currentIndex = 0;
        init();
        container.find('.greytab >ul >li').click(function(event) {
          var index = $(this).index();
          hideAll();
          showSlide(index);
        });
        function init(){
            hideAll();
            showSlide(currentIndex);
        }
        function hideAll(){
            tab.removeClass('active');
            content.removeClass('active');
        }
        function showSlide(index){
            tab.eq(index).addClass('active');
            content.eq(index).addClass('active');
        }
        return this;
   };
})( jQuery );

// filter list
(function( $ ){
   $.fn.filterList = function() {
      // console.log(this);
        var container = this;
        var filter = container.find('.filter >ul >li:not(.all)');
        var filterAll = container.find('.filter >ul >li');
        var btnAll = container.find('.filter >ul >li.all');
        var item = container.find('.list >ul >li');
        var filterNameListAll = [];
        var filterNameList = [];

        // init();


        // event
        // filter.click(function(event) {
        //     var name = $.trim($(this).text());
        //     filterNameList = []; // to clear all
        //     filterNameList.push(name);
        //     showItem(filterNameList);

        // });

        // btnAll.click(function(event) {
        //     filterNameList = [];
        //     filterNameList = filterNameListAll;
        //     showItem(filterNameList);
        // });

        filterAll.click(function(event) {
            // mobile
            $(this).closest('.filter').addClass('active');
            if( !$(this).hasClass('active') ){
                $(this).closest('.filter').removeClass('active');
            }

            filterAll.removeClass('active');
            $(this).addClass('active');

        });

        // function
        function init(){
            // set
            $.each(filter, function(index,value){
                filterNameListAll.push(filter.eq(index).text());
            });
            showItem(filterNameListAll);
        }

        function showItem(filterNameList){
            console.log(filterNameList);
            item.removeClass('active');
            var filteredItem = [];
            $.each(item,function(index,value){
                var text = $.trim(item.eq(index).find('.brand').text());
                if( $.inArray(text,filterNameList)!= -1 ){
                    filteredItem.push(item.eq(index));
                };
            });
            console.log(filteredItem);
            $.each(filteredItem,function(index,value){
                filteredItem[index].addClass('active');
            });
        }

        return this;
   };
})( jQuery );

	



