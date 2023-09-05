/**
jquery extends ajax pager tag
2017.08.31 ver 1.0

option value = {
	page     : '1' ,		:  페이지 번호  
	perPage  : '15',        :  페이지당 게시글 수 
	count    : '0',         :  데이터 카운트  
	limit    : '10',        :  페이지 표시 숫자 갯수 
	callback : 'gfn_pager'  :  페이징 클릭시 콜백 펑션 
}

userage : $('divId').setPageTag(option value);

callback -> pagerFunction.setInnerPager(page,pagerId);

Cracky

**/

function gfn_pager(a,e){pagerFunction.setInnerPager(a,e)}var _inPagerTag={},pagerFunction={totalPage:function(a,e){var r=0;if(0==a)r=1;else{var t=parseInt(a)%parseInt(e),n=parseInt(a)/parseInt(e);r=t>0?parseInt(n)+1:parseInt(n)}return parseInt(r)},startPage:function(a,e){return a=null==a||""==a||"0"==a?1:parseInt(a),parseInt((a-1)/e)*e+1},pageTag:function(a,e,r,t,n,s,p){var g="<div class='paging'>";g+="<a href='Javascript:"+s+'(1,"'+p+"\");' class='ctrl first'><span class='blind'>First</span></a>",parseInt(r)-parseInt(n)>=0&&(g+="<a href='Javascript:"+s+"("+(parseInt(r)-1)+',"'+p+"\");' class='ctrl back'><span class='blind'>back</span></a>");for(var i=parseInt(r);i<parseInt(t);i++)parseInt(a)==i?g+="<a href='Javascript:"+s+"("+i+',"'+p+"\");' class='num active'><span>"+i+"</span></a>":g+="<a href='Javascript:"+s+"("+i+',"'+p+"\");' class='num'><span>"+i+"</span></a>";return parseInt(r)+parseInt(n)<parseInt(e)+1&&(g+="<a href='Javascript:"+s+"("+t+',"'+p+"\");' class='ctrl next'><span class='blind'>Next</span></a>"),g+="<a href='Javascript:"+s+"("+e+',"'+p+"\");' class='ctrl last'><span class='blind'>Last</span></a>",g+="</div>"},getPagerObject:function(a){return _inPagerTag["pager_"+a]},setInnerPager:function(a,e){var r=pagerFunction.getPagerObject(e);r.page=a,$("#"+e).setPageTag(r)}};jQuery.fn.setPageTag=function(a){var e={page:"1",perPage:"15",count:"0",limit:"10",callback:"gfn_pager"};jQuery.extend(e,a);var r=pagerFunction.totalPage(e.count,e.perPage),t=pagerFunction.startPage(e.page,e.limit),n=parseInt(t)+parseInt(e.limit);n>r&&(n=parseInt(r)+1),e.tPage=r,e.sPage=t,e.ePage=n,_inPagerTag["pager_"+jQuery(this).attr("id")]=e;var s=pagerFunction.pageTag(e.page,r,t,n,e.limit,e.callback,jQuery(this).attr("id"));$(this).html(s)};