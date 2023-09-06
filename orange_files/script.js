/**
* Depending on the web browser, we listen to the page to know when it's ready
*/
if ( document.addEventListener ) {
	// Mozilla, Opera, Webkit 
	document.addEventListener( "DOMContentLoaded", function(){
		document.removeEventListener( "DOMContentLoaded", arguments.callee, false);
		domReady();
	}, false );
} else if ( document.attachEvent ) {
	// If IE event model is used
	// ensure firing before onload
	document.attachEvent("onreadystatechange", function(){
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", arguments.callee );
			domReady();
		}
	});
}

/**
* Executes when the page is ready
*/
function domReady () {

	var alerteContainer = document.getElementById("alerteContainer");
	var divMainContent = document.getElementById("mainContent");


	var aboutLink = document.getElementById("popupLink");
	if(aboutLink != null) {
		var aboutPopup = document.getElementById("popupInfo");
		var close = document.getElementById("close");
		aboutLink.onclick = function(e){
			aboutPopup.style.display = "inline-block";
			aboutPopup.style.opacity = "1";

			divMainContent.style.display = "none";
			resize ();
		}

		close.onclick = function(e){
			aboutPopup.style.display = "none";
			aboutPopup.style.opacity = "0";
			divMainContent.style.display = "block";
			resize ();
		}
	}
	
	// Executes on resize
	resize();
	window.onresize = resize;
	loadBackgroundRadomImage();
}

/**
* Checks how big the main content goes and adapts the footer
*/
function resize () {

	var alerteContainer = document.getElementById("alerteContainer");

	var noJSWarn = document.getElementById("noJSWarn");
	if(noJSWarn != null) {
		noJSWarn.style.display = "none";
	}
	
	var footerDiv = document.getElementById("orange-footer");
	footerDiv.style.position = "relative";

	var windowHeight = document.body.clientHeight;
	var windowWidth = document.body.clientWidth;
	var contentDiv = document.getElementById("wrapper");
	var contentDivPosition = contentDiv.offsetTop;
	var contentHeight = contentDiv.offsetHeight;
	var bottomOfContent = contentDivPosition + contentHeight;

	var footerDivPosition = footerDiv.offsetTop;
	var footerHeight = footerDiv.offsetHeight;
	var footerStyle = footerDiv.currentStyle || window.getComputedStyle(footerDiv);
    var footerMarginTop = parseInt(footerStyle.marginTop);

	var bottomOfFooter = bottomOfContent + footerHeight + footerMarginTop;

	if (bottomOfFooter >= windowHeight) {
		// The content goes beyound the window, so the footer needs to stick to the content
		footerDiv.style.position = "relative";
	} else {
		// The window is bigger than the content, we cant stick the footer to the bottom to look better
		footerDiv.style.position = "absolute";
		footerDiv.style.bottom = 0;
	}
	
}



function loadBackgroundRadomImage() {
	var backgroundDiv = document.getElementById("background");
	// Génére un nombre aléatoire, pour donner un numéro d'image.
	var nbimage = 1;
	numimage = Math.round( Math.random() * ( nbimage - 1 ) + 1 );
	// Nom du répertoire de vos images.
	rep = "imgs";

	// Get base URL from the html page
	var homePath = document.getElementById("homePath");
	if(homePath != null) {
		baseUrl = homePath.innerHTML;
	}

	// Assemblage de la chaine pour afficher votre image.
	url = baseUrl + '/' + rep + '/' + numimage + ".jpg";

	// Affiche l'image choisie.
	backgroundDiv.style.background = "url('" + url + "')"; 
    backgroundDiv.style.backgroundSize = "cover";
	backgroundDiv.style.backgroundRepeat = "no-repeat";
	backgroundDiv.style.backgroundPosition = "center center";
}