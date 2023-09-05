(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*util*/
require('./util/addComma');
require('./util/autoDashDate');
require('./util/autoDashPhoneNumber');
require('./util/browser');
require('./util/cookies');
require('./util/copyToClipboard');
require('./util/getParameterByName');
require('./util/isMobile');
require('./util/isValidateEmail');
require('./util/makeDimmed');
require('./util/os');
require('./util/removeComma');
require('./util/makeArrow');
/*ui*/
require('./ui/collapse');
require('./ui/dropdown');
require('./ui/layer');
require('./ui/modal');
require('./ui/scrollprogress');
require('./ui/tab');
require('./ui/tooltip');
require('./ui/indicator');
require('./ui/toast');
require('./ui/hamburger');

},{"./ui/collapse":2,"./ui/dropdown":3,"./ui/hamburger":4,"./ui/indicator":5,"./ui/layer":6,"./ui/modal":7,"./ui/scrollprogress":8,"./ui/tab":9,"./ui/toast":10,"./ui/tooltip":11,"./util/addComma":12,"./util/autoDashDate":13,"./util/autoDashPhoneNumber":14,"./util/browser":15,"./util/cookies":16,"./util/copyToClipboard":17,"./util/getParameterByName":18,"./util/isMobile":19,"./util/isValidateEmail":20,"./util/makeArrow":21,"./util/makeDimmed":22,"./util/os":23,"./util/removeComma":24}],2:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.ui) {
		gtris.ui = window.gtris.ui = {};
	}

	var collapse = {

		init: function(obj) {
			if(obj.slideTime === undefined) obj.slideTime = 250;
			if(obj.accordion === undefined) obj.accordion = false;
			if(obj.active !== undefined) this.activeContent(obj);
			this.addEvent(obj);
		},

		activeContent:function(obj) {
			var $collapse = $(obj.target);
			var $acd_content = $collapse.find('.gt-collapse-content');
			$acd_content.eq(obj.active).closest('.gt-collapse-item').addClass('gt-active');
			$acd_content.eq(obj.active).show();
		},

		collapseHeaderClick: function(event) {
			event.preventDefault();
			var obj = event.data.obj;
			var $collapse = $(obj.target);
			var $collapse_items = $collapse.find('.gt-collapse-item');
			var $this_header = $(event.target);
			var $this_item = $this_header.closest('.gt-collapse-item');
			var $this_content = $this_header.closest('.gt-collapse-item').find('.gt-collapse-content');

			//show and hide
			if( $this_content.is(':hidden') ) {
				$this_item.addClass('gt-active');
				$this_content.slideDown(obj.slideTime);
				//accordion mode(slideup everything contents except for the clicked collapse-header)
				if(obj.accordion) {
					$collapse_items.not($this_item).removeClass('gt-active');
					$collapse_items.not($this_item).find('.gt-collapse-content').slideUp(obj.slideTime);
				}
			}else{
				$this_item.removeClass('gt-active');
				$this_content.slideUp(obj.slideTime);
			}
		},

		//active collapse content(API)
		ActiveContent: function(target, activeIndex) {
			var $collapse = $(target);
			var $acd_content = $collapse.find('.gt-collapse-content');
			$acd_content.eq(activeIndex).closest('.gt-collapse-item').addClass('gt-active');
			$acd_content.eq(activeIndex).show();
		},

		//collapse content expand all(API)
		ExpandAll: function(target) {
			var $collapse = $(target);
			$collapse.find('.gt-collapse-item').addClass('gt-active');
			$collapse.find('.gt-collapse-content').slideDown(250);
		},

		//collapse content close all(API)
		CloseAll: function(target) {
			var $collapse = $(target);
			$collapse.find('.gt-collapse-item').removeClass('gt-active');
			$collapse.find('.gt-collapse-content').slideUp(250);
		},

		addEvent: function(obj) {
			$(obj.target).find('.gt-collapse-header').on('click', { obj: obj }, this.collapseHeaderClick);
		}
	};

	gtris.ui.collapse = collapse;

})(window.gtris);

},{}],3:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.ui) {
		gtris.ui = window.gtris.ui = {};
	}

	var dropdown = {

		_obj: 'dropdown',

		init: function(obj) {
			this._obj = obj;
			this._active = obj.active;
			if(this._active) this.activeDropdown();
			this.addEvent(obj);
		},

		dropdownBtnClick: function(event) {
			event.stopPropagation();

			var $thisDD = $(event.target).parents('.gt-dropdown');
			var $thisBtn = $(event.target);

			//toggle dropdowns
			if( $thisDD.hasClass('gt-active') ) {
				$thisDD.removeClass('gt-active');
			}else{
				$thisDD.addClass('gt-active');
				$('.gt-dropdown').not( $thisBtn.parents('.gt-dropdown') ).removeClass('gt-active');
			}
		},

		activeDropdown: function() {
			$(this._obj.target).addClass('gt-active');
		},

		documentClick: function(event) {
			event.stopPropagation();
			$('.gt-dropdown').removeClass('gt-active');
		},

		addEvent: function(obj) {
			$(obj.target).find('button, a').on('click', this.dropdownBtnClick);
			$(document).on('click', this.documentClick);
		}
	};

	gtris.ui.dropdown = dropdown;

})(window.gtris);

},{}],4:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.ui) {
		gtris.ui = window.gtris.ui = {};
	}

	var hamburger = {

		init: function(obj) {
			//hamburger color
			if(!obj.color) {
				obj.color = '#2598e7';
			}else{
				$(obj.target).find('.gt-hamburger-item').css('background-color', obj.color);	
			}
			//addEvent
			this.addEvent(obj);
		},

		hamburgerClick: function(event) {
			var obj = event.data.obj;
			$(obj.target).toggleClass('gt-active');
		},

		addEvent: function(obj) {
			$(obj.target).on('click', {obj: obj}, this.hamburgerClick);
		}
	};

	gtris.ui.hamburger = hamburger;

})(window.gtris);

},{}],5:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.ui) {
		gtris.ui = window.gtris.ui = {};
	}

	var indicator = {

		init: function(obj) {
			this.addEvent(obj);
		},

		indicatorClick: function(event) {
			var obj = event.data.obj;
			var $indicator_item = $(obj.target).find('.gt-indicator-item');
			var $this_indicator_item = $(event.target);
			var indicator_index = $this_indicator_item.index();
			
			//add active class
			$indicator_item.removeClass('gt-active');
			$this_indicator_item.addClass('gt-active');

			//return indicatorItemClick
			if(obj.indicatorItemClick) return obj.indicatorItemClick($this_indicator_item, indicator_index);
		},

		addEvent: function(obj) {
			$(obj.target).find('.gt-indicator-item').on('click', {obj: obj}, this.indicatorClick);
		}
	};

	gtris.ui.indicator = indicator;

})(window.gtris);

},{}],6:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.ui) {
		gtris.ui = window.gtris.ui = {};
	}

	var layer = {

        isHasLayer : false,
        $target: '$target',

		open: function(obj) {
			this.loadLayer(obj);
		},

		loadLayer: function(obj) {
			this.$target = $(obj.target);

			console.log(this.$target, this);

			var url;

			//url and id
			if(obj.id === undefined) {
				url = obj.url;
			}else{
				url = obj.url + '\u0020' + obj.id;
			}

			//check loaded
			if( this.$target.hasClass('gt-active') ) {
				this.isHasLayer = true;
			}else{
				this.isHasLayer = false;
			}

			//when layer is not open
			if(this.isHasLayer === false) {

				//create div and add active class
				var $ly_container = $(document.createElement('div'));
				$ly_container.addClass('gt-layer-container');
				$ly_container.appendTo(this.$target);
				this.$target.addClass('gt-active');

				//load
				$ly_container.load(url, function(response, status, xhr) {
					
					if(status === "success") {
						//hide layer
						$ly_container.find('[data-layer="hide"]').on('click', function(event) {
							event.stopPropagation();
							this.isHasLayer = false;
							$ly_container.remove();
							layer.$target.removeClass('gt-active');
							if(obj.closed) return obj.closed();
						});

						//return completed
						if(obj.completed) return obj.completed();
					}
				});
			}
		},

		removeLayer: function(layer) {
            $(layer).removeClass('gt-active');
            $(layer).find('.gt-layer-container').remove();
		}

	};

	gtris.ui.layer = layer;
	
})(window.gtris);

},{}],7:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.ui) {
		gtris.ui = window.gtris.ui = {};
	}

	var modal = {

		wrapperArr : [],
		saveModalArr : [],
		options : {},

		open: function(obj) {
			var selector = obj.target.charAt(0);
			var overlayColor = obj.overlayColor;
			var overlayOpacity = obj.overlayOpacity;
			var animate = obj.animate;

			//set option
			if(overlayColor === undefined) overlayColor = '#333';
			if(overlayOpacity === undefined) overlayOpacity = 0.35;
			if(animate === undefined) {
				animate = 'gt-animate-opacity';
			}else{
				animate = 'gt-animate-' + obj.animate;
			}
			this.options = {
				overlayColor : overlayColor,
				overlayOpacity : overlayOpacity,
				animate: animate
			};

			//ajax or ajax not, there is no try...
			switch(selector) {
				case '#':
					this.notAjax(obj, selector);
					break;
				case '.':
					console.error('gtris(v1.2.0): Target accept only ID or URL.');
					break;
				default:
					this.ajax(obj);
					break;
			}
		},

		//not ajax
		notAjax: function(obj, selector) {
			var $target = $(obj.target);
			$target.show();

			//when the document has modal..
			if( $target.length ) {	
				this.saveModalArr.push($target);
				this.showModal( obj, $target );
			}else{
				//when there is no modal in the document..
				this.saveModalArr.some(function(item, index) {
					item.filter(function(index) {
						if( $(this).attr('id') === obj.target.substring(1) ) {
							modal.showModal( obj, $(this) );
						}
					});
				});
			}
		},

		//ajax
		ajax: function(obj) {
			//set option
			if(obj.type === undefined) obj.type = 'GET';
			if(obj.dataType === undefined) obj.dataType = 'html';
			
			//call
			$.ajax({
				context: this,
				type: obj.type,
				url: obj.target,
				dataType: obj.dataType,
				error : function(xhr, status, error) {
					console.log(xhr, status, error);
				},
				success: function(response) {
					var $target = $(response);
					$target.css('display', 'block');
					this.showModal(obj, $target);
				},
				complete: function() {
				}
			}).done(function(data) {
			});

		},

		showModal: function(_obj, $target) {
			//create wrapper
			var gtModalWrapper = $(document.createElement('div'));
			gtModalWrapper.addClass('gt-modal-wrap');
			gtModalWrapper.appendTo('body');
			this.wrapperArr.push(gtModalWrapper);

			//create overlay
			var $overlay = $(gtris.util.makeDimmed('gt-overlay', 0, this.options.overlayColor, 1050));
			$overlay.animate({opacity: this.options.overlayOpacity}, 200);

			//append overlay, modal
			$overlay.appendTo(this.wrapperArr[this.wrapperArr.length - 1]);
			$target.appendTo(this.wrapperArr[this.wrapperArr.length - 1]);

			//set animate
			$target.find('.gt-modal-content').removeClass(function(index, className) {
				return (className.match (/(^|\s)gt-animate\S+/g) || []).join(' ');
			});
			$target.find('.gt-modal-content').addClass(this.options.animate);

			//hide modal
			$target.find('[data-modal="hide"]').on('click', function(event) {
				event.preventDefault();
				modal.hideModal(_obj);
			});

			//esckey press hide modal
			$(document).unbind('keyup').bind('keyup', function(e) {
				var evt = e || window.event;
				if (evt.keyCode == 27) {
					if(modal.wrapperArr.length > 0) {
						modal.hideModal();
						if(_obj && _obj.closed) return _obj.closed();
					}
				}
			});

			//completed event return
			if(_obj.completed) {
				return _obj.completed($target);
			}
		},

		hideModal: function(_obj, focusedElementBeforeWindow) {
			var lastModalIdx = modal.wrapperArr.length - 1;
			modal.wrapperArr[lastModalIdx].remove();
			modal.wrapperArr.pop();
			//return closed function
			if(_obj && _obj.closed) return _obj.closed();
		},

		//delete modal that appear on screen(API)
		CloseModal: function() {
			modal.hideModal();
		},

		//delete all modals that appear on screen(API)
		CloseModalAll: function() {
			$('.gt-modal-wrap').remove();
		}
	};

    gtris.ui.modal = modal;

})(window.gtris);



},{}],8:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.ui) {
		gtris.ui = window.gtris.ui = {};
	}

	var scrollprogress = {

		init: function(obj) {
			//options
			if(obj.height) $(obj.target).css('height', obj.height);
			if(obj.color) $(obj.target).css('background-color', obj.color);
			if(obj.top) $(obj.target).css('top', obj.top);
			//add event
			this.addEvent(obj);
		},

		updateProgress: function(event) {
			var obj = event.data.obj;
			var $progress_bar = $(obj.target);
			var scroll_top = $(window).scrollTop(); //current vertical position of the scroll bar
			var bottom_page = $(document).height() - $(window).height(); //(height of HTML document - height of browser viewport)
			var bar_width = scrollprogress.calculatePercent(scroll_top, bottom_page);

			//chagne progress bar
			$progress_bar.css('width',bar_width);
			
			//on progress event
			if(event.data) {
				if(obj.onProgress) return obj.onProgress(bar_width);
			}
		},

		calculatePercent: function(n1, n2) {
			var percent = Math.ceil( n1 / n2 * 100 ) + '%';
			return percent;
		},

		addEvent: function(obj) {
			$(document).on('scroll', {obj: obj}, this.updateProgress);
			$(window).on('resize', {obj: obj}, this.updateProgress);
		}
	};

	gtris.ui.scrollprogress = scrollprogress;

})(window.gtris);

},{}],9:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.ui) {
		gtris.ui = window.gtris.ui = {};
	}
	var tab = {
		init: function(obj) {
			var _obj = obj;
			this.attachTabEvent(_obj);
		},
		attachTabEvent: function(_obj) {
			var $target = $(_obj.target);
			if(!_obj.event) {
				_obj.event = 'click';
			}

			$target.each(function() {
				var $tab_head = $(this);
				$tab_head.target_id = [];

				$tab_head.find('[data-id]').each(function() {
					var $tab_nav = $(this);
					var this_id = "#" + $(this).attr('data-id');
					$tab_head.target_id.push(this_id);
					$tab_nav.on(_obj.event, function() {
						tab.executeTabEvent.call(this, _obj, $tab_head);
					});
				});

				//초기 탭 활성화
				if(gtris.util.getParameterByName('init')) {
					var initActiveTabs = [];
					initActiveTabs = gtris.util.getParameterByName('init').split(',');
					initActiveTabs.forEach(function(v) {
						if( $.inArray('#' + v, $tab_head.target_id) > -1 ) {
							var initIdx = $.inArray('#' + v, $tab_head.target_id);
							$tab_head.find('[data-id]').eq(initIdx).trigger(_obj.event);
						}
					});
				}
			});
		},
		ajaxCall: function(this_id) {
			$.ajax({
				url: $(this).attr('data-url'),
				beforeSend : function() {
					$(this_id).empty().append('<div style="text-align:center;padding:10px 0;"><img src="https://static.gabia.com/gtris/assets/images/gt-loader.gif"></div>');
				}
			}).done(function(response) {
				$(this_id).empty().append(response);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				//window.alert('load failed.');
				$(this_id).empty().append(errorThrown);
			});
		},
		executeTabEvent: function(_obj, $tab_head) {
			var this_id = "#" + $(this).attr('data-id');
			if((/(http(s)?:\/)?(\/\w+)+(\.[\w.]+)?/g).test($(this).attr('data-url'))) {
				tab.ajaxCall.call(this, this_id);
			}
			$tab_head.find(".gt-nav-item.gt-active").removeClass("gt-active");
			$tab_head.find(".gt-nav-item").eq($(this).index()).addClass("gt-active");
			$($tab_head.target_id.join(", ")).hide();
			$(this_id).show();

			if(_obj.getHeadIndex) {
				return _obj.getHeadIndex($(this).index());
			}
		}
	};
	gtris.ui.tab = tab;

})(window.gtris);

},{}],10:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.ui) {
		gtris.ui = window.gtris.ui = {};
	}

	var toast = {

		$toast_container: 'toast-container',
		timer: 'timer',
		removeSecond: 5000,

		open: function(obj) {

			if( $('.gt-toast-container').length === 0 ) {

				//set options
				if(!obj.direction) obj.direction = 'right-top';
				if(!obj.removeSecond) {
					this.removeSecond = 5000;
				}else{
					this.removeSecond = obj.removeSecond;
				}

				//toast container
				this.$toast_container = $(document.createElement('div'));
				this.$toast_container.addClass('gt-toast-container');
				if(obj.className) this.$toast_container.addClass(obj.className);
				this.$toast_container.attr('data-direction', obj.direction);
				this.$toast_container.appendTo('body');
				this.$toast_container.animate({opacity: 1}, 30);

				//toast
				var $toast = $(document.createElement('div'));
				$toast.addClass('gt-toast');
				$toast.html(obj.message);
				if(obj.bgColor) $toast.css('background-color', obj.bgColor);
				$toast.appendTo(this.$toast_container);

				//set colors
				this.setColors(obj, $toast);

				//add event
				$toast.on('mouseover', toast.mouseoverToast);
				$toast.on('mouseout', toast.mouseoutToast);
				$toast.on('click', toast.deleteToast);
				this.timer = setInterval(this.timerHandler, this.removeSecond);
			}
		},

		setColors: function(obj, $toast) {
			switch(obj.type) {
				case 'primary':
				$toast.addClass('gt-toast-primary');
				break;

				case 'success':
				$toast.addClass('gt-toast-success');
				break;

				case 'info':
				$toast.addClass('gt-toast-info');
				break;

				case 'warning':
				$toast.addClass('gt-toast-warning');
				break;

				case 'danger':
				$toast.addClass('gt-toast-danger');
				break;
			}
		},

		timerHandler: function() {
			toast.$toast_container.remove();
			clearInterval(toast.timer);
		},

		deleteToast: function() {
			toast.$toast_container.remove();
			clearInterval(toast.timer);
		},

		mouseoverToast: function() {
			toast.$toast_container.css('opacity', '0.8');
			clearInterval(toast.timer);
		},

		mouseoutToast: function() {
			toast.$toast_container.css('opacity', '1');
			toast.timer = setInterval(toast.timerHandler, toast.removeSecond);
		}
	};

	gtris.ui.toast = toast;

})(window.gtris);

},{}],11:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.ui) {
		gtris.ui = window.gtris.ui = {};
	}

	var tooltip = {
		
		open: function(obj) {
			this.addEvent(obj);
		},

		addEvent: function(obj) {
			$(obj.target).find('[data-tooltip="button"]').on('click', {obj: obj}, this.toggleTT);
			$(obj.target).find('[data-tooltip="hide"]').on('click', this.hideTT);
		},

		toggleTT: function(event) {
			var obj;
			var $tt_btn;
			var $tt_cnt;
			var $arrow;
			var direction;
			var arrow_direction;
			
			//whether API open or not.
			if(event.data) {
				obj = event.data.obj;
				$tt_btn = $(event.target);
			}else{
				obj = event;
				$tt_btn = $(obj.target).find('[data-tooltip="button"]');
			}
			
			$tt_cnt = $tt_btn.siblings('.gt-tooltip-content');	

			//when there is no direction, default direction is top.
			if( $tt_btn.parents('.gt-tooltip').attr('data-direction') === undefined && obj.direction === undefined ) {
				direction = 'top';
			}
			//get direction value in data-direction
			if( $tt_btn.parents('.gt-tooltip').attr('data-direction') !== undefined ) {
				direction = $tt_btn.parents('.gt-tooltip').attr('data-direction');
			}
			//get direction value in javascript option
			if( obj.direction !== undefined ) {
				direction = obj.direction;
			}
			//if the direction is set in both the data-direction and the javascript option, the javascript option value takes precedence.
			if( obj.direction !== undefined && $tt_btn.parents('.gt-tooltip').attr('data-direction') !== undefined) {
				direction = obj.direction;
			}

			//set options
			if(obj.color === undefined) obj.color = 'fff';
			if(obj.bgColor === undefined) obj.bgColor = '#808080';
			if(obj.width === undefined) obj.width = '300px';
			if(obj.arrowSize === undefined) obj.arrowSize = '6px';
			
			//set arrow direction
			switch(direction) {
				case 'top':
					arrow_direction = 'bottom';
					break;

				case 'right':
					arrow_direction = 'left';
					break;

				case 'bottom':
					arrow_direction = 'top';
					break;

				case 'left':
					arrow_direction = 'right';
					break;

				default:
					arrow_direction = 'bottom';
					break;
			}

			//make arrow
			$arrow = gtris.util.makeArrow(obj.arrowSize, obj.bgColor, arrow_direction);

			//apply object options
			$tt_cnt.css({
				'color': obj.color,
				'background-color': obj.bgColor,
				'width': obj.width,
				'height': obj.height
			});

			//toggle
			$tt_cnt.toggleClass('gt-active');
			if($tt_cnt.hasClass('gt-active')) {
				$tt_cnt.show();
				$arrow.appendTo($tt_cnt);
			}else{
				$tt_cnt.hide();
				$tt_cnt.find('.gt-arrow').remove();
			}
			
			//set position
			tooltip.setPosition(direction, $tt_btn, $tt_cnt, $arrow);
		},

		setPosition: function(direction, $tt_btn, $tt_cnt, $arrow) {
			var tt_btn_w = $tt_btn.outerWidth();
			var tt_btn_h = $tt_btn.outerHeight();
			var tt_cnt_w = $tt_cnt.outerWidth();
			var tt_cnt_h = $tt_cnt.outerHeight();
			var arrow_w = $arrow.outerWidth();
			var arrow_h = $arrow.outerHeight();

			//display tooltip
			switch(direction) {
				case 'top':
					$tt_cnt.css({left: (tt_btn_w-tt_cnt_w) / 2, top: -(tt_cnt_h+arrow_h)});
					$tt_cnt.find('.gt-arrow').css({left: (tt_cnt_w-arrow_w) / 2, top: tt_cnt_h});
					break;

				case 'bottom':
					$tt_cnt.css({left: (tt_btn_w - tt_cnt_w) / 2, top: (tt_btn_h + arrow_h)});
					$tt_cnt.find('.gt-arrow').css({left: (tt_cnt_w - arrow_w) / 2, top: -(arrow_h)});
					break;

				case 'left':
					$tt_cnt.css({right: tt_btn_w + arrow_w, top: (tt_btn_h - tt_cnt_h) / 2});
					$tt_cnt.find('.gt-arrow').css({right: -(arrow_w), top: (tt_cnt_h - arrow_h) / 2});
					break;

				case 'right':
					$tt_cnt.css({left: (tt_btn_w + arrow_w), top: (tt_btn_h - tt_cnt_h) / 2});
					$arrow.css({left: -(arrow_w), top: (tt_cnt_h - arrow_h) / 2});
					break;
			}
		},

		/* API: open TT */
		Open: function(obj) {
			this.addEvent(obj);
			this.toggleTT(obj);
		},

		/* API: hide TT */
 		Hide: function(target) {
			$(target).find('.gt-tooltip-content').removeClass('gt-active').hide();
			$(target).find('.gt-arrow').remove();
 		},

 		/* API: all hide TT */
		HideAll: function() {
			$('.gt-tooltip-content').removeClass('gt-active').hide();
			$('.gt-tooltip-content').find('.gt-arrow').remove();
		}
	};

	gtris.ui.tooltip = tooltip;

})(window.gtris);

},{}],12:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.util) {
		gtris.util = window.gtris.util = {};
	}

	var addComma = function(num) {
		var _num = String(num).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
		return _num;
	};

	gtris.util.addComma = addComma;

})(window.gtris);

},{}],13:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.util) {
		gtris.util = window.gtris.util = {};
	}

	var autoDashDate = function(str) {
		var _str = str.replace(/[^0-9]/g, '');
		var tmp = '';
		if(_str.length < 5) {
			return str;
		}else if(_str.length < 7) {
			tmp += _str.substr(0, 4);
			tmp += '-';
			tmp += _str.substr(4, 5);
			return tmp;
	    }else{
			tmp += _str.substr(0, 4);
			tmp += '-';
			tmp += _str.substr(4, 2);
			tmp += '-';
			tmp += _str.substr(6, 2);
			return tmp;
		}
	};

	gtris.util.autoDashDate = autoDashDate;

})(window.gtris);

},{}],14:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.util) {
		gtris.util = window.gtris.util = {};
	}

	var autoDashPhoneNumber = function(str) {
		var _str = str.replace(/[^0-9]/g, '');
		var tmp = '';
		if(_str.length < 4) {
			return _str;
		}else if(_str.length < 7) {
			tmp += _str.substr(0, 3);
			tmp += '-';
			tmp += _str.substr(3);
			return tmp;
		}else if(_str.length < 11) {
			tmp += _str.substr(0, 3);
			tmp += '-';
			tmp += _str.substr(3, 3);
			tmp += '-';
			tmp += _str.substr(6);
			return tmp;
		}else{
			tmp += _str.substr(0, 3);
			tmp += '-';
			tmp += _str.substr(3, 4);
			tmp += '-';
			tmp += _str.substr(7);
			return tmp;
		}
		return str;
	};

	gtris.util.autoDashPhoneNumber = autoDashPhoneNumber;

})(window.gtris);

},{}],15:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.util) {
		gtris.util = window.gtris.util = {};
	}

	var browser = function() {

		var browserPool = [
			{detectStr: "MSIE", name: "ie"},
			{detectStr: "Trident", name: "ie"},
			{detectStr: "Edge", name: "edge"},
			{detectStr: "Firefox", name: "firefox"},
			{detectStr: "OPR", name: "opera"},
			{detectStr: "Opera mini", name: "opera mini"},
			{detectStr: "Chrome", name: "chrome"},
			{detectStr: "CriOS", name: "chrome"},
			{detectStr: "Safari", name: "safari"}
		];

		var ua = navigator.userAgent;
		var n, v, vOffset;
		for(var i=0; i<browserPool.length; i++) {
			if((vOffset = ua.indexOf(browserPool[i].detectStr)) > -1) {
				n = browserPool[i].name;
				if(browserPool[i].detectStr == 'Trident') { //ie11
					v = ua.substr(ua.indexOf('rv:') + 3);
					v = parseFloat(v.split(')')[0]);
				}
				else if(browserPool[i].detectStr == 'Safari') {
					v = ua.substr(ua.indexOf('Version/') + 8);
					v = parseFloat(v.split('/')[0]);
				}
				else {
					v = ua.substr(vOffset + browserPool[i].detectStr.length + 1);
					v = parseFloat(v.split(' ')[0]);
				}
				break;
			}else{
				n = "unknown";
				v = -1;
			}
		}
		return {name: n, version: v};
	};

	gtris.util.browser = browser();

})(window.gtris);

},{}],16:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.util) {
		gtris.util = window.gtris.util = {};
	}
	
	var setCookie = function(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	};
	
	var getCookie = function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) != -1) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	};
	
	gtris.util.setCookie = setCookie;
	gtris.util.getCookie = getCookie;

})(window.gtris);

},{}],17:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.util) {
		gtris.util = window.gtris.util = {};
	}

	var copyToClipboard = function(text) {
		if(text === undefined || text === '') return;
		var _txt = text;
		if(window.clipboardData) {
			window.clipboardData.setData("text", _txt);
		}else{
			var textarea = document.createElement("textarea");
			textarea.textContent = _txt;
			textarea.style.position = "fixed";
			document.body.appendChild(textarea);
			textarea.select();
			try {
				return document.execCommand("copy");
			} catch (ex) {
				return false;
			} finally {
				document.body.removeChild(textarea);
			}
		}
	};

	gtris.util.copyToClipboard = copyToClipboard;

})(window.gtris);

},{}],18:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.util) {
		gtris.util = window.gtris.util = {};
	}

	var getParameterByName = function(name) {
		if (name === undefined || name === '') return;
		var query = window.location.search.substring(1);
		var vars = query.split('&');
		for (var i=0; i<vars.length; i++) {
			var pair = vars[i].split('=');
			if(pair[0] == name) {
				return pair[1];
			}
        }
    };

    gtris.util.getParameterByName = getParameterByName;

})(window.gtris);

},{}],19:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.util) {
		gtris.util = window.gtris.util = {};
	}

	var isMobile = function() {
		var ua = navigator.userAgent;
		var detectStr = /Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/;
		return detectStr.test(ua);
	};

	gtris.util.isMobile = isMobile();

})(window.gtris);

},{}],20:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.util) {
		gtris.util = window.gtris.util = {};
	}

	var isValidateEmail = function(email) {
		var reg_email = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,5}$/;
		return reg_email.test(email);
	};

	gtris.util.isValidateEmail = isValidateEmail;

})(window.gtris);

},{}],21:[function(require,module,exports){
(function(gtris) {
    'use strict';
    if (!gtris) {
        gtris = window.gtris = {};
    }
    if (!gtris.util) {
        gtris.util = window.gtris.util = {};
    }

    /* Usage 
    gtris.util.makeArrow('300px', 'brown', 'bottom').appendTo('body');
    gtris.util.makeArrow('50', 'orange', 'top').appendTo('body');
    gtris.util.makeArrow('30', 'red', 'left').appendTo('body');
    gtris.util.makeArrow('80', 'blue', 'right').appendTo('body');
    */
    
    var makeArrow = function(size, color, direction) {
        //create span tag
        var arrow = $(document.createElement('span'));
        arrow.addClass('gt-arrow');

        //set default css
        arrow.css({
            'display': 'inline-block',
            'border-color': 'transparent',
            'border-style': 'solid',
            'width': 0,
            'height': 0
        });

        //size nomalization
        var _size = size.toString();
        _size = _size.replace(/[^0-9]/g,'');
        _size = _size + 'px';

        //set arrow direction
        switch(direction) {
            case 'bottom':
                arrow.css({
                    'border-top-color': color,
                    'border-top-width': _size,
                    'border-right-width': _size,
                    'border-bottom-width': 0,
                    'border-left-width': _size
                });
                break;
            case 'top':
                arrow.css({
                    'border-bottom-color': color,
                    'border-top-width': 0,
                    'border-right-width': _size,
                    'border-bottom-width': _size,
                    'border-left-width': _size
                });
                break;
            case 'left':
                arrow.css({
                    'border-right-color': color,
                    'border-top-width': _size,
                    'border-right-width': _size,
                    'border-bottom-width': _size,
                    'border-left-width': 0
                });
                break;
            case 'right':
                arrow.css({
                    'border-left-color': color,
                    'border-top-width': _size,
                    'border-right-width': 0,
                    'border-bottom-width': _size,
                    'border-left-width': _size
                });
                break;
            default:
                break;
        }
        return arrow;
    };

    gtris.util.makeArrow = makeArrow;

})(window.gtris);

},{}],22:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.util) {
		gtris.util = window.gtris.util = {};
	}

	var makeDimmed = function(className, opacity, bgColor, zIndex) {

		var dimmed = document.createElement('div');
		dimmed.style.position = 'fixed';
		dimmed.style.top = 0;
		dimmed.style.left = 0;
		dimmed.style.width = '100%';
		dimmed.style.height = '100%';

		if(className === undefined) {
			className = 'gt-overlay';
		}else{
			className = className;
		}

		if(opacity === undefined) {
			opacity = 0.5;
		}else{
			opacity = opacity;
		}

		if(bgColor === undefined) {
			bgColor = '#000';
		}else{
			bgColor = bgColor;
		}

		if(zIndex === undefined) {
			zIndex = 1000;
		}else{
			zIndex = zIndex;
		}

		dimmed.setAttribute('class', className);
		dimmed.style.opacity = opacity;
		dimmed.style.background = bgColor;
		dimmed.style.zIndex = zIndex;

		return dimmed;
	};

	gtris.util.makeDimmed = makeDimmed;

})(window.gtris);

},{}],23:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.util) {
		gtris.util = window.gtris.util = {};
	}

	var os = function() {
		var ua = navigator.userAgent;
		var aver = navigator.appVersion;
		var osPool = [
			{name:"Windows 10", detectStr:/(Windows 10.0|Windows NT 10.0)/},
			{name:"Windows 8.1", detectStr:/(Windows 8.1|Windows NT 6.3)/},
			{name:"Windows 8", detectStr:/(Windows 8|Windows NT 6.2)/},
			{name:"Windows 7", detectStr:/(Windows 7|Windows NT 6.1)/},
			{name:"Windows Vista", detectStr:/Windows NT 6.0/},
			{name:"Windows Server 2003", detectStr:/Windows NT 5.2/},
			{name:"Windows XP", detectStr:/(Windows NT 5.1|Windows XP)/},
			{name:"Windows 2000", detectStr:/(Windows NT 5.0|Windows 2000)/},
			{name:"Windows ME", detectStr:/(Win 9x 4.90|Windows ME)/},
			{name:"Windows 98", detectStr:/(Windows 98|Win98)/},
			{name:"Windows 95", detectStr:/(Windows 95|Win95|Windows_95)/},
			{name:"Windows NT 4.0", detectStr:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
			{name:"Windows CE", detectStr:/Windows CE/},
			{name:"Windows 3.11", detectStr:/Win16/},
			{name:"Android", detectStr:/Android/},
			{name:"Open BSD", detectStr:/OpenBSD/},
			{name:"Sun OS", detectStr:/SunOS/},
			{name:"Linux", detectStr:/(Linux|X11)/},
			{name:"iOS", detectStr:/iP(hone|od|ad)/},
			{name:"Mac OS X", detectStr:/Mac OS X/},
			{name:"Mac OS", detectStr:/Mac(PPC|Intel|_PowerPC|intosh)/},
			{name:"QNX", detectStr:/QNX/},
			{name:"UNIX", detectStr:/UNIX/},
			{name:"BeOS", detectStr:/BeOS/},
			{name:"OS/2", detectStr:/OS\/2/},
			{name:"Search Bot", detectStr:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
		];
		var n, v;

		for(var i=0; i<osPool.length; i++) {
			if(osPool[i].detectStr.test(ua)) {
				n = osPool[i].name;
				break;
			}else {
				n = "unknown";
			}
		}
		switch (n) {
			// case 'Mac OS X':
			// 	v = /Mac OS X (10[\.\_\d]+)/.exec(ua)[1];
			// 	break;
			case 'Mac OS X':
				v = /Mac OS X ([\d]{2}[\.\_\d]+)/.exec(ua)[1];
				break;
			case 'Android':
				v = /Android ([\.\_\d]+)/.exec(ua)[1];
				break;
			case 'iOS':
				v = /OS (\d+)_(\d+)_?(\d+)?/.exec(aver);
				v = v[1] + '.' + v[2] + '.' + (v[3] | 0);
				break;
			default:
				v = -1;
		}
		if(/Windows/.test(n)) {
			v = /Windows (.*)/.exec(n)[1];
			n = 'Windows';
		}
		return {name: n, version: v};
	};

	gtris.util.os = os();

})(window.gtris);

},{}],24:[function(require,module,exports){
(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.util) {
		gtris.util = window.gtris.util = {};
	}

	var removeComma = function(num) {
		var str = Number(num.replace(/\,/g, ''));
		return str;
	};

	gtris.util.removeComma = removeComma;

})(window.gtris);

},{}]},{},[1]);
