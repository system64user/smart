/**
 * 함수명 충돌 방지를 위해 afn_ 문자열 prefix를 사용해서 함수를 작성. 되도록 사용자가 개별 문의가 없도록 아래 설명을 주석으로
 * 추가합니다. - 파라미터 유형 및 설명 - callback 함수가 있는 경우 설명을 추가.
 */

/*
 * 문자열 시작에 쉼표가 있음에 주의
 */
var popupOption = ",resizable=yes, scrollbars=yes, status=no, location=no, menubar=no,";

/*
 * Ajax 간소화
 */
var fn_simpleAjax = function(ajaxUrl, ajaxData, ajaxCallback) {
    $.ajaxSettings.traditional = true;
    ajaxData["ajaxDate"] = new Date().toString();
    $.ajax({
        url : ajaxUrl,
        type : "post",
        data : ajaxData,
        dataType : "json",
        async: false,
        success : function(response) {
            if(ajaxCallback) {
                ajaxCallback(response);
            }
        },
        error : function(request, status, error) {
            alert(request.responseText);
            return;
        }
    });
};

/**
 * Cart 상품 등록. 성공시 confirm 창을 통하여 Cart 목록화면 이동 및 현재유지 옵션으로 처리 파라미터 : goodsNos :
 * 상품번호(단품번호문자열 또는 복수상품번호배열) callback : 자체 종결.
 *
 * @param goodsNos
 * @returns
 */
var afn_addCart = function(goodsNos) {
    var isArray = $.isArray(goodsNos);
    if(!goodsNos || (isArray && goodsNos.length < 1)) {
        alert("Please select Items");
    } else {
        var goodsNoList = new Array();
        if(isArray) {
            goodsNoList = goodsNos;
        } else {
            goodsNoList[0] = goodsNos;
        }
        var params = "";
        if(isArray) {
            for(var i = 0; i < goodsNos.length; i++) {
                params += "goodsNoList=" + goodsNos[i] + "&";
            }
        } else {
            params += "goodsNoList=" + goodsNos
        }
        fn_simpleAjax("/user/mypage/cart/insCart.do", params, function afn_addCartCallback(response) {
            if(response.result) {
                var is = confirm(response.message + "\nGo to Inquiry Cart?");
                if(is) {
                    location.href = "/user/mypage/cart/selCartList.do";
                }
            }
        });
    }
};

/**
 * Wish 등록 페이지 팝업(카테고리 선택화면). 성공시 confirm 창을 통하여 Wish 목록화면 이동 및 현재유지 옵션으로 처리
 * 파라미터 : goodsNos : 상품번호(단품번호문자열 또는 복수상품번호배열) callback : 자체 종결.
 *
 * @param goodsNos
 * @returns
 */
var afn_addWish = function(goodsNos) {
    var isArray = $.isArray(goodsNos);
    if(!goodsNos || (isArray && goodsNos.length < 1)) {
        alert("Please select Items");
    } else {
        var params = "";
        if(isArray) {
            for(var i = 0; i < goodsNos.length; i++) {
                params += "goodsNoList=" + goodsNos[i] + "&";
            }
        } else {
            params += "goodsNoList=" + goodsNos
        }
        var href = "/user/mypage/wish/selWishCtgryList.do?" + params;
        window.open(href, "afn_addWish", "width=810, height=356" + popupOption);
    }
};

/**
 * Inquiry 등록 페이지 팝업(카테고리 선택화면). 성공시 confirm 창을 통하여 Wish 목록화면 이동 및 현재유지 옵션으로 처리
 * 파라미터 : goodsNos : 상품번호(단품번호문자열 또는 복수상품번호배열) callback : 자체 종결.
 *
 * @param goodsNos
 * @returns
 */
var afn_addInquiry = function(goodsNos) {
    var isArray = $.isArray(goodsNos);
    if(!goodsNos || (isArray && goodsNos.length < 1)) {
        alert("Please select Items");
    } else {
        var params = "";
        if(isArray) {
            for(var i = 0; i < goodsNos.length; i++) {
                params += "goodsNoList=" + goodsNos[i] + "&";
            }
        } else {
            params += "goodsNoList=" + goodsNos
        }
        var href = "/user/mypage/inquiry/trade/selInqryForm.do?" + params;
        window.open(href, "afn_addInquiry", "width=1000, height=1800" + popupOption);
    }
};

var afn_addInquiry = function(goodsNos, sAt) {
    var isArray = $.isArray(goodsNos);
    if(!goodsNos || (isArray && goodsNos.length < 1)) {
        alert("Please select Items");
    } else {
        var params = "";
        if(isArray) {
            for(var i = 0; i < goodsNos.length; i++) {
                params += "goodsNoList=" + goodsNos[i] + "&";
            }
        } else {
            params += "goodsNoList=" + goodsNos
        }
        if(isNotEmpty(sAt)) params += "&sAt="+sAt;
        var href = "/user/mypage/inquiry/trade/selInqryForm.do?" + params;
        window.open(href, "afn_addInquiry", "width=1000, height=1800" + popupOption);
    }
};

/**
 * 주문서 작성 팝업
 *
 * @param orderNo
 * @returns
 */
var afn_orderWritng = function(orderNo , entrpsNo) {
    if(!orderNo) {
        alert("Invalid request.");
    } else {
        var href = "/user/mypage/order/setle/selSetleForm.do?orderNo=" + orderNo;
        if (entrpsNo != null && entrpsNo != undefined) href += '&sEntrpsNo='+entrpsNo;
        window.open(href, "afn_orderWritng" + orderNo, "width=1000, height=1800" + popupOption);
    }
};

/**
 * 결제처리 팝업
 *
 * @param orderNo
 * @returns
 */
var afn_setlePayment = function(orderNo) {
    if(!orderNo) {
        alert("Invalid request.");
    } else {
        var href = "/user/mypage/order/setle/selSetlePayment.do?orderNo=" + orderNo;
        window.open(href, "afn_orderWritng" + orderNo, "width=1000, height=1800" + popupOption);
    }
};

/**
 * 주문서 상세
 *
 * @param orderNo
 * @returns
 */
var afn_orderDetail = function(orderNo) {
    if(!orderNo) {
        alert("Invalid request.");
    } else {
        var href = "/user/mypage/order/setle/selSetleDetail.do?orderNo=" + orderNo;
        window.open(href, "afn_orderDetail" + orderNo, "width=1000, height=1800" + popupOption);
    }
};

/**
 * 보증서 확인 팝업
 *
 * @param orderNo
 * @returns
 */
var afn_warrantyConfirmation = function(orderNo) {
    if(!orderNo) {
        alert("Invalid request.");
    } else {
        var href = "/user/mypage/order/setle/warrantyConfirmation.do?orderNo=" + orderNo;
        window.open(href, "warrantyConfirmation" + orderNo, "width=1000, height=1800" + popupOption);
    }
};

var afn_orderCjDetail = function(orderNo) {
    if(!orderNo) {
        alert("Invalid request.");
    } else {
        var href = "/user/mypage/order/setle/selSetleCjDetail.do?orderNo=" + orderNo;
        window.open(href, "afn_orderDetail" + orderNo, "width=1000, height=1800" + popupOption);
    }
};

var afn_orderPantosDetail = function(orderNo) {
    if(!orderNo) {
        alert("Invalid request.");
    } else {
        var href = "/user/mypage/order/setle/selSetlePantosDetail.do?orderNo=" + orderNo;
        window.open(href, "afn_orderDetail" + orderNo, "width=1000, height=800" + popupOption);
    }
};

/**
 * 결제취소 팝업
 *
 * @param orderNo
 * @returns
 */
var afn_setleCancel = function(orderNo) {
    if(!orderNo) {
        alert("Invalid request.");
    } else {
        var href = "/user/mypage/order/setle/selSetleCancel.do?orderNo=" + orderNo;
        window.open(href, "afn_setleCancel" + orderNo, "width=1000, height=1800" + popupOption);
    }
};

/**
 * 주소록팝업
 *
 * @param orderNo
 * @returns
 */
var afn_adbkPopup = function() {
    var href = "/user/mypage/account/dlvy/userMypageDlvyAddPopup.do";
    window.open(href, "afn_adbkPopup", "width=1000, height=600" + popupOption);
};

/**
 * 주소정보 조회 설정 기본주소여부와 일련번호를 동시에 사용할 수 없음. 우선권은 기본배송지
 *
 * @param bassAdresAt 기본주소여부 Y / N
 * @param adbkSn 배송주소록 일련번호
 * @param callBackFunc 리턴받을 함수명
 * @returns
 */
var afn_adbSync = function(bassAdresAt, adbkSn, callBackFunc) {
    var params = {
        bass_adres_at : bassAdresAt,
        dlvy_no : adbkSn
    };
    $.ajax({
        url : "/user/mypage/account/dlvy/userMypageDlvyAddViewProc.do",
        type : "post",
        data : params,
        success : function(data) {
            callBackFunc(data);
        }
    });
};

/**
 * payGos 결제화면
 *
 * @param orderNo
 * @returns
 */
var afn_setlePayemntPayGos = function(url) {
    if(url) {
        var href = url;
        window.open(href, 'afn_setlePayemntPayGos' , "width=1000, height=880" + popupOption);
    }
};
