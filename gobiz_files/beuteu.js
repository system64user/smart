/***********************************************************************************
 * beuteu 2017년 08 31일 
 ***********************************************************************************/

/*var boardManager = {
	boardList : function (page,callback) {
		alert('eee');
		$.getJSON('/user/board/frontGoodsQnaListAjax.do', callback);
	}	
}*/

var boardManager = function() {
	
	function boardList(page, goods_no, callback) {
		$.getJSON('/user/board/frontGoodsQnaListAjax.do?pageNum='+ page + '&perPage=15&goods_no='+ goods_no , callback);
	}
	
	
	function Register(obj, callback){
		$.ajax({
			url: '/user/board/frontGoodsQnaRegist.do',
			dataType : 'json',
			type:"post",
			data:obj,
			success:callback
		});
		
	}
	
	function Delete(obj, callback){
		$.ajax({
			url: '/user/board/frontGoodsQnaDelete.do',
			type:"get",
			data:obj,
			success:callback
		});
	}
	

	return {
		boardList : boardList,
		Register:Register,
		Delete:Delete
	}

}();