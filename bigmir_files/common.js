/**
	This file is for common js functions
*/


/**
	Show or Hide flash elements on page
	Flash Element should contain class hideFlash
*/

function ChangeLayerVisibility(id, forceOpen, forceClose) {
	var layer = $(id); if (!layer) return false;

	if ((CheckLayerVisibility(layer) === 'hidden' && !forceClose) || forceOpen) {
		layer.setStyle('display', 'block');
	}
	else if ((CheckLayerVisibility(layer) === 'visible' && !forceOpen) || forceClose) {
		layer.setStyle('display', 'none');
	}

	return false;
}

function CheckLayerVisibility(layer) {

	if (typeof(layer) == 'string') { layer = $(layer); }
	else if(typeof(layer) != 'object') { return 'undef'; }

	if (layer.getStyle('display') == 'none') {
		return 'hidden';
	}
	else if (layer.getStyle('display') == 'block') {
		return 'visible';
	}
	else {
		return 'hidden';
	}
}

/*
*	inSwitch - scrol path (next, prev)
* inNumPageMax - total pages to show
*	inImgPath - image path
*
* confData - asociative array with config data
*	exemple is News of day block on main page of news:
*	var confDataNews = new Array();
*		confDataNews['curPageNumb'] = 'nowDayNews'; // is number of current page to show
*		confDataNews['contBlockName'] = 'dayNewsCont'; //is name of block with content
*		confDataNews['ajaxChBlockName'] ='blockDayNewsAjax'; //name of block needed to change
*		confDataNews['nameOfPost'] ='ajaxDayNews'; // name of post var
*/

function contentScroller(inSwitch, inNumPageMax, inImgPath, confData) {
	
	var vCounter=$(confData['curPageNumb']).innerHTML.toInt();
	var vCont=$(confData['contBlockName']);
	var vContBuffer=vCont.innerHTML;
	var vNumPage=0;
	
	if (inSwitch==='next') {
		if (vCounter===0) {vNumPage = 1;} else if (vCounter===inNumPageMax) {vNumPage = 0;} else {vNumPage = vCounter + 1;}
	} else if (inSwitch==='prev') {
		if (vCounter===0) {vNumPage = inNumPageMax;} else if (vCounter===inNumPageMax) {vNumPage = inNumPageMax - 1;} else {vNumPage = vCounter - 1;}
	}
	
	vCont.innerHTML='<img src="' + inImgPath + 'a/common/img/ic_right_gry.gif" width="15" height="15" alt="" title="" class="vmid fr mrm5" /><img src="' + inImgPath + 'a/common/img/ic_left_gry.gif" width="15" height="15" alt="" title="" class="vmid fr mrm5" />';
	
	new Requester('/',
			{method    : 'post',
		update    : confData['ajaxChBlockName'],
		data      : confData['nameOfPost']+'=1&numPage='+vNumPage,
		onComplete: function() { vCont.innerHTML=vContBuffer; if(confDataNews['format']=='true')FormatNewsDay();}})
	
	
}
//the same as above but with sportsection
function contentScroller2(inSwitch, inNumPageMax, inImgPath, confData, sportSection) {

	var vCounter=$(confData['curPageNumb']).innerHTML.toInt();
	var vCont=$(confData['contBlockName']);
	var vContBuffer=vCont.innerHTML;
	var vNumPage=0;

	if (inSwitch==='next') {
		if (vCounter===0) {vNumPage = 1;} else if (vCounter===inNumPageMax) {vNumPage = 0;} else {vNumPage = vCounter + 1;}
	} else if (inSwitch==='prev') {
		if (vCounter===0) {vNumPage = inNumPageMax;} else if (vCounter===inNumPageMax) {vNumPage = inNumPageMax - 1;} else {vNumPage = vCounter - 1;}
	}

	vCont.innerHTML='<img src="' + inImgPath + 'a/sport/img/ic_inactive.gif" width="31" height="17" alt="" title="" />';

	new Requester('/',
					   {method    : 'post',
							update    : confData['ajaxChBlockName'],
							data      : confData['nameOfPost']+'=1&numPage='+vNumPage+'&section='+sportSection,
							onComplete: function() { vCont.innerHTML=vContBuffer; if(confDataNews['format']=='true')FormatNewsDay();}})


}


/**
*
*
*/
function npUpdateRate_2(obj, id, bm_domain){

	if(id && obj!=null && obj.href) {

		var vars = ['netPreviewClickStat=1', ('ID='+id)];
		obj.href = 'http://main'+ bm_domain +'/include/http_loader.php?' + vars.join('&');
	}

	return true;
}

function showHideFlash(boolShow) {

	var intDelay = boolShow ? 400 : 0;
    if(boolShow) {
            wdo = "visible";
        }
        else {
            wdo = "hidden";
        }
	(function(){ $$('.hideFlash').each(function(item) {
        item.setStyles( { visibility: wdo} );
        /*
		if(boolShow) {
			item.setStyles( { visibility: "visible"} );
		}
		else {
			item.setStyles( { visibility: "hidden"} );
		}*/
	}
	)}).delay(intDelay);

    //hide flash graphics
	var swf_el = document.getElementsByTagName('object');
    //alert(swf_el.length)
    var regularExp = new RegExp("^swf_graph_");
    for(var i = 0; i<swf_el.length; i++) {
    //alert(swf_el[i].id);
    if(swf_el[i].id.match(regularExp)){
        swf_el[i].style.visibility = wdo;
        }
    }

}

/**
* All the inputs[type="text"] will have been added the class "bmfocus"
* It is an imitation of pseudo-class "focus" for IE
*/
inputFocus = function() {
	var inps = document.getElementsByTagName("INPUT");
	for (var i=0; i<inps.length; i++) if (inps[i].type=="text") {
		inps[i].attachEvent("onfocus", function() {
			var obj=event.srcElement;
			if (obj.style.color) obj.oldcolor = obj.style.color;
			obj.style.color = "#333333";
		});
		inps[i].attachEvent("onblur", function() { 
			var obj=event.srcElement;
			if (obj.oldcolor) obj.style.color = obj.oldcolor;
			else obj.style.color = "";
		});
	}
}
//if (window.attachEvent) {window.attachEvent("onload", inputFocus);}



// Google Analitycs tracker
var GATracker = {
	GAccount: 'UA-3119939-34',
	pageTracker: null,
	name_suffix: '',
	track: function(name, named, naming){
		//if(!this.pageTracker)
		//	this.pageTracker=_gat._getTracker(this.GAccount);
		//this.pageTracker._trackEvent(name + this.name_suffix, named, naming);
	}

};