var win = (navigator.appVersion.indexOf("Win") > 0)? true:false
var root = "http://german-2:7501/portals/RazorFish/";

/* resizehandler. fixes resize bug when using layers in ns ************************/
if(document.layers){
 origWidth = innerWidth;
 origHeight = innerHeight;
 window.captureEvents(Event.RESIZE);
 window.onresize = resizeHandler;
}

function resizeHandler() {
 	if (innerWidth != origWidth || innerHeight != origHeight) {
 		origWidth = innerWidth;
  		origHeight = innerHeight;
  		window.location.reload();
 	}
}

/*******************************************************************************/	