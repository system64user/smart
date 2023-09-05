/***********************************************************************************
 * Script util
 ***********************************************************************************/

var _defaultNoImg = '/common/img/noimg.png';		/* 이미지 없음 */


/**
 * check null
 * @param obj
 * @returns {Boolean}
 */
function isNotEmpty (obj) {
	if (obj == null || obj == '' || obj == undefined || obj.length == 0)
		return false;
	return true;
}

/**
 * 3자리 단위로 콤마 추가
 * @param str
 * @returns
 */
function gfn_addComma (str) {
	var regx =  /(^[+-]?\d+)(\d{3})/;
	str = gfn_removeComma(str);
	if (isNotEmpty(str)) {
		while(regx.test(str)) {
			str = str.replace(regx,"$1" + "," + "$2");
		}
	}
	return str;
}

/**
 * 콤마 제거
 * @param str
 * @returns
 */
function gfn_removeComma (str) {
	if (isNotEmpty(str))
		return str.replaceAll(",","");
	return str;
}


/**
 * el객체의 String array 배열에 해당하는 속성 제거
 */
function gfn_removeAttribute ($el , pArray) {
	if (pArray != null && pArray.length > 0) {
		for (var i = 0 ; i < pArray.length ; i ++) {
			$el.removeAttr(pArray[i]);
		}
	}
}

/**
 * 현재 일자에서 특정 일자를 계산한다.
 * @param pCalGub : y (년) , m (월) , d (일)
 * pTerm          : 기간
 * pDelium        : 구분자
 * @returns
 */
function gfn_getCalDate (pCalGub , pTerm , pDelium) {
	var curDate = new Date();
	if ( pCalGub.toLowerCase() == 'y' ) {
		curDate.setYear(curDate.getFullYear() + parseInt(pTerm));
	} else if ( pCalGub.toLowerCase() == 'm' ) {
		curDate.setMonth(curDate.getMonth() + parseInt(pTerm));
	} else if ( pCalGub.toLowerCase() == 'd' ) {
		curDate.setDate(curDate.getDate() + parseInt(pTerm));
	}
	var dMn = curDate.getMonth()+1;
	dMn = dMn < 10 ? '0'+ dMn : dMn;
	var dYn =curDate.getDate();
	dYn = dYn < 10 ? '0'+ dYn : dYn;
	return curDate.getFullYear() + pDelium + dMn + pDelium + dYn;
}

/**
 * 사업자 번호 유효성 체크
 * @param pCalGub : y (년) , m (월) , d (일)
 * bizNo          : 사업자번호
 * @returns
 */
function gfn_chkBizNo(bizNo){
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    var i, chkSum=0, c2, remander;
    bizNo = bizNo.getFilterValue();	/* 특수문자 제거 */
    for (i=0; i<=7; i++) chkSum += checkID[i] * bizNo.charAt(i);
    c2 = "0" + (checkID[8] * bizNo.charAt(8));
    c2 = c2.substring(c2.length - 2, c2.length);
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
    remander = (10 - (chkSum % 10)) % 10 ;
    if (Math.floor(bizNo.charAt(9)) == remander)
    	return true ;
    return false;
}

/**
 * Input 요소에 freeze 처리
 * class='exclude' 가 없는 요소에 대하여 처리
 * @returns
 */
function gfn_freezeElements () {
	$.each ($('input') , function (){
		var _attr = $(this).attr('type');
		if ( _attr == 'text' && !$(this).hasClass('exclude')) {
			$(this).parent().addClass('oroVisible');
			$(this).parent().hide();
			$(this).parent().after('<span class="_rtext" style="height:26px;">'+$(this).val()+'</span>');
		} else if ( _attr == 'checkbox' || _attr == 'radio' ) {
			$(this).attr('disabled','disabled');
		}
 	});
	$.each ($('select') , function (){
		if (!$(this).hasClass('exclude')) {
			$(this).parent().addClass('oroVisible');		/* 다시 보여줄 원본 엘리먼트 */
			$(this).parent().hide();		// 셀렉트 박스 hide
			/* 선택된 데이터 텍스트를 innerHtml으로 넣어준다.*/
			$(this).parent().after('<span class="_rtext">'+$(this).children("option:selected").text()+'</span>');		/* readonly 제거를 위한 class (_rtext) 추가*/
		}
	});
	$.each ($('textarea') , function (){
		if (!$(this).hasClass('exclude')) {
			$(this).attr('readOnly',true);
		}
	});

	/* 특정 요소에 대한 (class='nope') diplay->none 처리  */
	$('.nope').hide();
}

/**
 *Input 요소에 release 처리
 */
function gfn_releaseElements () {
	$('._rtext').remove();
	$('.oroVisible').show();
	$.each ( $('textarea') , function(){
		if (!$(this).hasClass('exclude')) {
			$(this).attr('readOnly',false);
		}
	});
	/* 특정 요소에 대한 (class='nope') diplay-> block 처리  */
	$('.nope').show();
	/* radio ,checkbox */
	$.each ($('input') , function (){
		var _attr = $(this).attr('type');
		if ( _attr == 'radio' || _attr == 'checkbox') {
			$(this).removeAttr("disabled");
		}
	});
}

/**
 * formatted value
 * @param pVal      : 대상 value
 * @param pPattern  : 패턴 숫자 (ex) 3,5,2  -> 사업자번호 형태
 * @param pSptr		: 연결 구분자
 * @returns
 */
function lfn_makeFormat (pVal , pPattern, pSptr) {
	if (isNotEmpty(pVal)) {
		var ptrn = pPattern.split(',');
		var tmpval = pVal;
		var saveTmpValue = 0;
		for (var i = 0 ; i < ptrn.length ; i ++) {
			if (i == 0) {
				tmpval = pVal.substring(0 , parseInt(ptrn[0])) + pSptr;
				saveTmpValue = parseInt(ptrn[0]);
			} else {
				var _endLen = parseInt(ptrn[i]) <= pVal.length ? parseInt(ptrn[i]) : pVal.length;
				tmpval+= pVal.substring(saveTmpValue ,saveTmpValue + _endLen);
				saveTmpValue += _endLen;
				if ( i < ptrn.length -1)
					tmpval += pSptr;
			}
		}
		return tmpval;
	}
	return pVal;
}

/**
 * formatted value setting (ID기준)
 * @param pVal      : pSeperator가 포함된 대상 value
 * @param pPattern  : 구분자
 * @param pSptr		: 대상 id (콤마로 구분)
 * pVal length 와 pTarget length가 동일한경우
 * @returns
 */
function gfn_formattedElements (pVal , pSeperator, pTarget) {
	if ( isNotEmpty (pVal)) {
		var val_ary = pVal.split(pSeperator);
		for (var i = 0 ; i < val_ary.length ; i ++) {
			$('#' + pTarget.split(',')[i]).val(val_ary[i]);
		}
	}
}


/**
 * 배열 요소 (name기준) 를 문자열로 변환한다.
 * @param pNam          : Input name (title,date,name ...)
 * @param pSeperator    : 구분자
 * @param pRowSeperator	: 로우 구분자
 * pVal length 와 pTarget length가 동일한경우
 * @returns
 */
function gfn_makeSeperateString (pNam , pSeperator , pRowSeperator) {
	var elements = pNam.split(',');
	if (isNotEmpty(elements)) {
		var result = '';
		var arayCnt = 0;
		$.each ($('[name="'+elements[0]+'"]') , function() {
			for (var i = 0 ; i < elements.length ; i ++ ) {
				result += $('[name='+elements[i]+']').eq(arayCnt).val();
				if ( i < elements.length - 1)
					result += pSeperator;
			}
			result += pRowSeperator;
			arayCnt++;
		});
		if (isNotEmpty(result))
			result = result.substring(0,result.length-1);
		return result;
	}
	return '';
}

/**
 * 이미지 파일 확장자 체크
 * @returns
 */
function gfn_checkFileExt (fileValue) {
	var _imgExt = 'jpg,jpeg,bmp.png,gif,pcx';
	if (!isNotEmpty(fileValue))
		return false;
	else {
		var spValue = fileValue.split('.');
		var ext = spValue[spValue.length-1];
		if (_imgExt.indexOf(ext.toLowerCase()) != -1)
			return true;
		else
			return false;
	}
}

/**
 * 사용자 파일 확장자 체크
 * @param pType	: 파일 체크 기준 확장자
 * @param fileValue	: 체크 대상 value
 * @returns {Boolean}
 */
function gfn_checkCustFileExt (pType , fileValue) {
	if (!isNotEmpty(fileValue))
		return false;
	else {
		var spValue = fileValue.split('.');
		var ext = spValue[spValue.length-1];
		if (pType.toLowerCase().indexOf(ext.toLowerCase()) != -1)
			return true;
		else
			return false;
	}
}

/**
 * 테이블 요소 : elements + 파일 배열 매핑을 위한 rename 처리
 * @param _renSeperator : 중복방지 삽입 문자
 * @param tId : 테이블 요소 ID
 * @param pFormId : 폼 객체 ID
 */
function gfn_renameElementsForSubmit( tId , pFormId , _renSeperator) {
	if (!isNotEmpty(_renSeperator)) _renSeperator = "__sbc";
	var trObj = $('#'+tId).find('tr');
	for (var i = 1 ; i < trObj.size() ; i++ ) {
		$.each ( $('#'+tId).find('tr:eq('+i+')').find('input') ,function(){
			var elnm = $(this).attr('name');
			if (elnm.indexOf(_renSeperator) == -1) {
				$(this).attr('name' , elnm + _renSeperator + (i -1));
			}
		});
	}
	$('#'+pFormId).append('<input type = "hidden" name = "_renSeperator" value="'+_renSeperator+'"/>');
	$('#'+pFormId).append('<input type = "hidden" name = "_renSize" value="'+(trObj.size()-1)+'"/>');
}


/** 쿠키 관련 함수
 *
 * pName  : 쿠키명
 * pValue : 쿠키value
 * pExpirehours : 만료일
 * pDomain (opt)
 * */
function gfn_setCookie(pName, pValue, pExpirehours, pDomain) {
	var today = new Date();
	today.setTime(today.getTime() + (60*60*1000*pExpirehours));
	document.cookie = pName + "=" + escape( pValue ) + "; path=/; expires=" + today.toGMTString() + ";";
	if (pDomain) {
		document.cookie += "domain=" + pDomain + ";";
	}
}

/**
 * 쿠키 가져오기
 * @param pName
 */
function gfn_getCookie(pName) {
	var find_sw = false;
	var start, end;
	var i = 0;
	for (i=0; i<= document.cookie.length; i++) {
		start = i;
		end = start + pName.length;
		//console.log(document.cookie.substring(start, end));
		if(document.cookie.substring(start, end) == pName) {
			find_sw = true;
			break;
		}
	}

	if (find_sw == true) {
		start = end + 1;
		end = document.cookie.indexOf(";", start);
		if(end < start)
			end = document.cookie.length;
		return document.cookie.substring(start, end);
	}
	return "";
}

/**
 * 쿠키 삭제 처리
 * @param pName
 */
function gfn_deleteCookie(pName) {
	var today = new Date();
	today.setTime(today.getTime() - 1);
	var value = gfn_getCookie(pName);
	if(isNotEmpty(value))
		document.cookie = pName + "=" + value + "; path=/; expires=" + today.toGMTString();
}
/**
 * mail 포맷 체크
 * @param pMail
 * @returns {Boolean}
 */
function gfn_checkEmail (pMail) {
	var mailRegx = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
	if (isNotEmpty(pMail))
		if ( pMail.match(mailRegx) )
			return true;
	return false;
}

/**
 * 특수문자 치환
 * @param str
 * @returns
 */
function gfn_transCssTagStr (str) {
	str = str.replace(/</g,"&lt;");
	str = str.replace(/>/g,"&gt;");
	str = str.replace(/\"/g,"&quot;");
	str = str.replace(/\'/g,"&#39;");
	str = str.replace(/\n/g,"<br />");
 return str;
}

/**
 * 영문 + 숫자 혹은
 * 영문 + 특수문자 비밀번호 검증 9 ~ 15 자리
 * @returns {Boolean}
 */
function gfn_checkPassword(upw) {
	var regx_enp = /^[a-zA-Z0-9!@#$%^&*()?_~\s]{9,15}$/;	/* 영문 + 숫자 + 특수문자*/
	 var chk = 0;
	 if(upw.search(/[0-9]/g) != -1 ) chk ++;
	 if(upw.search(/[a-z]/ig)  != -1 ) chk ++;
	 if(upw.search(/[!@#$%^&*()?_~\s]/g)  != -1  ) chk ++;
	 if(chk < 2) {
		 return false;
	 }
	 if(upw.length < 9 || upw.length > 15) {
		return false;
	 }
	return true;
}

/**
 * 상품 상세 메인 이미지 미리보기
 * @param pAreaId : 미리보기 영역 이미지 ID
 * @param pTargetId : 마우스 오버 이미지 ID
 */
function gfn_previewMainImage ( pAreaId , pTargetId , youtubeId) {
	var targetSrc = $('#' + pTargetId).attr('src');
	var targetIdx = targetSrc.indexOf('.do?');
	var baseUrl = targetSrc.substring(0 , targetIdx) + '.do';
	var params = targetSrc.substring(targetIdx + 4,targetSrc.length);
	var sendParamStr = '';
	if (isNotEmpty(params)) {
		var spParam = params.split('&');
		for (var i in spParam) {
			sendParamStr += spParam[i].split('=')[0] + '=';
			if (spParam[i].split('=')[0] == 'image_se_code') {		/*상품 이미지 썸네일 구분*/
				var thmb = spParam[i].split('=')[1];
				sendParamStr+= thmb.substring(0,thmb.length-3)+'498';
				//var thmbIdx = thmb.indexOf('_THUMB');
				//sendParamStr += thmb.substring(0,thmbIdx);	/* main code 추출 */
			} else
				sendParamStr += spParam[i].split('=')[1];
			if ( i < spParam.length -1 ) sendParamStr += '&';
		}
	}
	//$('#' + pAreaId).attr('src' , baseUrl + '?' + sendParamStr);
	if(pTargetId == 'dsp0') $('#' + pAreaId).html("<embed id='player' type='text/html' width='498' height='498' src='https://www.youtube.com/embed/"+youtubeId+"' frameborder='0' ></embed>");
	//if(pTargetId == 'dsp0') $('#' + pAreaId).html("<iframe  allow='autoplay; encrypted-media' src='https://www.youtube.com/embed/"+youtubeId+"?rel=0&amp;__authenticIframe=true&autoplay=1' width='498' height='498' frameborder='0' allowfullscreen=''></iframe>");
	else	$('#'+pAreaId).html("<img src='"+baseUrl + "?" + sendParamStr +"' />");
		
	//gfn_bindImgError($('#' + pAreaId));
}

function gfn_previewMobileImage ( pAreaId , pTargetId , youtubeId) {
	var targetSrc = $('#' + pTargetId).attr('src');
	var targetIdx = targetSrc.indexOf('.do?');
	var baseUrl = targetSrc.substring(0 , targetIdx) + '.do';
	var params = targetSrc.substring(targetIdx + 4,targetSrc.length);
	var sendParamStr = '';
	if (isNotEmpty(params)) {
		var spParam = params.split('&');
		for (var i in spParam) {
			sendParamStr += spParam[i].split('=')[0] + '=';
			if (spParam[i].split('=')[0] == 'image_se_code') {		/*상품 이미지 썸네일 구분*/
				var thmb = spParam[i].split('=')[1];
				sendParamStr+= thmb.substring(0,thmb.length-3)+'498';
				//var thmbIdx = thmb.indexOf('_THUMB');
				//sendParamStr += thmb.substring(0,thmbIdx);	/* main code 추출 */
			} else
				sendParamStr += spParam[i].split('=')[1];
			if ( i < spParam.length -1 ) sendParamStr += '&';
		}
	}
	//$('#' + pAreaId).attr('src' , baseUrl + '?' + sendParamStr);
	//if(pTargetId == 'dsp0') $('#' + pAreaId).html("<embed id='player' type='text/html' width='498' height='498' src='https://www.youtube.com/embed/"+youtubeId+"' frameborder='0' ></embed>");
	if(pTargetId == 'dsp0') $('#' + pAreaId).html("<iframe  allow='autoplay; encrypted-media' src='https://www.youtube.com/embed/"+youtubeId+"?rel=0&amp;__authenticIframe=true&autoplay=1' frameborder='0' allowfullscreen=''></iframe>");
	else	$('#'+pAreaId).html("<img src='"+baseUrl + "?" + sendParamStr +"' />");
		
	//gfn_bindImgError($('#' + pAreaId));
}

/**
 * 이미지 에러 바인드 
 * @param el
 */
function gfn_bindImgError (_el) {
	_el.each(function(){
		if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
			
			var _thisSrc = $(this).attr('src');
			var _srcIdx = _thisSrc.indexOf('_THUMB');
			var _tmpImg = '/front/images/common/noimg_498.png';
			
			if (_srcIdx != -1) {
				if (_thisSrc.length >= _srcIdx+6) {
					_tmpImg = '/front/images/common/noimg_' + _thisSrc.substring(_srcIdx+6,_thisSrc.length) + '.png';
				}
			}
	    	$(this).attr('src',_tmpImg);
		}
	})	
}


/**
 * 이미지 원본 크기 렌더링
 *
 * @param :  pImageId (이미지 객체 ID)
 */
function gfn_showOriSizeImage (pImageId) {
	if ($('#_imagePopLayer') != undefined) {
		$('#_imagePopLayer').remove();
	}
	$('<div id = "_imagePopLayer" style = "position:absolute;border:2px solid #000;background:#ffffff;cursor:pointer;padding:5px;z-index:9999;" alt="click to close" title="click to close" onClick="$(this).remove();"></div>').appendTo(document.body);
	$('<img src = "'+$('#'+pImageId).attr('src')+'"/>').appendTo($('#_imagePopLayer'));
	$('#_imagePopLayer').css({
        position:'absolute',
        left: ($(window).width() - $('#_imagePopLayer').outerWidth())/2,
        top: ($(window).height() - $('#_imagePopLayer').outerHeight())/2
    });

}


/**
 * ajax escapeXml 처리
 * @param value
 * @param escapeXml
 */
function gfn_escapeXml (value) {
	return lfn_escape(value);
}

/**
 * @param s
 * @returns
 */
function lfn_escape(s) {
	if (isNotEmpty(s)) {
		s = s.replaceAll("&lt;", "<");
		s = s.replaceAll("&gt;", ">");
		s = s.replaceAll("&amp;", "&");
		s = s.replaceAll("&quot;", "\"");
		s = s.replaceAll("&apos;", "'");
	}
	return s;
}

/**
 * 줄바꿈 => <br/>
 * @param str
 * @returns
 */
function gfn_replaceBr (str) {
	if (isNotEmpty(str)) {
		str = str.replaceAll("\r\n", "<br/>");
		str = str.replaceAll("\r", "<br/>");
		str = str.replaceAll("\n", "<br/>");
	}
	return str;
}

/**
 * 좌측 데이터 마스킹
 * @param pData 마스크 대상 데이터
 * @param pMaskLen
 */
function gfn_maskLeftData ( pData , pMaskLen ) {
	if (isNotEmpty(pData)) {
		var retData = '';
		if (pData.length < pMaskLen) 
			pMaskLen = pData.length -1;
		for (var i  = 0 ; i < pMaskLen ; i ++ ) retData += '*';
		retData += pData.substring(pMaskLen , pData.length);
		return retData;
	}
	return '';
}


/**
 * 우픅 데이터 마스킹 
 * @param pData 마스크 대상 데이터
 * @param pMaskLen
 */

function gfn_maskRightData ( pData , pMaskLen ) {
	if (isNotEmpty(pData)) {
		var retData = '';
		if (pData.length < pMaskLen) 
			pMaskLen = pData.length -1;
		retData += pData.substring(0,pData.length - pMaskLen);
		for (var i  = 0 ; i < pMaskLen ; i ++ ) retData += '*';
		return retData;
	}
	return '';
}

/**
 * 특수문자 제거
 * @param val
 * @returns
 */
String.prototype.getFilterValue = function (s) {
	if (isNotEmpty(this))
    	return this.replace(/[ #\&\+\-%@=\/\\\:;,_'\"\^`~\!\?\*$#<>()\[\]\{\}]/g, "");
    return this;
}

/**
 * replaceAll with split & join
 * @param searchStr
 * @param replaceStr
 * @returns
 */
String.prototype.replaceAll = function (searchStr, replaceStr) {
	return this.split(searchStr).join(replaceStr);
}

// proto type trim
String.prototype.trim = function() {
 return this.replace(/(^\s*)|(\s*$)/gi, "");
}

/*******************************************************************************
 * 값 검증 지원 함수
 ******************************************************************************/

/**
 * 필수값 조건 체크. 대상은 폼 기준 name 속성명으로 쉼표 (,)로 구분하여 나열한다. <br />
 * 예 : code,codeNm
 *
 * @param names
 * @returns
 */
function valiteRequired(formNm, names) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_required(elemObj)) {
            elemObj.focus();
            alert($("label[for='"+nameArr[i]+"']").text() + " field is required.");
            return false;
        }
    }
    return true;
}

/**
 * minNum 이상 maxNum 이하이면 참.
 *
 * @param formNm
 * @param names
 * @param minNum
 * @param maxNum
 * @returns
 */
function validateRangeNum(formNm, names, minNum, maxNum) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_rangeNum(elemObj, minNum, maxNum)) {
            elemObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * maxNum 이하이면 참.
 *
 * @param formNm
 * @param names
 * @param maxNum
 * @returns
 */
function validateMaxNum(formNm, names, maxNum) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_maxNum(elemObj, maxNum)) {
            elemObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * minNum 이상이면 참.
 *
 * @param formNm
 * @param names
 * @param minNum
 * @returns
 */
function validateMinNum(formNm, names, minNum) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_minNum(elemObj, minNum)) {
            elemObj.focus();
            return false;
        }
    }
    return true;
}


/**
 * maxLength 이하의 길이면 참
 *
 * @param formNm
 * @param names
 * @param maxLength
 * @returns
 */
function validateMaxLength(formNm, names, maxLength) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_maxLength(elemObj, maxLength)) {
            elemObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * minLength 이상의 길이면 참
 *
 * @param formNm
 * @param names
 * @param minLength
 * @returns
 */
function validateMinLength(formNm, names, minLength) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_minLength(elemObj, minLength)) {
            elemObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * minLength 이상 maxLength 이하의 길이면 참
 *
 * @param formNm
 * @param names
 * @param minLength
 * @param maxLength
 * @returns
 */
function validateRangeLength(formNm, names, minLength, maxLength) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_rangeLength(elemObj, minLength, maxLength)) {
            elemObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * 0~9로만 구성된 문자열이면 참(정수 확인용도)
 *
 * @param formNm
 * @param names
 * @returns
 */
function validateIsDigit(formNm, names) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_isDigit(elemObj)) {
            elemObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * 숫자(소숫점이 있는 실수 포함)면 참
 *
 * @param formNm
 * @param names
 * @returns
 */
function validateIsNumber(formNm, names) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_isNumber(elemObj)) {
            elemObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * 영문(대소문자 구분 없음)이면 참
 *
 * @param formNm
 * @param names
 * @returns
 */
function validateIsAlpha(formNm, names) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_isAlpha(elemObj)) {
            elemObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * Date 형식이면 참.
 *
 * @param formNm
 * @param names
 * @returns
 */
function validateIsDate(formNm, names) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_isDate(elemObj)) {
            elemObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * EMIL 형식이면 참
 *
 * @param formNm
 * @param names
 * @returns
 */
function validateIsEmail(formNm, names) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_isEmail(elemObj)) {
            elemObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * URL 형식이면 참
 *
 * @param formNm
 * @param names
 * @returns
 */
function validateIsUrl(formNm, names) {
    if(!names) {
        alert("검증대상이 설정되지 않았습니다.");
        return false;
    }
    var nameArr = names.split(",");
    for(var i=0 ; i < nameArr.length ; i++) {
        var elemObj = vfn_elemObj(formNm, nameArr[i]);
        if(!vfn_isUrl(elemObj)) {
            elemObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * 대상 항목의 타입에 따라서 길이를 구한다. <br />
 * 선택값이 있거나, 문자열길이
 *
 * @param elem
 * @returns
 */
function gfn_length(elem) {
    var valueSize = 0;
    if(elem.is("input") && (elem.attr("type") == "checkbox" || elem.attr("type") == "radio")) {
        valueSize = elem.filter(":checked").length;
    } else if(elem.is("select")) {
        valueSize = $("option:selected", elem).length;
        if(valueSize == 1 && elem.val() == "") {
            valueSize = valueSize - 1;
        }
    } else {
        var value = elem.val();
        if(!value || value == "") {
            return valueSize;
        } else {
            value = $.trim(value);
            valueSize = gfn_dbLength(value);
        }
    }
    return valueSize;
};

/**
 * DataBase 기준(byte)으로 계산하며, 한글과 도형문자 등은 UTF-8 기준 한자당 3의 길이로 계산한다.
 *
 * @param str
 * @returns
 */
function gfn_dbLength(str) {
    var length = 0;
    for(var i = 0 ; i < str.length ; i++) {
        var char = str.charAt(i).toUpperCase();
        var code = str.charCodeAt(i);
        var number = parseInt(code);
        if((char < "0" || char > "9") && (char < "A" || char > "Z") && ((number > 255) || (number < 0))) {
            length += 3;
        } else {
            length += 1;
        }
    }
    return length;
};

/**
 * 메시지 포멧터. java와 같은 방식으로 {0} {1} 등의 포멧팅을 지원한다. <br />
 * 예 : source = {0}은 {1}과 같아야 합니다. , params = [ "키", "값"] 와 같이 배열<br />
 * 사용예 : gfn_msgFormat("영구는 바보이다"); 또는 gfn_msgFormat("{0}는 {1}이다", ["영구",
 * "바보"]);
 *
 * @param source
 * @param params
 * @returns
 */
function gfn_msgFormat(source, params) {
    if(arguments.length === 1) {
        return function() {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.fn.opformat.apply(this, args);
        };
    }
    if(arguments.length > 2 && params.constructor !== Array) {
        params = $.makeArray(arguments).slice(1);
    }
    if(params.constructor !== Array) {
        params = [ params ];
    }
    $.each(params, function(i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
            return n;
        });
    });
    return source;
}

/**
 * Jquery Object 로 변환 후 반환
 *
 * @param formNm
 * @param elemNm
 * @returns
 */
function vfn_elemObj(formNm, elemNm) {
    return $("form[name='" + formNm + "'] [name='"+elemNm+"']");
}

/*******************************************************************************
 * 개별 값 검증 함수
 ******************************************************************************/

/**
 * 대상이 존재하고 대상의 값이 있으면 true
 *
 * @param elemObj
 * @returns
 */
function vfn_required(elemObj) {
    var value =  elemObj.val();
    if(!value) {
        return false;
    }
    var valueSize = gfn_length(elemObj);
    if(valueSize > 0) {
        return true;
    }
    elemObj.focus();
    return false;
}

/**
 * 대상의 값이 min~max 이상~이하 인 경우 참
 *
 * @param elemObj
 * @param minNum
 * @param maxNum
 * @returns
 */
function vfn_rangeNum(elemObj, minNum, maxNum) {
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    var intValue;
    try {
        intValue = new Number(value);
    } catch(e) {
        return false;
    }
    if(minNum && intValue < minNum) {
        return false;
    }
    if(maxNum > 0 && intValue > maxNum) {
        return false;
    }
    return true;
}

/**
 * maxNum과 같거나 작으면 참
 *
 * @param elemObj
 * @param maxNum
 * @returns
 */
function vfn_maxNum(elemObj, maxNum) {
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    var intValue;
    try {
        intValue = new Number(value);
    } catch(e) {
        return false;
    }
    if(maxNum && intValue > maxNum) {
        return false;
    }
    return true;
}

/**
 * minNum과 같거나 크면 참
 *
 * @param elemObj
 * @param minNum
 * @returns
 */
function vfn_minNum(elemObj, minNum) {
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    var intValue;
    try {
        intValue = new Number(value);
    } catch(e) {
        return false;
    }
    if(minNum && intValue < minNum) {
        return false;
    }
    return true;
}

/**
 * 대상의 문자열길이가 maxLength 이하이면 참. UTF-8 기준으로 한글은 1자당 3의 길이를 가진다.(DB 컬럼크기와 동일)
 *
 * @param elemObj
 * @param maxLength
 * @returns
 */
function vfn_maxLength(elemObj, maxLength) {
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    var valueSize = gfn_length(elemObj);
    if(valueSize > maxLength) {
        return false;
    }
    return true;
}

/**
 * 대상의 문자열길이가 minLength 이상이면 참. UTF-8 기준으로 한글은 1자당 3의 길이를 가진다.(DB 컬럼크기와 동일)
 *
 * @param elemObj
 * @param minLength
 * @returns
 */
function vfn_minLength(elemObj, minLength) {
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    var valueSize = gfn_length(elemObj);
    if(valueSize < minLength) {
        return false;
    }
    return true;
}

/**
 * 대상의 문자열길이가 minLength 이상, maxLength 이하이면 참. UTF-8 기준으로 한글은 1자당 3의 길이를 가진다.(DB
 * 컬럼크기와 동일)
 *
 * @param elemObj
 * @param minLength
 * @param maxLength
 * @returns
 */
function vfn_rangeLength(elemObj, minLength, maxLength) {
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    var valueSize = gfn_length(elemObj);
    if(minLength && valueSize < minLength) {
        return false;
    }
    if(maxLength > 0 && valueSize > maxLength) {
        return false;
    }
    return true;
}

function vfn_rangeSize(elemObj, minSize, maxSize) {
    // null 인경우 참을 반환
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    var valueSize = gfn_length(elemObj);
    if(valueSize > 0) {
        if(minSize && valueSize < minSize) {
            return false;
        }
        if(maxSize > 0 && valueSize > maxSize) {
            return false;
        }
    }
    return true;
}

/**
 * 문자열이 소숫점이 없는 정수이면 참
 *
 * @param elemObj
 * @returns
 */
function vfn_isDigit(elemObj) {
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    return /^\d+$/.test(value);
}

/**
 * 문자열이 정수 또는 소숫점을 포함한 실수이면 참.
 *
 * @param elemObj
 * @returns
 */
function vfn_isNumber(elemObj) {
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
}

/**
 * 문자열이 영문 대소문자이면 참. 대문자만 또는 소문자만 필요한 경우 아래 정규 표현식에서 대소문자 범위만 삭제하여 추가하면 됨.
 *
 * @param elemObj
 * @returns
 */
function vfn_isAlpha(elemObj) {
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    return /^[a-zA-Z]+$/i.test(value);
}

/**
 * 문자열이 Date 변환 가능하면 참. new Date() 함수 사용시.
 *
 * @param elemObj
 * @returns
 */
function vfn_isDate(elemObj) {
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    var date = value;
    if(date.length == 8) {
        var year = value.substring(0, 4);
        var month = value.substring(4, 6);
        var day = value.substring(6, 8);
        date = year + "-" + month + "-" + day;
    }
    return !/Invalid|NaN/.test(new Date(date));
}

/**
 * 문자열이 Email 형식에 맞으면 참
 *
 * @param elemObj
 * @returns
 */
function vfn_isEmail(elemObj) {
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,10}$/i.test(value);
}

/**
 * 문자열이 URL 형식이면 참. http:// 또는 https:// 포함
 *
 * @param elemObj
 * @returns
 */
function vfn_isUrl(elemObj) {
    var value = elemObj.val();
    if(!value) {
        return false;
    }
    return /(http|https):\/\/[^\s^\.]+(\.[^\s^\.]+)*/.test(value);
}

/**
 * 메시지 알림 기능의 변경을 고려한 위한 API (Plugin 적용시 등)
 *
 * @param message 내용
 * @param result 정상 : success, 경고 : wri오류등의 경우 false;
 * @returns
 */
function gfn_msg(message, option) {
    if(!option) {
        option = {};
        option["type"] = "info";
    }

    message = message + "";

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "escapeHtml" : true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    /*
     *  설정 확장용. option 파라미터에 toastr.options 의 속성을 추가하면 아래에서 해당 속성을 덮어 씀
     *  예 option 이 아래와 같이 정의되었다면..
     *  option = {"positionClass" : "toast-top-left"} -> toastr.options.positionClass = "toast-top-left" 로 변경됨
     */

    $.extend(true, toastr.options, option);

    var type = option.type;
    if(type == "success") {
        toastr.success(message);
    } else if(type == "info") {
        toastr.info(message);
    } else if(type == "warning") {
        toastr.warning(message);
    } else if(type == "error") {
        toastr.error(message);
    }
}

/**
 * confirm 기능의 변경을 고려한 위한 API (Plugin 적용시 등)
 */
function gfn_confirm(message, type) {
    var result = true;

    // Plugin 연결 부 alert를 plugin으로 변경 적용
    result = confirm(message);

    return result;
};

/**
 * 메시지 포멧터. java와 같은 방식으로 {0} {1} 등의 포멧팅을 지원한다. <br />
 * 예 : source = {0}은 {1}과 같아야 합니다. , params = [ "키", "값"] 와 같이 배열<br />
 * 사용예 : gfn_msgFormat("영구는 바보이다"); 또는 gfn_msgFormat("{0}는 {1}이다", ["영구",
 * "바보"]);
 *
 * @param source
 * @param params
 * @returns
 */
function gfn_msgFormat(source, params) {
    if(arguments.length === 1) {
        return function() {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.fn.opformat.apply(this, args);
        };
    }
    if(arguments.length > 2 && params.constructor !== Array) {
        params = $.makeArray(arguments).slice(1);
    }
    if(params.constructor !== Array) {
        params = [ params ];
    }
    $.each(params, function(i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
            return n;
        });
    });
    return source;
}

/*******************************************************************************
 * 화면단 메시지 처리 함수
 ******************************************************************************/
/**
 * 메시지 알림 기능 변경을 고려한 위한 API (Plugin 적용시 등)<br />
 * JsonVO를 통한 Ajax 요청 반환에 해당하는 alert API
 *
 * @param response json type이면서 구조가 JsonVO 인 Response 객체
 * @returns
 */
function gfn_jsonMsg(response) {
    var option = {};
        var message = response.message;
    var result = response.result
    if(result) {
        option["type"] = "success";
    } else {
        option["type"] = "error";
    }
    gfn_msg(message, option);
}

/**
 * 기본 알림 메시지
 *
 * @param message
 * @returns
 */
function gfn_infoMsg(message) {
    var option = {
        "type" : "info"
    };
    gfn_msg(message, option);
}

/**
 * 성공 메시지
 *
 * @param message
 * @returns
 */
function gfn_successMsg(message) {
    var option = {
        "type" : "success"
    };
    gfn_msg(message, option);
}

/**
 * 경고 메시지
 *
 * @param message
 * @returns
 */
function gfn_warningMsg(message) {
    var option = {
        "type" : "warning"
    };
    gfn_msg(message, option);
}

/**
 * 오류 메시지.
 *
 * @param message
 * @returns
 */
function gfn_errorMsg(message) {
    var option = {
        "closeButton" : true,
        "type" : "error"
    };
    gfn_msg(message, option);
}

/**
 * ajax 사용시 시스템 오류 메시지. 개발시에는 표시를 해도 운영시에는 대체 메시지로 처리.
 *
 * @param message
 * @returns
 */
function gfn_sysErrorMsg(message) {
    var option = {
        "closeButton" : true,
        "escapeHtml" : false,
        "type" : "error"
    };
    gfn_msg(message, option);
}

/**
 * textarea 제한 사이즈 초과시 제한까지만 남긴 데이터 리턴.
 * @param str
 * @param maxSize
 * @returns {String}
 */
function gfn_substr(str, maxSize){
	var reStr = "";
	var length = 0;
	var strLength = gfn_dbLength(str);
	if(maxSize < strLength){
		for(var i = 0 ; i < str.length ; i++) {
	        var char = str.charAt(i).toUpperCase();
	        var code = str.charCodeAt(i);
	        var number = parseInt(code);
	        if((char < "0" || char > "9") && (char < "A" || char > "Z") && ((number > 255) || (number < 0))) {
	            length += 3;
	        } else {
	            length += 1;
	        }
	        if(maxSize >= length){
	        	reStr += str.charAt(i);
	        }
	    }
	}else{
		reStr = str;
	}
    return reStr;
}

function isEmpty(strF){

	var blankLength = 0;
	var str = "";

	if(strF != null){
		for(var i = 0; i < strF.length; i++)
		{
			if(strF.charAt(i) == " ") {
				blankLength ++;
			} else {
				str += strF.charAt(i);
			}
		}
	}

	if(strF == null || strF == "" || (strF.length - blankLength) == 0) {
		return true;
	} else {
		return false;
	}
}
