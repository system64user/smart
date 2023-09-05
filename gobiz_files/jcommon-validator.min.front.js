/**
jquery extends validator
Cracky

class='_requireClass 지정 속성 추가'


메세지 prefix : data-text : 항목 텍스트 (optional)    ,  default : 필수항목

**/

var _requireClass = 'require';

var ctlBox={msgType:function(t){var e=jQuery.checkType(t),r="";return"text"==e||"password"==e||"textarea"==e||"hidden"==e?r="inp":-1!=e.indexOf("select")?r="sel":"radio"!=e&&"checkbox"!=e||(r="chk"),r},switcher:function(t){switch(t){case"inp":dMsg="입력";break;case"sel":dMsg="선택";break;case"chk":dMsg="체크"}return dMsg},typeValue:function(t){var e={result:!0},r=t.msgType;if("inp"==r||"sel"==r)ctlBox.isNotEmpty(t.el.val())||(e.result=!1,e.target=t.el);else{var a=jQuery("input:"+t.el.attr("type")+"[name="+t.el.attr("name")+"]");a.is(":checked")||(e.result=!1,e.target=a.eq(0))}return e},dataText:function(t){return ctlBox.isNotEmpty(t.attr("data-text"))?t.attr("data-text"):t.prop("data-text")},isNotEmpty:function(t){return null!=t&&void 0!=t&&""!=jQuery.trim(t)&&0!=t.length}};jQuery.extend({checkType:function(t){return ctlBox.isNotEmpty(t.attr("type"))?t.attr("type"):t.prop("type")},checkTag:function(t){return t.get(0).tagName.toLowerCase()}}),jQuery.fn.jvalidator=function(){"use strict";var t=jQuery(this),e=null,r="",a=!0;if(jQuery.each(t.find("."+_requireClass),function(){var t={msgType:ctlBox.msgType(jQuery(this)),el:jQuery(this)},c=ctlBox.typeValue(t);if(!c.result)return e=c.target,r=ctlBox.switcher(t.msgType),a=!1,!1}),!a){e.focus();var c=ctlBox.dataText(e);ctlBox.isNotEmpty(c)?alert("please check required item."):alert("please check required item.")}return a};