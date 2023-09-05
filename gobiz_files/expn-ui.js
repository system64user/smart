/* header 유틸리티 */
(function($) {
    $(document).ready(function() {
        $('.util_menu_icon > ul > li > button').click(function() {
            $('.util_menu_icon li').removeClass('active');
            $(this).closest('li').addClass('active');
            var checkElement = $(this).next();
            if ((checkElement.is('.drop_open')) && (checkElement.is(':visible'))) {
                $(this).closest('li').removeClass('active');
                checkElement.slideUp(400, 'easeInOutCubic');
            }
            if ((checkElement.is('.drop_open')) && (!checkElement.is(':visible'))) {
                $('.util_menu_icon ul .drop_open:visible').slideUp(400, 'easeInOutCubic');
                checkElement.slideDown(400, 'easeInOutCubic');
            }
            if ($(this).closest('li').find('.drop_open').children().length == 0) {
                return true;
            } else {
                return false;
            }
        });
    });
})(jQuery);

/* header 프로모션*/
$(document).ready(function() {
    $(".header_pro .close_btn > button").click(function() {
        $(".header_pro").slideUp(400, 'easeInOutCubic');
		return false;
    });
});

/*$(document).ready(function(){
	$('.top_banner').bxSlider({
		auto: true,
		speed: 400,
        pause: 4000,
        mode:'fade',
        autoControls: false,
        pager:true,
     });
});*/
/* header 프로모션 배너
$(document).on('ready', function() {
    $(".mfocus .mfocus_slider").slick({
        dots: true,
        dotsClass: 'pagerdot',
        infinite: true,
        slidesToShow: 1,
        fade: true,
        accessibility: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        draggable: false,
        touchMove: false
    });
}); */

/* 전체 카테고리*/
var open_yn = false;
$(document).ready(function() {
    $(".header_gnb .allcate button").click(function() {
        if (!open_yn && $('#header .category_list').css('display') == 'none') {
            open_yn = true;
            $("#header .category_list").stop().slideDown(400, 'easeInOutCubic');
			$(".back").slideDown(400);
            $(this).addClass("active");
        } else {
            open_yn = false;
            $("#header .category_list").stop().slideUp(400, 'easeInOutCubic');
			$(".back").slideUp(0);
            $("#header .allcate button").removeClass("active");
        }
    });
    $("#header .allcate_close").click(function() {
        open_yn = false;
        $("#header .category_list").stop().slideUp(400, 'easeInOutCubic');
		$(".back").slideUp(0);
        $("#header .allcate button").removeClass("active");
    });
});

/* ad*/
$(document).on('ready', function() {
    $(".ad_apus .ad_slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        fade: true,
        arrows: true,
        draggable: false,
        touchMove: false,
        accessibility: true
    });
});

/* main 포커스*/
$(document).on('ready', function() {
    $(".mfocus .mfocus_slider").slick({
        dots: true,
        dotsClass: 'pagerdot',
        infinite: true,
        slidesToShow: 1,
        fade: true,
        accessibility: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        draggable: false,
        touchMove: false
    });
});

/* main 회원 맞춤 메뉴*/
$(document).on('ready', function() {
    $(".fitz_menu .fitz_slider").slick({
        dots: true,
        dotsClass: 'pagerdot',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: true,
        autoplay: false,
        arrows: false,
        draggable: false,
        touchMove: false,
        adaptiveHeight: true
    });
});

/* main 추천, 새상품*/
$(document).on('ready', function() {
    $(".spot_product .spot_slider").slick({
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        accessibility: true,
        autoplay: false,
        arrows: true,
        draggable: false,
        touchMove: false,
		
    });
});

/* 서브메인 - 위시리스트*/
$(document).on('ready', function() {
    $(".wish_product .wish_slider_ty1").slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        accessibility: true,
        autoplay: false,
        arrows: true,
        draggable: false,
        touchMove: false,
    });
    $(".wish_product .wish_slider_ty2").slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        accessibility: true,
        autoplay: false,
        arrows: true,
        draggable: false,
        touchMove: false,
    });
});

/* main 카테고리별 셀렉티드 탭메뉴 */
$(function() {
    $('.selected_tab .stab_menu li').click(function() {
        var activeTab = $(this).attr('data-tab');
        $('.selected_tab .stab_menu li').removeClass('active');
        $('.selected_cont .selected_inner').removeClass('active');
        $(this).addClass('active');
        $('#' + activeTab).addClass('active');
    });
});

/* main 카테고리별 셀렉티드*/
$(document).on('ready', function() {
    $(".cate_product .cate_slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: true,
        autoplay: false,
        arrows: true,
        draggable: false,
        touchMove: false,
    });
});

/* main 파트너 기관 배너*/
$(document).on('ready', function() {
    $(".msection_banner .banner_slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        accessibility: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        draggable: false,
        touchMove: false,
    });
});

$(document).on('ready', function() {
    $(".img_viewer .viewer_slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: true,
        autoplay: false,
        arrows: true,
        draggable: false,
        touchMove: false,
        adaptiveHeight: true
    });
});

/* wing_side */
(function($) {
    $(document).ready(function() {
        $(window).scroll(function() {
            if ($(document).scrollTop() > 295) {
                $('.wing_side').addClass('wing_fixed');
            } else {
                $('.wing_side').removeClass('wing_fixed');
            }
        });

        $('.top').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 400);
            return false;
        });
    });
})(jQuery);

/* Supply Details */
(function($) {
    $(document).ready(function() {
        $('.supply_detail button').click(function() {
            $('.supply_detail button').removeClass('active');
            $(this).closest('.supply_detail button').addClass('active');
            var checkElement = $(this).next();
            if ((checkElement.is('.supply_detail .search_cont')) && (checkElement.is(':visible'))) {
                $(this).closest('.supply_detail button').removeClass('active');
                checkElement.slideUp(400, 'easeInOutCubic');
            }
            if ((checkElement.is('.supply_detail .search_cont')) && (!checkElement.is(':visible'))) {
                $('.supply_detail .search_cont:visible').slideUp(400, 'easeInOutCubic');
                checkElement.slideDown(400, 'easeInOutCubic');
            }
        });

        $('.brand_detail button').click(function() {
            $('.brand_detail button').removeClass('active');
            $(this).closest('.brand_detail button').addClass('active');
            var checkElement = $(this).next();
            if ((checkElement.is('.brand_detail .search_cont')) && (checkElement.is(':visible'))) {
                $(this).closest('.brand_detail button').removeClass('active');
                checkElement.slideUp(400, 'easeInOutCubic');
            }
            if ((checkElement.is('.brand_detail .search_cont')) && (!checkElement.is(':visible'))) {
                $('.brand_detail .search_cont:visible').slideUp(400, 'easeInOutCubic');
                checkElement.slideDown(400, 'easeInOutCubic');
            }
        });

        $('.supplier_detail button').click(function() {
            $('.supplier_detail button').removeClass('active');
            $(this).closest('.supplier_detail button').addClass('active');
            var checkElement = $(this).next();
            if ((checkElement.is('.supplier_detail .search_cont')) && (checkElement.is(':visible'))) {
                $(this).closest('.supplier_detail button').removeClass('active');
                checkElement.slideUp(400, 'easeInOutCubic');
            }
            if ((checkElement.is('.supplier_detail .search_cont')) && (!checkElement.is(':visible'))) {
                $('.supplier_detail .search_cont:visible').slideUp(400, 'easeInOutCubic');
                checkElement.slideDown(400, 'easeInOutCubic');
            }
        });
    });
})(jQuery);

/* 상품 리스트 뷰타입 컨트롤 */
$(function() {
    $('.view_type ul li button').click(function() {
        var activeTab = $(this).attr('data-tab');
        $('.view_type ul li button').removeClass('active');
        $('.view_type_list .cont_inner').removeClass('active');
        $(this).addClass('active');
        $('#' + activeTab).addClass('active');
    });
});

/* 상품 디테일 정보 탭,  컨텐츠 */
$(function() {
    $('.detail_tab ul li').click(function() {
        var activeTab = $(this).attr('data-tab');
        $('.detail_tab ul li').removeClass('active');
        $('.detail_tab_cont .cont_box .cont_inner').removeClass('active');
        $(this).addClass('active');
        $('#' + activeTab).addClass('active');

        var expnOffset1 = $('.detail_tab_cont').offset();
        if ($(document).scrollTop() > expnOffset1.top) {
            $(document).scrollTop(expnOffset1.top);
        }
    });

    var expnOffset = $('.product_view .detail_tab').offset();
    if (expnOffset) {
        $(window).scroll(function() {
            if ($(document).scrollTop() > expnOffset.top - 89) {
                $('.product_view .detail_tab').addClass('dynamic_fixed');
            } else {
                $('.product_view .detail_tab').removeClass('dynamic_fixed');
            }
        });
    }

});

/* supplier_group */
$(function() {
    $('.detail_tab ul li').click(function() {
        var activeTab = $(this).attr('data-tab');
        $('.detail_tab ul li').removeClass('active');
        $('.detail_tab_cont .cont_box .cont_inner').removeClass('active');
        $(this).addClass('active');
        $('#' + activeTab).addClass('active');

        var expnOffset1 = $('.detail_tab_cont').offset();
        if ($(document).scrollTop() > expnOffset1.top) {
            $(document).scrollTop(expnOffset1.top);
        }
    });

	var expnOffset = $('.supplier_group').offset();
    if (expnOffset) {
        $(window).scroll(function() {
            if ($(document).scrollTop() > expnOffset.top) {
                $('.supplier_group').addClass('dynamic_fixed');
            } else {
                $('.supplier_group').removeClass('dynamic_fixed');
            }
        });
    }

});

/* SNS공유하기 */
(function($) {
    $(document).ready(function() {
        $('.sns_wrap ul li .sns_share').click(function() {
            $('.sns_wrap ul li .sns_share').removeClass('active');
            $(this).closest('.sns_wrap ul li .sns_share').addClass('active');
            var checkElement = $(this).next();
            if ((checkElement.is('.sns_wrap ul li .sns_service')) && (checkElement.is(':visible'))) {
                $(this).closest('.sns_wrap ul li .sns_share').removeClass('active');
                checkElement.fadeOut(400, 'easeInOutCubic');
            }
            if ((checkElement.is('.sns_wrap ul li .sns_service')) && (!checkElement.is(':visible'))) {
                $('.sns_wrap ul li .sns_service:visible').fadeOut(400, 'easeInOutCubic');
                checkElement.fadeIn(400, 'easeInOutCubic');
            }
        });
    });
})(jQuery);

/* 마이페이지 LNB */
(function($) {
    $(document).ready(function() {
        $('.mypage_lnb .deth1').click(function() {
            $('.mypage_lnb .deth1').removeClass('active');
            $(this).closest('.mypage_lnb .deth1').addClass('active');
            var checkElement = $(this).next();
            if ((checkElement.is('.mypage_lnb .deth2')) && (checkElement.is(':visible'))) {
                $(this).closest('.mypage_lnb .deth1').removeClass('active');
                checkElement.slideUp(400, 'easeInOutCubic');
            }
            if ((checkElement.is('.mypage_lnb .deth2')) && (!checkElement.is(':visible'))) {
                $('.mypage_lnb .deth2:visible').slideUp(400, 'easeInOutCubic');
                checkElement.slideDown(400, 'easeInOutCubic');
            }
        });
    });
})(jQuery);

/* 장바구니 노트 컨트롤 - 프로그램 내에서 처리
$(document).ready(function(){
    $(".note_area .add_note_btn").click(function(){
        $(".note_area .add_message").slideDown(400, 'easeInOutCubic');
        $(this).addClass("active");
        return true;
    });
    $(".note_area .message_del").click(function(){
        $(".note_area .add_message").slideUp(400, 'easeInOutCubic');
        $(".note_area .add_note_btn").removeClass("active");
    });
});
*/

/* FAQ*/
(function($) {
    $(document).ready(function() {
        $('.faq_popular ul li .inner_box .question').click(function() {
        	
            $('.faq_popular li').removeClass('active');
            $(this).closest('li').addClass('active');
            var checkElement = $(this).next();
            if ((checkElement.is('.faq_popular ul li .inner_box .answer')) && (checkElement.is(':visible'))) {
                $(this).closest('li').removeClass('active');
                checkElement.slideUp(400, 'easeInOutCubic');
            }
            if ((checkElement.is('.faq_popular ul li .inner_box .answer')) && (!checkElement.is(':visible'))) {
                $('.faq_popular ul .answer:visible').slideUp(400, 'easeInOutCubic');
                checkElement.slideDown(400, 'easeInOutCubic');
                $(this).children("strong").append("<span class=\"blind\">selected title</span>");
            }
            if ($(this).closest('li').find('.faq_popular ul li .inner_box .answer').children().length == 0) {
                return true;
            } else {
                return false;
            }
        });

        $(function() {
            $('.faq_maper ul li a').click(function() {
                var activeTab = $(this).attr('data-tab');
                $('.faq_maper ul li a').removeClass('active');
                $('.faq_selected .cont_inner').removeClass('active');
                $(this).addClass('active');
                $('#' + activeTab).addClass('active');
            });
        });
    });
})(jQuery);

/* How to Use*/
$(function() {
    $('.howuse_maper ul li a').click(function() {
        var activeTab = $(this).attr('data-tab');
        $('.howuse_maper ul li a').removeClass('active');
        $('.howuse_selected .cont_inner').removeClass('active');
        $(this).addClass('active');
        $('#' + activeTab).addClass('active');
    });
});

/* 통합검색 */
$(function() {
    $(document).ready(function() {
        $(".search_toggle > button").click(function() {
            $(this).next(".search_option").fadeToggle();
            return false;
        });
        $(".search_toggle > .search_option > li").click(function() {
            $(this).parent().hide().parent(".search_toggle").children("button").children("span").text($(this).text());
            $(".search_toggle > .search_option > li").show();
            $(this).addClass("selected").hide();
        });
        $(document).click(function() {
            $(".search_toggle > .search_option").hide();
        });
    });
});

/* 추천검색어 */
jQuery(function($) {
    var ticker = function() {
        timer = setTimeout(function() {
            $('#ticker li:first').animate({
                marginTop: '-52px'
            }, 400, function() {
                $(this).detach().appendTo('ul#ticker').removeAttr('style');
            });
            ticker();
        }, 4000);
    };
    // 0번 이전 기능
    $(document).on('click', '.prev', function() {
        $('#ticker li:last').hide().prependTo($('#ticker')).slideDown();
        clearTimeout(timer);
        ticker();
        if ($('#pause').text() == 'Unpause') {
            $('#pause').text('Pause');
        };
    }); // 0번 기능 끝

    // 1. 클릭하면 다음 요소 보여주기... 클릭할 경우 setTimeout 을 clearTimeout 해줘야 하는데 어떻게 하지..
    $(document).on('click', '.next', function() {
        $('#ticker li:first').animate({
            marginTop: '-20px'
        }, 400, function() {
            $(this).detach().appendTo('ul#ticker').removeAttr('style');
        });
        clearTimeout(timer);
        ticker();
        //3 함수와 연계 시작
        if ($('#pause').text() == 'Unpause') {
            $('#pause').text('Pause');
        }; //3 함수와 연계
    }); // next 끝. timer 를 전연변수보다 지역변수 사용하는게 나을 것 같은데 방법을 모르겠네요.

    //2. 재생정지기능 시작, 아직 다음 기능과 연동은 안됨...그래서 3을 만듦
    var autoplay = true;
    $(document).on('click', '.pause', function() {
        if (autoplay == true) {
            clearTimeout(timer);
            $(this).text('재생');
            autoplay = false;
        } else {
            autoplay = true;
            $(this).text('정지');
            ticker();
        }
    }); // 재생정지기능 끝
    // 3. 재생정지 함수 시작. 2와 기능 동일함.
    var tickerpause = function() {
        $('#pause').click(function() {
            $this = $(this);
            if ($this.text() == 'Pause') {
                $this.text('Unpause');
                clearTimeout(timer);
            } else {
                ticker();
                $this.text('Pause');
            }
        });

    };
    tickerpause();
    //3 재생정지 함수 끝
    //4 마우스를 올렸을 때 기능 정지
    var tickerover = function() {
        $('#ticker').mouseover(function() {
            clearTimeout(timer);
        });
        $('#ticker').mouseout(function() {
            ticker();
        });
    };
    tickerover();
    // 4 끝
    ticker();

});




 //main_visual 
$(document).ready(function(){
            


        });
		
// 20191125 추가 카테고리 선택		
/*
$(document).ready(function(){
	$('.category li').click(function(){
		$(this).toggleClass('on');
		
		if($('.all').hasClass("on") == true){
			$('.interested_cate' ).css("display","none");
		}
		
		if($(this).hasClass("on") === true) {
			
			$('#' + $(this).attr('data-tab') ).css("display","block");
		}
		
		
		$('.all').removeClass('on');
		
	});
	$('.category li.all').click(function(){
		$(this).addClass('on');
		$(this).siblings('li').removeClass('on');
		
		if($(this).hasClass("on") === true) {
			$('.interested_cate' ).css("display","block");
		}else {
			$('.interested_cate' ).css("display","none");
		}
		
	});

	// area_w
	 $('.area_w ul.tab li').click(function() {
        var activeTab = $(this).attr('data-tab');
        $('.area_w ul.tab li').removeClass('on');
        $('.area_w .area').removeClass('active');
        $(this).addClass('on');
        $('#' + activeTab).addClass('active');
    });
	
});*/

// 20191126 퀵뷰		
/*
$(document).ready(function(){
	$('.pro_hover button').click(function(){
		$('.back').css({'display':'block', 'position':'fixed'});
		$(this).parent().parent().parent().siblings('.quick_w').show();
		$(this).parent().parent().parent().parent().siblings('.quick_w').show();
	});
	$('.quick_close').click(function(){
		$('.back').css({'display':'none', 'position':'absolute'});
		$('.quick_w').hide();
	});
});*/