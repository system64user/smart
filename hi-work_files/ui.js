$(document).ready(function() {

	/*main random image*/
	// 배너 이벤트 시 주석처리, 이벤트 종료 후 원복
	var isMobile = false;
	var isMainPage = false;
	var mainImgArr = ['/static/images/main-img-wide.jpg','/static/images/main-img-wide2.jpg','/static/images/main-img-wide3.jpg','/static/images/main-img-wide4.jpg'];
	var ww = window.innerWidth;
	var randomImgURL = mainImgArr[Math.floor(Math.random() * mainImgArr.length)];

	isMainPage = $('#header').hasClass('main');

	$(window).resize(function() {
		ww = window.innerWidth;
		if(isMainPage) changeMainImg();
	});

	var changeMainImg = function() {
		if(ww <= 1023) {
			isMobile = true;
			$('html').addClass('m');
			$('#header').css('background-image', 'none');
		}else{
			isMobile = false;
			$('html').removeClass('m');
			//$('#header').css('background-image', 'url(' + randomImgURL + ')');
			$('#header').css('background-image', 'url(https://static.hiworks.com/www/static/images/index_21th_banner.jpg)');
			
		}
	}
	if(isMainPage) changeMainImg();

	/*gnb*/
	var hamburger = $('.hamburger');
	hamburger.bind('click', gnbOpen);
	function gnbOpen(e) {
	    $(this).toggleClass('on');
	    $('.gnb-wrap').toggleClass('on');
	    $('#header').toggleClass('on');
	}

	/*main slider*/
	$(".owl-slider").owlCarousel({
		mouseDrag : true,
	    stopOnHover : true,
	    navigation : false,
	    slideSpeed : 300,
	    paginationSpeed : 400,
	    singleItem: true
	});

	var owl = $("#fct-slider");

	owl.owlCarousel({
		items : 9, //9 items above 1000px browser width
		itemsDesktop : [1000,7], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,6], // betweem 900px and 601px
		itemsTablet: [600,5], //2 items between 600 and 0
		itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
		pagination : false
	});

	// Custom Navigation Events
	$(".next").click(function(){
		owl.trigger('owl.next');
	});
	$(".prev").click(function(){
		owl.trigger('owl.prev');
	});
	$(".play").click(function(){
		owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
	});
	$(".stop").click(function(){
		owl.trigger('owl.stop');
	});

	/*owl pagination position center*/
	//$('.owl-pagination').css('margin-left',  ($('.owl-pagination').width() / 2) * -1 );

	/*people*/
	$('.function-inner button').on('click',function(){
		var txt_fct = $('.function-inner li p');
		var btn_fct = $('.function-inner li button');
		txt_fct.hide();
		btn_fct.removeClass('on');
		$(this).addClass('on');
		$(this).siblings('p').show();
	});

	/*header name click*/
	$('#userbtn').click(function(event) {
		event.stopPropagation();
		$('.user_detail').toggle().click(function(event) {
			event.stopPropagation();
		});
	});

	/* market */
	var showBtnList = $(".show-more");
	var hideBtnList = $(".hide-more");
	var more_conts = $(".more-conts");
	showBtnList.click(function(){
		more_conts.show();
		$(this).parents(".mk-item").find(".hide-more").focus();
		showBtnList.hide();
	});
	hideBtnList.click(function(){
		showBtnList.show();
		$(this).parents(".mk-item").find(".show-more").focus();
		more_conts.hide();
	});

	/* toggle */
	$('[data-tgl="btn"]').click(function(event) {
		event.stopPropagation();
		$('[data-tgl="contents"]').toggleClass("hide");
	});

    /* pay method */
    var clickItem = $('.payMethod > label');
    var itemNotCard = clickItem.siblings('ul').children('li:nth-of-type(1)');
    var itemCard = clickItem.siblings('ul').children('li:nth-of-type(2)');
    clickItem.on('click', function(){
        if ($(this).data('role') !== 'card'){
            itemNotCard.hide();
            itemCard.show();
        } else {
            itemNotCard.show();
            itemCard.hide();
        }
    });

});

// tax form
var $txForm = function(){
    $('input[name=receipt]').on('click',function(){
		$('.infoForm').hide();	// 세금계산서 + 현금영수증 영역 숨김
		$('#cash_bill_form').hide(); // 현금영수증 영역 숨김

		var isTaxBill = $('#pub_tax').is(':checked');
		if(isTaxBill) {
			$('.infoForm').show();	// 세금계산서 영역 노출
			return;
		}
        
        var isCacheBill = $('#pub_receipt').is(':checked');
        if(isCacheBill){
			$('#cash_bill_form').show();	// 현금영수증 영역 노출
			return;
		}
    });

    // 현금 영수증 type별 입력란 조정
	$('input[name=cash_bill_type]').on('click',function(){
		// 초기화
		var cashBillType = this.value
		$('#cash_mobile_area').hide();
		$('#cash_company_area').hide();

		// 개인소득공제용
		if(cashBillType==='P'){
			$('#cash_mobile_area').show();
			return
		}
		// 사업자증빙
		if(cashBillType==='C'){	// 사업자증빙
			$('#cash_company_area').show();
			return
		}
	})
};

// zipcode layer
var $zipcodeLayer = function(){
    var $zipcodeBox = $('#zipCode');

    // open layer
    $('#btn_zipSearch').on('click',function(){
        $zipcodeBox.show();
        $('html,body').addClass('scrollRock');
    });

    // close layer
    $('.rwdlayerClose').on('click',function(){
        $zipcodeBox.hide();
        $('html,body').removeClass('scrollRock');
        $("#company_add").focus();
    });
};

// rwd layer
var resizeLayer = function(){
	var $winWidth = $(window).width();
	if($winWidth < 1024 && $('.modal_window').css('display') !== 'none' ){
		//moblie mode
		$('html,body').addClass('scrollRock');
	} else {
		//pc mode
		$('html,body').removeClass('scrollRock');
	}
};

var rwdLayer = function() {
	var $layer = $('.rwd-layer'),
		$layerWrap = $('#modal_window'),
		$this = $(this);

	//show modal
	var layerShow = function() {
		$this.siblings($layerWrap).show().focus($layer);
	}();

	//hide modal
	var layerHide = function(event) {
		$this.siblings($layerWrap).hide();
		$('html,body').removeClass('scrollRock');
	}
	$layer.find('[data-modal="hide"]').on('click', layerHide);
	resizeLayer();
};
$('.rwd-layer #modal_open').on('click',rwdLayer);


/* rwd united layer */
$.fn.unitedLayer = function() {
	'use strict';
	var $layerWindow = $(this);
	var	$dim = $('.dim');
	var	focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
	var	focusedElementBeforeWindow = $(':focus');
	var $winHeight = $(window).height();
	//show modal
	var layerShow = function() {
		$layerWindow.show();
		$dim.show();
		var o = $layerWindow.find('*');
		o.filter(focusableElementsString).filter(':visible').first().focus();

		var $ww = window.innerWidth;
		var $winHeight = $(window).height();
		var $modalWindow = $('#modal_window');
		$('html,body').css({
			height:$winHeight,
			overflow:'hidden'
		});
	}
	layerShow();
	//hide modal
	var layerHide = function(event) {
		event.preventDefault();
		$layerWindow.hide();
		$dim.hide();
		focusedElementBeforeWindow.focus();
		$('html,body').css({
			height:'auto',
			overflow:'visible'
		});
	}
	$layerWindow.find('[data-modal="hide"]').on('click', layerHide);
};

/* open download_manual layer */
var manualLayer = {
	show : function(type){
		var f = document.frm_layer_download;
		//type setting
		f.download_type.value = type;
		//clear
		f.download_company_name.value	= "";
		f.download_name.value			= "";
		f.download_hp_no2.value			= "";
		f.download_hp_no3.value			= "";
		f.download_email.value			= "";
		f.download_email_domain.value	= "";
		$('#select_email_domain').find('option:first').attr('selected', 'selected');
		$('input:checkbox[id="chk_layer_download"]:checked').attr('checked', false);
		$('#div_layer_download_manual').modal();
	},
	hide : function(){
		$('#div_layer_download_manual').find('[data-modal=hide]').click();
	}
};


/*  hiworks.com-office : rwd-modal-layer */
var hiworks_modal = function() {

	var window_body = $('html, body');
	var modal_class = $('.modal_window_ofc');
	var modal_hide_btn = $('[data-modal="hide"]');

	//rwd layer
	event.preventDefault();

	window_body.addClass('scrollLock');

	modal_class.modal();
	modal_hide_btn.on('click',function(){
		window_body.removeClass('scrollLock');
	});
};

/* attach file */
var addFileName = function(e){
	var $this = e,
		file = e.value,
		fileName = file.split('\\');

	$($this).siblings('input').val(fileName[fileName.length-1]);
};
