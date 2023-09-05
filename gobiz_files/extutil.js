/**
jquery extends util
Cracky

should be import script for daum zip code popup
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>

**/

/*document.write('<script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>');

var _snsBaseUrl = {
	twitter  : 'http://twitter.com/share',
	facebook : 'http://www.facebook.com/sharer/sharer.php'
};
*/

/**
 * 로딩 이미지 추가 
 * ex) var eler = $(document.body).blockLoadingUI();		//로딩이미지 디스플레이
 * eler.unblock();		// 로딩이미지 제거
 * 2018.10.17
 */
jQuery.fn.blockLoadingUI = function(){
	var $this = $(this);
	var opts = {
		block : function() {
			$this.block({
				'message':'<div class="lodding"><div><img src="/mngr/images/common/lodding.gif"></div><span> Now Loading.. <br/> Please wait ..</span></div>'
				, 'css' : {
					'width' : '260px'
				}
			});
		}
		, unblock : function() {
			$this.unblock();
		}
	}
	opts.block();
	return opts;
};


/**
 * 숫자 validator 
 */
var validNumberCheck = {
	    keyDown : function (e) {
	        var key;
	        if(window.event)
	            key = window.event.keyCode; 
	        else
	            key = e.which; 
	        var event;
	        if (key == 0 || key == 8 || key == 46 || key == 9){
	            event = e || window.event;
	            if (typeof event.stopPropagation != "undefined") {
	                event.stopPropagation();
	            } else {
	                event.cancelBubble = true;
	            }   
	            return;
	        }
	        if (key < 48 || (key > 57 && key < 96) || key > 105 || e.shiftKey) {
	            e.preventDefault ? e.preventDefault() : e.returnValue = false;
	        }
	    },        
	    keyUp : function (e) {
	        var key;
	        if(window.event)
	            key = window.event.keyCode;
	        else
	            key = e.which;
	        var event;
	        event = e || window.event;        
	        if ( key == 8 || key == 46 || key == 37 || key == 39 ) 
	            return;
	        else
	            event.target.value = event.target.value.replace(/[^0-9]/g, "");
	    },
	    focusOut : function (ele) {
	    	if (!ele.hasClass('currency'))	/* 화폐 처리는 제외시킨다 */
	    		ele.val(ele.val().replace(/[^0-9]/g, ""));
	    }
	};


// init function 
jQuery(document).ready(function(){
	
	$.setEnter();	/* 엔터처리*/
	$.setNumber();	/* 숫자 입력 모드 */
});

jQuery.extend({
	
	/* daum 우편번호 검색 팝업
	 * 
	 *  { mode , code , flds}
	 *  */
	openDaumPopup : function (_obj) {
		var _mode = _obj.mode;
		var _code = _obj.code;
		var _field = _obj.flds;
		new daum.Postcode({
	        oncomplete: function(data) {
	        	var _addr_data = data.address;
	        	var _zipcode = data.postcode;
	        	if ( isNotEmpty (_mode)) {
	        		if (_mode.toLowerCase() == 'd') {
	        			_addr_data = data.roadAddress;
	        		} else if (_mode.toLowerCase() == 'j') {
	        			_addr_data = data.jibunAddress;
	        		}  
	        	}
	        	if ( isNotEmpty (_code)) {
	        		if (_code.toLowerCase() == 'zone') {
	        			_zipcode = data.zonecode;
	        		}
	        	}
	        	if ( isNotEmpty(_field) && _field.length > 0) {
	        		var _fields = _field.split(',');
		            jQuery("#"+ _fields[0]).val(_zipcode); 
		            jQuery("#"+ _fields[1]).val(_addr_data); 
	        	}
	        }
	    }).open();
	} ,

	/* daum 우편번호 검색 팝업2
	 * kr , eng (fields)
	 * mode :  d 도로명 , j : 지번
	 * 
	 * eng : [0] : zipcode
	 *       [1],[2] : base addr
	 *       [3] : city 
	 *       [4] : state 
	 *  { mode , code , flds}
	 *  */
	openDaumPopup2 : function (_obj) {
		
		var _mode = _obj.mode;
		var _code = _obj.code;
		var _kr = _obj.kr;
		var _eng = _obj.eng;
		
		new daum.Postcode({
	        oncomplete: function(data) {
	        	var _addr_data = data.address;
	        	var _zipcode = data.postcode;
	        	var adrs = {};
	        	if ( isNotEmpty (_mode)) {
	        		if (_mode.toLowerCase() == 'd') {
	        			adrs.kr =  data.roadAddress;
	        			adrs.eng = data.roadAddressEnglish;
	        		} else if (_mode.toLowerCase() == 'j') {
	        			adrs.kr =  data.jibunAddress;
	        			adrs.eng = data.jibunAddressEnglish;
	        		}
	        			
	        	}
	        	if ( isNotEmpty (_code)) {
	        		if (_code.toLowerCase() == 'zone') {
	        			_zipcode = data.zonecode;
	        		}
	        	}
	        	
	        	/* 0번째 키는 post code */
	        	
	        	if ( isNotEmpty(_kr) && _kr.length > 0) {
	        		var _fields = _kr.split(',');
		            jQuery("#"+ _fields[0]).val(_zipcode); 
		            jQuery("#"+ _fields[1]).val(adrs.kr); 
	        	}	 
	        	
	        	if ( isNotEmpty(_eng) && _eng.length > 0) {
	        		
	        		/* array : 0 ,1 : base addr  |  2 : city  , 3 :  state */
	        		var engAddrs = (adrs.eng).split(',');
	        		
	        		var _fields = _eng.split(',');
		            jQuery("#"+ _fields[0]).val(_zipcode); 
		            var _baseAddr = '';
		            for (var i = 0 ; i < engAddrs.length-3 ; i ++) {
		            	_baseAddr += engAddrs[i] + '';
		            }
		            jQuery("#"+ _fields[1]).val(_baseAddr); 
		            if (isNotEmpty(_fields[2]))
		            	jQuery("#"+ _fields[2]).val(engAddrs[engAddrs.length-3]); 
		            if (isNotEmpty(_fields[3]))
		            	jQuery("#"+ _fields[3]).val(engAddrs[engAddrs.length-2]); 
	        	}
	        }
	    }).open();
	} ,
	
	/**
	 * 화폐 형식 적용 (input type : text) 
	 * 3자리 단위로 콤마 적용
	 * userage : class = 'currency' 추가 
	 */
	
	setCurrency : function () {
		jQuery.each (jQuery('.currency') , function(){
			if ($(this).attr('type') == 'text') {
				$(this).bind('keyup',function(){
					$(this).val ( gfn_addComma($(this).val()) ); 
				})
				if ( isNotEmpty( $(this).val() )) {	 //최초 데이터가 있는 경우에도 콤마를 붙여준다. 
					$(this).val ( gfn_addComma($(this).val()) ); 
				}
			}
		})
	}, 
	
	/**
	 * mask 속성
	 * 숫자 속성 (ex) 전화번호
	 * 999)9999-9999
	 */
	
	setMask : function () {
		jQuery.each (jQuery('.mask') , function(){
			var _attrFormat = $(this).attr('mask');
			if ( isNotEmpty (_attrFormat) ) {
				$(this).removeAttr('mask');
				$(this).mask(_attrFormat);
			}
		});
	} ,
	
	setNumber : function () {
		jQuery('.number').css("ime-mode", "disabled").keydown( function(e) {
			validNumberCheck.keyDown(e);
		}).keyup( function(e){
			validNumberCheck.keyUp(e);
		}).focusout( function(e){        
			validNumberCheck.focusOut($(this));
		});
	} ,
	
	/**
	 * text enter 이벤트 
	 * target = 이벤트 펑션명
	 */
	setEnter : function () {
		jQuery('.enter').bind ('keydown' , function() {
			if (event.keyCode == '13') {
				var _target = jQuery(this).attr('target') ;
				if ( isNotEmpty (_target)){
					window[_target](this);
				}
			}
		});
	},
	
	/**
	 * datepicker 달력
	 * jquery ui : datepicker 
	 */
	
	setDatePicker : function (pOption) {
		/*changeYear  : 'true', changeMonth : 'true'*/
		jQuery('.date').datepicker(
				isNotEmpty(pOption) 
				? pOption : {
					dateFormat  : 'yy-mm-dd',
					dayNamesMin : ['월','화','수','목','금','토','일'],
					monthNamesShort  : ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					buttonImage : '/common/img/btn_cale.gif',
					buttonImageOnly: true
				} 
		);
		jQuery('.date').css({'z-index':'10000', 'position':'relative'});	/* 달력 레이어 최상위 노출 */
	} ,
	
	/**
	 * input text , hidden , html 대상
	 * o { class : '적용대상 class', 
	 *     pattern : '3,5,2',
	 *     seperator : '-' 
	 * }
	 * pattern 의 길이로 특정 class에 포함된 내용을 seperator를 이용하여 조합한다.;
	 * @param o
	 */
	makeFormatStr : function (o) {
		if ( isNotEmpty (o)) {
			jQuery.each ( jQuery('.'+o.class) , function(){
				var _pattern = o.pattern;
				var _sptr    = o.seperator;
				if ( isNotEmpty (_pattern) ) {
					var _value  = '';
					if ( $(this).attr('type') == 'text' || $(this).attr('type') == 'hidden') {
						_value =  lfn_makeFormat( $(this).val() ,  _pattern , _sptr );
						$(this).val (_value);
					} else {
						_value = lfn_makeFormat ($(this).html() , _pattern , _sptr);
						$(this).html(_value);
					}
				}
			});
		}
	},
	
	imgPreView : function (defaultOpt) {
		if (!defaultOpt.inputFile || !defaultOpt.img) return;
        var inputFile = defaultOpt.inputFile.get(0);
        var img       = defaultOpt.img.get(0);
        /* IE 10이상 */
        if (window.FileReader) {
            /* image type 적용 */
            if (!inputFile.files[0].type.match(/image\//)) return;
            try {
                var reader = new FileReader();
                reader.onload = function(e){
                    img.src = e.target.result;
                    img.style.width  = defaultOpt.w+'px';
                    img.style.height = defaultOpt.h+'px';
                    img.style.display = '';
                }
                reader.readAsDataURL(inputFile.files[0]);
            } catch (e) {
                // exception...
            }
        } else if (img.filters) {	/* iE 9 이하  filter 처리 */
            inputFile.select();
            inputFile.blur();
            var imgSrc = document.selection.createRange().text;
            img.style.width  = defaultOpt.w+'px';
            img.style.height = defaultOpt.h+'px';
            img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";           
            img.style.display = '';
        } else {
            gfn_errorMsg('지원하지 않는 브라우저입니다.');
        }
    } ,
    
    /* Twitter oauth인증 방식 (Java)
     * updateMessage : 트위트 데이터
     * option : popup 옵션 
     * */
    executeTwitter : function (o) {
    	
    	var width = o.width , height = o.height;
    	
        var popOption = 'toolbar=0, location=0, status=0, menubar=0, scrollbars=1, resizable=1, width='+width+', height='+height;
    	$.ajax({
    		url : '/common/sns/twitter.do',
    		data : {updateMessage : o.updateMessage},
    		success : function (r) {
    			if (r.isOpen) {
    				window.open (r.reqTokenUrl,'twitterAuthPopup',popOption);
    			} else {
    				gfn_infoMsg(r.message);
    				return;
    			}
    		}
    	})
    } ,
    
    /**
     * SNS 위젯 처리 ( tiwtter  ,  facebook )
     * @param o
     */
    snsWidget : function (o) {
    	var title   = encodeURIComponent(gfn_escapeXml(o.title));	/* 제목 */
    	var conUrl  = _snsBaseUrl[o.type];	/* twitter , facebook*/
    	var dataUrl= o.url == undefined || o.url == null ? location.href : o.url ;	
    	if (o.type == 'twitter') conUrl += '?text=' + (title + '[' + dataUrl +']');
    	//else conUrl +=  'p[url]=' + encodeURIComponent(dataUrl) + '&p[title]=' + title;
    	else conUrl +=  '?u=' + encodeURIComponent(dataUrl) + '&t=' + title;
    	window.open(conUrl, o.type + 'Popup', 'width=680, height=524 ,scrollbars=no, resizable=no');
    },
    
    /**
     * 국가 텍스트 셀렉트 박스 동기화 
     */
    setNationSync : function () {
    	$.each ( $('.nationSync') , function(){
    		$(this).bind('change',function(){
    			var id = $(this).attr('id');
	    		var sText = ($('#'+id+' option:selected').text()).replace(/\(.*\)/g, "");
	    		$.each ( $('.nationSync') , function(){
	    			var _id = $(this).attr('id');
	    			if ( id != _id ) { 
		    			lfn_compareOptionValue(_id , sText);
	    			}
	    		});
    		});
    	})
    }
});


/**
 * 국가 코드 텍스트 비교 
 */
function lfn_compareOptionValue (_id , sText) {
	$.each ($('#'+_id +' option') , function(){
		var txt = (($(this).text()).replace(/\(.*\)/g, "")).replaceAll(' ','');
		sText = sText.replaceAll(' ','');
		if ( $.trim(txt) == $.trim(sText) ) {
			$(this).prop('selected',true);
			return false;
		}
	});
}

/**
 * 분기 처리를 통한 Image Preview 
 * @param {
 * 		img: 'img tag id (이미지 객체)', 
 *      w: 200 (width),
 *      h: 200 (heiht)
 * }
 */
jQuery.fn.setPreview = function(opt){
    "use strict"
    var defaultOpt = {
        inputFile: $(this),
        img: null,
        w: 200,
        h: 200
    };
    jQuery.extend(defaultOpt, opt);
    var previewImage = function(){
    	$.imgPreView (defaultOpt);
    }
    jQuery(this).change(function(){
        previewImage();		/* event bind */
    });
};

/*
 *  이미지 사이즈 조절 maxWidth 사이즈만큼 
 */
jQuery.fn.resizeWidthImg = function (maxWidth) {
	jQuery.each ( jQuery(this).find('img') , function(){
		var style = $(this).attr('style');
		var width,height;
		var flag = false;
		if (style) {
			
			style = style.toLowerCase().replace('height',' height');  //추가 크롬인경우 공백을 인싱함으로 .. 
			var match = /(?:^|\s)width\s*:\s*(\d+)px/i.exec( style );
			width = match && match[1];
			match = /(?:^|\s)height\s*:\s*(\d+)px/i.exec( style );
			height = match && match[1];
		    flag = true;
		} else {
			width = $(this).css('width');
			height = $(this).css('height');
			if (width.indexOf('px') != -1)
				width = width.substring(0,width.length-2);
			if (height.indexOf('px') != -1)
				height = height.substring(0,height.length-2);
		}
		
		if ( height ) {
			if (flag) {
				$(this).attr('style', style.replace( /(?:^|\S)height\s*:\s*(\d+)px;?/i , ''));
			}
	        jQuery(this).css( 'height' , height);
	    }
	    
	    if ( width ) {
	    	 if (flag) {
	    		$(this).attr('style', style.replace(  /(?:^|\S)width\s*:\s*(\d+)px;?/i , ''));
	    	 }
	    	
	         if (width > maxWidth) {   
	             var new_height = Math.ceil((height * maxWidth) / width);
	             jQuery(this).css( 'width' , maxWidth);
	             jQuery(this).css( 'height' , new_height);
	             
	         } else  {
	        	 jQuery(this).css( 'width' , width);
	         }
	    }
	});
};
