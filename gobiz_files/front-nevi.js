/***********************************************************************************
 * Front Nevigator Url Check JS
 * 2017.09.06
 * @ Cracky
 ***********************************************************************************/

/* nevi check url */
var _frontTargetUrl = {
		'/user/goods/frontGoodsList.do'  : 'nevigator' ,
		'/user/goods/frontGoodsDetail.do': 'nevigator' ,
		'/user/goods/frontGoodsGNBMenuList.do': 'nevigator'
}

var _frontFixNeviUrl = '/user/goods/frontGoodsList.do';

/**
 * 상품 카테고리 페이지 네비 처리 (사용자)
 */
var fronNeviUrl = {
				
		nevigator : function (obj) {
			
			$('#pageNevi').html('');
			
			fronNeviUrl.addNevi({
				url  : '/',
				text : 'Home'
			});
			/* 상품 카테고리 메뉴 네이게이터 처리 */
			$.ajax({
				url : '/user/common/ctgryCodeDetailAjax.do',
				data : {ctgry_code : obj.param.ctgryCode},
				success : function (data) {
					if (data != undefined && data != null) {
						var code_nm = obj.lang == 'en' ? data.ctgry_nm_eng_1.split('>') : data.ctgry_nm_1.split('>');
						var c_code  = data.ctgry_code_1.split('>');
						for (var i in c_code) {
							
							var mn = code_nm[i].trim();
							//mn = mn.replaceAll('&amp;','-').replaceAll('&','-').replaceAll(' ','-').replaceAll('/','-').replaceAll('=','-').replaceAll('--','-');
							//mn = mn.replaceAll('--','-');

							mn = mn.replaceAll('&amp;','-').replaceAll('&','-').replaceAll(' ','-').replaceAll('---','-').replaceAll('--','-');
							
							var eler = {
								text : code_nm[i],
								url  : obj.turl + '?ctgryCode='+$.trim(c_code[i]) + '&upperCode=' + $.trim(obj.param.upperCode) + '&menuName='+mn
							};
							fronNeviUrl.addNevi(eler);
							$('#ctgryDepthName').html(eler.text);	/*마지막 카테고리명*/
						}
					}
				}
			}); 
		} ,
		
		makeParam : function (s) {
			var data = {};
			if (isNotEmpty(s)) {
				var _en = s.split('&');
				for ( var i in _en )
					data [_en[i].split('=')[0]] = _en[i].split('=')[1];
			}
			return data;
		} ,
		
		getCurrentUrl : function () {
			var cUrl = ((location.href).split('//')[1]).split('/');
    		var _url = '';
    		for (var i in cUrl) 
    			if (i > 0) _url += '/' + cUrl[i] ;
    		return _url;
		} ,
		
		addNevi : function (o) {
			var _targetUrl = !isNotEmpty(o.url) ? '#expn' : o.url ;
			$('#pageNevi').append('<li><a href="'+_targetUrl+'">'+o.text+'</a></li>');
		}
};