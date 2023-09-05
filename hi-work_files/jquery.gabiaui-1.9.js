// gabiaui v1.9
// by @dochoul (http://www.dochoul.com/, dochoul@gmail.com)
if (typeof jQuery === 'undefined') {
	throw new Error('gabiaui requires jQuery');
}

(function($) {

	/* skip navigation */
	$.fn.skipNavigation = function(target) {
		'use strict';
		var $skipNavi = $(this);
		$skipNavi.click(function() {
			if(target === undefined || target === null) target = "content";
			var content = $('#' + target);
			content.attr({tabIndex : -1}).focus();
		});
	};

	/* layer */
	$.fn.layer = function() {
		'use strict';
		var $layer = $(this);
		var	focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
		var	focusedElementBeforeWindow = $(':focus');
		$layer.parent('[data-ui="layer"]').toggleClass('on');
		$layer.toggle();
		var o = $layer.find('*');
		o.filter(focusableElementsString).filter(':visible').first().focus();
		//hide layer
		$(this).find('[data-ui="hide"]').click(function(event) {
			$layer.hide();
			$layer.parent('[data-ui="layer"]').removeClass('on');
			focusedElementBeforeWindow.focus();
		});
	};

	/* modal */
	$.fn.modal = function() {
		'use strict';
		var $modalWindow = $(this);
		var	$dim = $('.dim');
		var	focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
		var	focusedElementBeforeWindow = $(':focus');
		//show modal
		var modalShow = function() {
			$modalWindow.show();
			$dim.show();
			$modalWindow.css('marginLeft', -($modalWindow.width() / 2));
			$modalWindow.css('marginTop', -($modalWindow.height() / 2));
			var o = $modalWindow.find('*');
			o.filter(focusableElementsString).filter(':visible').first().focus();
		}
		modalShow();
		//hide modal
		var modalHide = function(event) {
			event.preventDefault();
			$modalWindow.hide();
			$dim.hide();
			focusedElementBeforeWindow.focus();
		}
		$modalWindow.find('[data-modal="hide"]').on('click', modalHide);
	};
    
	/* tab */
	$.fn.tab = function(activeIdx) {
		'use strict';
		$(this).each(function() {
			var $tab_head = $(this);
			/*active tab*/
			var active_tab_num = (activeIdx === undefined) ? active_tab_num = 0 : active_tab_num = activeIdx;
			var active_tab_cnt = "#" + $tab_head.find('li').eq(active_tab_num).find('a').attr('data-id');
			$tab_head.find('li').eq(active_tab_num).addClass('on');
			var targetId = [];

			$tab_head.find('[data-id]').each(function() {
				var $tab_nav = $(this);
				var thisId = "#" + $(this).attr('data-id');
				$(thisId).hide();
				$(active_tab_cnt).show();

				$tab_nav.click(function(event) {
					event.preventDefault();
					$tab_head.find("li.on").removeClass("on");
					$(this).parents("li").addClass("on");
					$(targetId.join(", ")).not(thisId).hide();
					$(thisId).show();
				});
				targetId.push(thisId);
			});
		});
	};

	/* accordion */
	$.fn.accordion = function(slideTime,activeIdx) {
		'use strict';
		var num_of_cnt = $(this).find('.accordion-content').length;
		var slide_time = (slideTime === 0 || slideTime === undefined) ? slide_time = 300 : slide_time = slideTime;
		var active_idx = (activeIdx === undefined || activeIdx === null) ? active_idx = num_of_cnt : active_idx = activeIdx;

		$(this).each(function() {
			var $acd = $(this);
			/*active dd*/
			$acd.find('.accordion-content').hide();
			// 해당기능은 실 오픈시에 사용하는 기능이 아닙니다 지우지 마세요
			//$acd.find('.accordion-content').eq(active_idx).show();
			//$acd.find('.accordion-header').eq(active_idx).addClass('on');

			$acd.find('[data-accordion="head"]').each(function(event) {
				var $acdHead = $(this);
				$acdHead.click(function(event) {
					event.preventDefault();
					var $this_cnt = $(this).parent().find('[data-accordion="content"]');
					$acd.find('[data-accordion="content"]').slideUp(slide_time);
					$acd.find('[data-accordion="head"]').removeClass('on');
					$(this).addClass("on");
					if($this_cnt.css('display') == 'none') {
						$this_cnt.slideDown(slide_time);
					}else{
						$this_cnt.slideUp(slide_time);
						$acd.find('[data-accordion="head"]').removeClass('on');
					}
				});
			});
		});
	};

	/* dropdown */
	$.fn.dropdown = function() {
		'use strict';
		var dropdownWrap = $(this);
		dropdownWrap.find('[data-dropdown="head"]').click(function(event) {
			var $parent = $(this).parent();
			var isActive = $parent.hasClass('on');
			hideDropdown();
			if (!isActive) $parent.toggleClass('on');
			return false;
		});
		//hide dropdown
		function hideDropdown(e) {
			$('[data-dropdown="head"]').each(function () {
				var $this = $(this);
				var $parent = $(this).parent();
				if (!$parent.hasClass('on')) return;
				$parent.removeClass('on');
			});
		}
		$(document).on('click', hideDropdown);
	};

	/* checkbox */
	$.fn.checkbox = function() {
		var checkboxWrap = $(this);
		checkboxWrap.click(function(event) {
			var thisCheckboxInp = $(this).find('input[type="checkbox"]');
			thisCheckboxInp.attr('checked', !thisCheckboxInp.attr('checked'));
			if(!$(this).hasClass('disabled')) {
				$(this).toggleClass('checked');	
			}
			return false;
		});
	};

	/* placeholder - ie9 lt */
	$.fn.placeholder = function () {
		var testInput = document.createElement('input');
		var isPlaceholder = ('placeholder' in testInput);
		//ie9 lt
		if (!isPlaceholder) {
		    $('[placeholder]').load(function(){
		        var input = $(this);
		        if (input.val() == '') {
		            input.addClass('placeholder');
		            input.val(input.attr('placeholder'));
		        }
		    });
		    $('[placeholder]').focus(function() {
		        var input = $(this);
		        if (input.val() == input.attr('placeholder')) {
		            input.val('');
		            input.removeClass('placeholder');
		        }
		    }).blur(function() {
		        var input = $(this);
		        if (input.val() == '' || input.val() == input.attr('placeholder')) {
		            input.addClass('placeholder');
		            input.val(input.attr('placeholder'));
		        }
		    }).blur().parents('form').submit(function() {
		        $(this).find('[placeholder]').each(function() {
		            var input = $(this);
		            if (input.val() == input.attr('placeholder')) {
		                input.val('');
		            }
		        })
		    });
		}
	};

	/* init */
	$.init = function() {
		$(document).find('[data-ui="skipNavigation"]').skipNavigation('contents');
		$(document).find('[data-ui="tab"]').tab();
		$(document).find('[data-ui="accordion"]').accordion(300);
		//$(document).find('[data-ui="dropdown"]').dropdown();
		//$(document).find('[data-ui="checkbox"]').checkbox();
		$(document).find('placeholder').placeholder();
	};

})(jQuery);

$(document).ready(function() {
	$.init();
});