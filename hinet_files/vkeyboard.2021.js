/****************************************************************
 (C) 2008 Kishore Nallan for DesignShack
 http://www.kishorelive.com
 kishore.nc@gmail.com
 *****************************************************************/
function shuffleRow(objName, className){
    count = $(objName + className).length;
    for (var i = 0; i < count; i++) {
        var index = Math.floor(Math.random() * count);
        
        if (i != index) {
        
            var tmpI = $(objName + className + ":nth(" + i + ")").clone();
            var tmpX = $(objName + className + ":nth(" + index + ")").clone();
            $(objName + className + ":nth(" + i + ")").replaceWith(tmpX);
            $(objName + className + ":nth(" + index + ")").replaceWith(tmpI);
            
            // process associative shift button
            shift_objName = objName.replace(">input", "_shift>input");
            
            var tmpI = $(shift_objName + className + ":nth(" + i + ")").clone();
            var tmpX = $(shift_objName + className + ":nth(" + index + ")").clone();
            $(shift_objName + className + ":nth(" + i + ")").replaceWith(tmpX);
            $(shift_objName + className + ":nth(" + index + ")").replaceWith(tmpI);
        }
    }
}

function shuffleKeyboard(target){
    shuffleRow("div#row0>input", "[class='butI']");
    shuffleRow("div#row1>input", "[class='butW']");
    shuffleRow("div#row2>input", "[class='butW']");
    shuffleRow("div#row3>input", "[class='butW']");
			$("#"+target).focus();
}

// reset keyboard only one row
function resetRow(objName, className, str){
    count = $(objName + className).length;
    
    for (var i = 0; i < count; i++) {
        $(objName + className + ":nth(" + i + ")").val(str.charAt(i));
    }
}

// reset keyboard to normal keyboard
function resetKeyboard(target){
    resetRow("div#row0>input", "[class='butI']", "1234567890");
    resetRow("div#row1>input", "[class='butW']", "qwertyuiop");
    resetRow("div#row2>input", "[class='butW']", "asdfghjkl");
    resetRow("div#row3>input", "[class='butW']", "zxcvbnm");
    resetRow("div#row1_shift>input", "[class='butW']", "QWERTYUIOP");
    resetRow("div#row2_shift>input", "[class='butW']", 'ASDFGHJKL');
    resetRow("div#row3_shift>input", "[class='butW']", "ZXCVBNM");
	$("#"+target).focus();
}

// when user click "shift" key, toggle with normal key and shift value key
function onShift(flag, target){
	    if (flag == true) {
            for (var i = 0; i < 4; i++) {
                $( "#row" + i).hide();
                $( "#row" + i + "_shift").show();
            }
        }
        else {
            for (var i = 0; i < 4; i++) {
                $( "#row" + i).show();
                $( "#row" + i + "_shift").hide();
            }
        }		
		$("#"+target).focus();
}

//
//function adjustStyle(width){
//    width = parseInt(width);
//    if (width < 1024) {
//        $("#size-stylesheet").attr("href", "narrow.css");
//    }
//    else 
//        if ((width >= 1024) && (width < 1280)) {
//            $("#size-stylesheet").attr("href", "medium.css");
//        }
//        else {
//            $("#size-stylesheet").attr("href", "wide.css");
//        }
////		alert($("#size-stylesheet").attr("href"));
//}

function showKeyboard(){
        $('#keyboard').toggle();	
}

$(document).ready(function(){
//    adjustStyle($(document).width());
//    $(window).resize(function(){
//        adjustStyle($(document).width());
//    });
    
    var shifton = false;
    var target;
    
    // toggle to show / hide virtual keyboard
    $(document).on('click', '#showkeyboard', function(e){
        showKeyboard();
        switch (tabName) {
            case 0:
                target = "passPuser";
                break;
            case 1:
                target = "passBizuser";
                break;
        }
		$("#"+target).focus();
    });
    
    $(document).on('click', '#show_username_keyboard', function(e){
        showKeyboard();
        
        switch (tabName) {
            case 0:
                target = "idPuser";
                break;
            case 1:
                target = "idBizuser";
                break;
				
        }
        $("#"+target).focus();
    });
	
    $("#idPuser").focus(function(e){
        target = "idPuser";
    });
    
    $("#idBizuser").focus(function(e){
        target = "idBizuser";
    });    	
	
	    $("#passPuser").focus(function(e){
        target = "passPuser";
    });
    
    $("#passBizuser").focus(function(e){
        target = "passBizuser";
    });   
    
    $(".butS").hover(function(){
        $(this).toggleClass("butS_hover");
    });
    
    $(".butOK").hover(function(){
        $(this).toggleClass("butOK_hover");
    });
    
    $(function(){
        $("#close-img").mouseover(function(){
        
            $(this).attr("src", "images/close-over.svg");
        }).mouseout(function(){
            $(this).attr("src", "images/close.svg");
        });
    });
	
    $("#keyboard").draggable();    
    
    // process the key user pressed 
    $(document).on('click', '#keyboard input', function(e){
        if ($(this).val() == "←") {			
             $('#' + target).replaceSelection("", true);
        }   else  if ($(this).val() == "Shift") { // toggle shift to show upper / bottom keyboard
             shifton=!shifton;
		 	onShift(shifton, target);
         }   else  if (($(this).val() == "亂數排列") || ( $(this).val() == "Random") || ( $(this).val() == "Shuffle")) {
		 	shuffleKeyboard(target);
         }    else   if ($(this).val() == "一般排列" || $(this).val() == "Normal") {
             resetKeyboard(target);
		} else if ($(this).val() == "Close"){
			 $('#keyboard').toggle();
				
         //}   else if ($(this).attr("type") == "button") { // get the keyboard user typed and insert into target  field            
		 }   else  { // get the keyboard user typed and insert into target  field
             $('#' + target).replaceSelection($(this).val(), true);
         }
    });
    
});
