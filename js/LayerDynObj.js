function LayerDynObj(id, left, top, width, height, visibility, zIndex, clip, bgColor, background, htmlContent) {
	this.id		= id;	
	this.obj	= id.substr(0,id.length-3);
	
	this.zIndex 	= this.initzIndex = (zIndex != null) ? zIndex : 0;		
	this.visible 	= (visibility) ? true : false;
	
	this.x = this.initx = left;
	this.y = this.inity = top;
	
	this.w = this.initW = width;
	this.h = this.initH = height;
	
	this.contentW;
	this.contentH;
	
	this.clipRect 	= new Rect(0, 0, 0, 0);			
	var arrClip = (clip != null) ? clip.match(/\d+/g) : null;		
	this.clipRect.top 		= this.clipRect.initTop		= (arrClip == null) ? 0 : parseInt(arrClip[0]);	
	this.clipRect.right  	= this.clipRect.initRight	= (arrClip == null) ? width : parseInt(arrClip[1]);	
	this.clipRect.bottom 	= this.clipRect.initBottom	= (arrClip == null) ? height : parseInt(arrClip[2]);	
	this.clipRect.left   	= this.clipRect.initLeft	= (arrClip == null) ? 0 : parseInt(arrClip[3]);
	
	this.bgColor = (bgColor != null) ? bgColor : null;
	this.background = (background != null) ? background : null;
   	    
	var str = '' + 
	'<DIV id="' + this.id + '" style="position:absolute; left:' + this.x + '; top:' + this.y +
	'; width:' + this.w + '; height:' + this.h + 
	'; visibility:' + (this.visible == true  ? "visible" : "hidden") + 
	(this.bgColor == null ? "" : ("; background-color:" + this.bgColor )) +
	(this.background == null ? "" : ("; background-image:url('" + this.background + "')")) +
	'; clip:rect('+this.clipRect.top+'px '+this.clipRect.right+'px '+this.clipRect.bottom+'px '+this.clipRect.left+'px);';
	
	str += ' z-index:' + this.zIndex + ';';
	str += ' overflow:hidden;">\n';
	if (htmlContent != null)
		str += htmlContent;
	str += '\n</DIV>\n';
	
	document.body.insertAdjacentHTML("BeforeEnd", str);
			
	this.elm = this.event = document.getElementById(id);
	this.css = this.elm.style;
	this.doc = document;
	
	this.w = this.elm.offsetWidth;
	this.h = this.elm.offsetHeight;

	this.contentW = this.elm.scrollWidth;
	this.contentH = this.elm.scrollHeight;		

	this.elm.parent = this;
}

function LayerDynObj_show() {
	this.css.visibility = "visible";
}

function LayerDynObj_hide() {
	this.css.visibility = "hidden";
}

function LayerDynObj_writeHtml(html) {
	this.innerHtml = html;
	this.event.innerHTML = html;
	this.contentW = this.elm.scrollWidth;
	this.contentH = this.elm.scrollHeight; 
}

function LayerDynObj_deleteObject(){
    this.hide();
	this.writeHtml("");
}

function LayerDynObj_moveTo(x,y,changeInitVals) {	
	if (changeInitVals == null || changeInitVals == true) {
		this.x = this.initx = x;
		this.y = this.inity = y;
	} else {	
		this.x = x;
		this.y = y;
	}
		
	this.css.left = this.x;
	this.css.top = this.y;
}

function LayerDynObj_moveBy(x,y) {	
	this.x += (x == null) ? 0 : x;
	this.y += (y == null) ? 0 : y;
	this.css.left = this.x;
	this.css.top = this.y;
}

function LayerDynObj_changeClip(top, right, bottom, left) {
	this.clipRect.top 	 = parseInt(top);
	this.clipRect.right  = parseInt(right);
	this.clipRect.bottom = parseInt(bottom);
	this.clipRect.left   = parseInt(left);	
	this.css.clip = "rect("+ this.clipRect.top +"px "+ this.clipRect.right +"px "+ this.clipRect.bottom +"px "+ this.clipRect.left +"px)";
}

function LayerDynObj_resizeTo(width, height, saveTmpVals, changeClip) {
	if (saveTmpVals) {
		this.tmpWidth 	= this.w;
		this.tmpHeight	= this.h;
	}
	this.w = width;
	this.h = height;
	this.css.width = width; 
	this.css.height = height;
	if (changeClip != false) this.changeClip(0,width,height,0);
}

function LayerDynObj_resizeBy(dwidth, dheight, saveTmpVals, changeClip) {
    this.resizeTo(this.w + dwidth, this.h + dheight, saveTmpVals, changeClip);
}

function LayerDynObj_changeZIndex(z) {
	this.zIndex = z;
	this.css.zIndex = this.zIndex;
}

function LayerDynObj_setBgColor(color) {	
	this.css.bgcolor = color;
	this.css.backgroundColor = this.css.bgcolor;
}

LayerDynObj.prototype.moveTo 		= LayerDynObj_moveTo;
LayerDynObj.prototype.moveBy 		= LayerDynObj_moveBy;
LayerDynObj.prototype.writeHtml 	= LayerDynObj_writeHtml;
LayerDynObj.prototype.deleteObject 	= LayerDynObj_deleteObject;
LayerDynObj.prototype.show 			= LayerDynObj_show;
LayerDynObj.prototype.hide 			= LayerDynObj_hide;
LayerDynObj.prototype.changeClip 	= LayerDynObj_changeClip;
LayerDynObj.prototype.resizeTo 		= LayerDynObj_resizeTo;
LayerDynObj.prototype.resizeBy 		= LayerDynObj_resizeBy;
LayerDynObj.prototype.changeZIndex 	= LayerDynObj_changeZIndex;
LayerDynObj.prototype.setBgColor 	= LayerDynObj_setBgColor;
