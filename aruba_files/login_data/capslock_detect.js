function capLock(e,name){
	kc = e.keyCode?e.keyCode:e.which;
	skick = e.shiftKey?e.shiftKey:((kc == 16)?true:false);
	if(((kc >= 65 && kc <= 90) && !skick)||((kc >= 97 && kc <= 122) && skick))
		document.getElementById(name).style.visibility = 'visible';
	else
		document.getElementById(name).style.visibility = 'hidden';
}