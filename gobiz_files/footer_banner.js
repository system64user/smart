$(document).ready(function() {
  
 
	//메인하단 사이트링크 슬라이드
	var $ft_banner = $('.site_list');
	var $ft_control = $('.footer-wrap .slick-control');

	//슬라이드가 되는 갯수보다 적을 때, 컨트롤 버튼 숨김
	$ft_banner.on('init', function(event, slick, currentSlide) {
		currentSlide = (currentSlide ? currentSlide : 0) + 1;
		if(slick.options.slidesToShow >= slick.slideCount) {
			$ft_control.find('button').not(".slick-more").hide();
		}
	});

	$ft_banner.slick({
		autoplay:true,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplaySpeed:2000,
    accessibility:true,
		focusOnSelect:true,
    // focusOnChange:true,
		prevArrow: $ft_control.find('.slick-prev'),
		nextArrow: $ft_control.find('.slick-next'),
		responsive:[
			{
			  breakpoint: 1400,
			  settings: {
				slidesToShow: 5,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			  }
			},
			{
			  breakpoint: 640,
			  settings: {
				autoplay:false,
				slidesToShow: 2,
				slidesToScroll: 2,
				arrows:false,
			  }
			}
		]
	});
	//재생정지버튼
	$ft_control.find(".slick-pause").click(function(){
		$ft_banner.slick('slickPause');
		$(this).hide();
		$ft_control.find(".slick-play").show();
	});
	$ft_control.find(".slick-play").click(function(){
		$ft_banner.slick('slickPlay');
		$(this).hide();
		$ft_control.find(".slick-pause").show();
	});

  
  
		//메인 슬라이드 정지, 재생버튼
		  $('.control_wrap .btn_ply').on('click', function () {
			    $(this).closest('.gud_slide-wrap').find($(".slide_inner")).slick('slickPlay');
			    $(this).hide();
			    $(this).prev(".control_wrap .btn_pse").show();
			    $(this).closest(".gud_progress_wrap").find(".bar").css('animation-play-state', 'running');
			    $(this).closest(".gud_progress_wrap").find(".point").css('animation-play-state', 'running');
			  });
			  $('.control_wrap .btn_pse').on('click', function () {
			    $(this).closest('.gud_slide-wrap').find($(".slide_inner")).slick('slickPause');
			    $(this).hide();
			    $(this).closest(".gud_progress_wrap").find(".bar").css('animation-play-state', 'paused');
			    $(this).closest(".gud_progress_wrap").find(".point").css('animation-play-state', 'paused');
			    $(this).next(".control_wrap .btn_ply").show();
			  });
	//슬라이드갯수가 1개일때 컨트롤러 삭제

	 
});

 