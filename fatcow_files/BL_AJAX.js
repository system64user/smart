/*

Generic AJAX HTML library. Contains a few generalized functions to get a URL with XMLHTTPRequest and show it in a DIV

See Wiki for more information
*/

/*

OpenDIV( divname )

This function will make a div visible. It is only one way! If you want open and close then see below. Takes the id of a div

*/
function OpenDIV( divname ) {

    if (document.getElementById) { // DOM3 = IE5, NS6
        if (document.getElementById(divname).style.display == "none"){
            document.getElementById(divname).style.display = 'block';
        }
    } else {
        if (document.layers) {
            if (document.divname.display == "none"){
                document.divname.display = 'block';
            }
        } else {
            if (document.all.divname.style.visibility == "none"){
                document.all.divname.style.display = 'block';
            }
        }
    }
}


/*

CloseDIV( divname )

This function will make a div invisible. It is only one way! If you want open and close then see below. Takes the id of a div

*/
function CloseDIV( divname ) {

    if (document.getElementById) { // DOM3 = IE5, NS6
        if (document.getElementById(divname).style.display != "none"){
            document.getElementById(divname).style.display = 'none';
        }
    } else {
        if (document.layers) {
            if (document.divname.display != "none"){
                document.divname.display = 'none';
            }
        } else {
            if (document.all.divname.style.visibility != "none"){
                document.all.divname.style.display = 'none';
            }
        }
    }
}

/* 

OpenCloseDIV( id )

This function takes an id. The function will look for a div named (id)_block and change the visibility of it. In addition to the _block div it will also try to switch images for (id)_img image tag. It will do a plus sign when (id)_block is not visible and minus when it is

*/
function OpenCloseDIV(id,img_path,table,image_open,image_close,custom_path) {
    var divname = id + "_block";
    var imgname = id + "_img";

    var newimg

    // make this useful to tables as well
    var type = 'block';
    if ( table == 1 ) { type = 'table'; }

    if (document.getElementById) { // DOM3 = IE5, NS6
      if ( type == 'block' ){
        if (document.getElementById(divname).style.display == "none"){
            document.getElementById(divname).style.display = "block";
            newimg = 'minus'
        } else {
            document.getElementById(divname).style.display = 'none';
            newimg = 'plus' 
        }
      } else {
        if (document.getElementById(divname).style.display == 'none'){
            document.getElementById(divname).style.display = '';
            newimg = 'minus'
        } else {
            document.getElementById(divname).style.display = 'none';
            newimg = 'plus'
        }

      }
    } else {
        if (document.layers) {
            if (document.divname.display == "none"){
                document.divname.display = "block";
                newimg = 'minus'
            } else {
                document.divname.display = 'none';
                newimg = 'plus' 
            }
        } else {
            if (document.all.divname.style.visibility == "none"){
                document.all.divname.style.display = "block";
                newimg = 'minus'
            } else {
                document.all.divname.style.display = 'none';
                newimg = 'plus' 
            }
        }
    }

    if ( document.images[imgname] ) {
	    var Imgs = new Object;

        if ( img_path ) {
          Imgs.minus = img_path+"arrow_down.gif";
          Imgs.plus = img_path+"arrow_right.gif";
        } 
        else if ( custom_path ) {
          Imgs.minus = custom_path+image_close;
          Imgs.plus  = custom_path+image_open;
        }
        else if ( image_open ) {
          Imgs.minus = "https://secure.bizland.com/images"+image_close;
          Imgs.plus  = "https://secure.bizland.com/images"+image_open;
        }
        else {
      	  Imgs.minus = "https://secure.bizland.com/images/greenarrow.gif";
          Imgs.plus = "https://secure.bizland.com/images/redarrow.gif";
        }

      switchimg(imgname,Imgs[ newimg ]);
    }
    
}

/*

getAJAXHTML( name , url , extras , append , noblink , showprogress , sucfunc , errfunc )

This is the main function for making an AJAX request. It takes several options:

name 		- the name of the div to change with the request

url 		- optional URL of the script to call. This allows you to use a script other than the one the javascript is called from.

extras 		- If you are calling back to the script that has the javascript in it , then you can just pass the parameters for the GET request. The script will prepend http://machine/script? to the extras.

append          - Append to the div instead of overwriting

noblink		- Turns off the 'Getting Data' blinking tag.

showprogress    - If true it will write to the div as it loads ( doesn't work in IE )

sucfunc         - A function to run on success. req object is passed in

errfunc         - A function to run on error. req object is passed in


You need to send a div and you need url or extras

*/
function getAJAXHTML( name , url , extras, append, noblink , showprogress , sucfunc , errfunc ) {
   if ( ! url ) {
	url = window.location + '?' + extras
   }

   if (noblink != 1){
   	changeDiv( name ,'<img src="/images/indicator.gif">') 
   }
   var request = new makeReq( url , name, append , showprogress , sucfunc , errfunc )

   // request.doGet() AJAX GET is a problem in IE
   // because IE thinks it should cache it, so it does
   // not frequently does not load fresh content
   request.doPost();
}

/*

postAJAXHTML( name , url , formid, append , noblink , showprogress , sucfunc , errfunc )

POST version of getAJAXHTML.  Rather than an optional list of 'extra' params to send
in the query string, requires the id of a form on the page to read parameters from.
Sends values of all non-blank inputs from the given form, except for unchecked radios
and checkboxes.

*/
function postAJAXHTML( name, url, form, append, noblink, showprogress, sucfunc, errfunc ) {
	if ( ! url ) {
		url = window.location;
	}

	var eForm = document.getElementById( form );
	var aInputs = eForm.getElementsByTagName( "input" );

	var aParams = new Array();

	// gather list of form params to send with post
	for ( var i = 0; i < aInputs.length; i++ ) {
		var eI = aInputs[i];

		if ((( eI.type == 'checkbox' ) || ( eI.type == 'radio' )) && ( ! eI.checked )) {
			continue;
		}

		if ( eI.value ) {
			aParams.push( eI.name + '=' + eI.value );
		}
	}

	var request = new makeReq( url , name, append , showprogress , sucfunc , errfunc );
	var postBody = aParams.join( '&' );
	request.doPost( aParams.join( '&' ) );

	if ( noblink != 1 ) {
		changeDiv( name, '<img src="/images/indicator.gif">' ) ;
	}
}



/*

changeDiv( divname, contents )

Internal function to change the contents of a div.

*/
function changeDiv(divname,contents, append) {

    var obj;
    if (document.getElementById) { // DOM3 = IE5, NS6
        //document.getElementById(divname).innerHTML = contents;
    	obj = document.getElementById(divname);
    } else if (document.layers) {
        //document.divname.innerHTML = contents;
    	obj = document.divname;
    } else {
        //document.all.divname = contents;
    	obj = document.all.divname;
    }
   
    // need to check if session expired, so it doesn't
    // return the login page in a div...
    if ( contents.match('<title>BizLand Login</title>') ) {
      contents = 'Your session expired. Please log in.';
    } 


    if (append == 1){
    	obj.innerHTML += contents ;
    } else {
	    obj.innerHTML = contents;
    }
}

/*
makeReq( url , name , append , showprogress , sucfunc , errfunc )

Internal function that creates and executes the XMLRequest. Takes a URL and the name of the div to send the contents to. Other options:

append 		- Append to the div instead of overwriting
showprogress	- If true it will write to the div as it loads ( doesn't work in IE )
sucfunc		- A function to run on success. req object is passed in
errfunc		- A function to run on error. req object is passed in

*/
function makeReq( url , name, append , showprogress , sucfunc , errfunc ) {

    var req = init();
    req.onreadystatechange = processRequest;
        
    function init() {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }
    }

    function processRequest () {
      if (req.readyState == 3 && window.XMLHttpRequest && showprogress ) {
        processReqReal( req.responseText , name, append );
      }
      if (req.readyState == 4 ) {
        if (req.status == 200) {
          processReqReal( req.responseText , name, append );
	  if ( sucfunc ) {
            sucfunc(req)
          }
        } else {
	  processReqReal( 'ERROR', name , append );
	  if ( errfunc ) {
	    errfunc(req)
	  }
	}
      }
    }

    this.doGet = function() {
      req.open("GET", url, true);
      req.send(null);
    }
    
    this.doPost = function(body) {
      req.open("POST", url, true);
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      
	if ( body == null ){
		body = '1=1';
	}
      
      req.send(body);
    }

}

/* 

processReqReal( HTML , divname )

Internal function to take HTML from the request and pass it to changeDiv

*/
function processReqReal( HTML , divname, append )
{
	changeDiv(divname,HTML, append)
}

/*
switchimg( image_name , imgsrc )

Internal function to change a specific image src

*/
function switchimg( image_name , imgsrc){
    if (document.images){
        document.images[image_name].src = imgsrc;
    }
}


/* this is an external image switch function

*/
function ImgForceClose( id, img_path ) {

    var divname = id + "_block";
    var imgname = id + "_img";

    if ( document.images[imgname] ) {
      var Imgs = new Object;

        if ( img_path ) {
          Imgs.minus = img_path+"arrow_down.gif";
          Imgs.plus = img_path+"arrow_right.gif";
        }
        else {
          Imgs.minus = "https://secure.bizland.com/images/greenarrow.gif";
          Imgs.plus = "https://secure.bizland.com/images/redarrow.gif";
        }

      switchimg(imgname,Imgs[ 'plus' ]);
    }

}

/* two tab switcher */
function SwitchTabColor ( tab, category, color1, color2 ) {

  if ( document.getElementById ) {

    var clicked_tab = document.getElementById( tab+'_'+category );
    var other_tab;

    /* get clicked tab and the other tab */
    if      ( tab == 'tab_link1' ) { other_tab = document.getElementById( 'tab_link2_'+category ); }
    else if ( tab == 'tab_link2' ) { other_tab = document.getElementById( 'tab_link1_'+category ); }
    else                           {                                                               }

    /* make the clicked tab darker color and the other tab lighter */
    if ( clicked_tab.style.backgroundColor == color1 ) {
      if ( clicked_tab ) {
        clicked_tab.style.backgroundColor = color2;
      }
      if ( other_tab ) {
        other_tab.style.backgroundColor = color2;
      }
    }
    else if ( clicked_tab.style.backgroundColor == color2 ) {
      if ( clicked_tab ) {
        clicked_tab.style.backgroundColor = color1;
      }
      if ( other_tab ) {
        other_tab.style.backgroundColor = color2;
      }
    }
    else {}

  }

}

function getAJAXObj( url ) {
	var xhttp;

        if ( window.XMLHttpRequest ) {
	        xhttp = new XMLHttpRequest();
	} else if ( window.ActiveXObject ) {
                xhttp = new ActiveXObject( 'Microsoft.XMLHTTP' );
        } else {
                return;
        }

        xhttp.open( 'GET', url, true );
        xhttp.send( null );

       return xhttp;
}
