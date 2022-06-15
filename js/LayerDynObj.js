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
   	    
	if (nav.ns4) {
		this.css = this.elm = this.event = document.layers[this.id] = new Layer(width);	
		this.doc = this.css.document;
		
		this.css.zIndex 	= this.zIndex;
		this.css.visibility = (this.visible) ? "show" : "hide";
		
		this.css.left 	= this.x;
		this.css.top 	= this.y;
		
		if (this.bgColor != null) this.css.bgColor = this.bgColor;
		if (this.background != null) this.css.background.src = this.background;
        
		this.css.clip.top 		= this.clipRect.top;
		this.css.clip.right 	= this.clipRect.right;
		this.css.clip.bottom 	= this.clipRect.bottom;	
		this.css.clip.left 		= this.clipRect.left;
		
		this.innerHtml = "";
		if (htmlContent != null){
			this.css.document.open();
			this.css.document.write(htmlContent);
			this.css.document.close();
			this.innerHtml = htmlContent;
		}
		
		this.contentW = this.css.document.width;
 		this.contentH = this.css.document.height;	
	}  
	else if (nav.ie) {
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
			 
		this.elm = this.event  = document.all[id];
		this.css = document.all[id].style;
		this.doc = document;
		
		this.w = (nav.ie4)? this.css.pixelWidth : this.elm.offsetWidth;
		this.h = (nav.ie4)? this.css.pixelHeight : this.elm.offsetHeight;
	
		this.contentW = this.elm.scrollWidth;
 		this.contentH = this.elm.scrollHeight;		
	}
	
	this.elm.parent = this;
}

function LayerDynObj_show() {
	this.css.visibility = (nav.ns4)? "show" : "visible";
}

function LayerDynObj_hide() {
	this.css.visibility = (nav.ns4)? "hide" : "hidden";
}

function LayerDynObj_writeHtml(html) {
	this.innerHtml = html;
	if (nav.ns4) {	
		this.doc.open();
		this.doc.write(html);
		this.doc.close();

		this.contentW = this.css.document.width;  
 		this.contentH = this.css.document.height; 
	}
	else if (nav.ie) {
		this.event.innerHTML = html;
		this.contentW = this.elm.scrollWidth;
		this.contentH = this.elm.scrollHeight; 
	}
}

function LayerDynObj_deleteObject(){
    this.hide();
	this.writeHtml("");
	if (is.ns4)
		delete this.css;
}

function LayerDynObj_moveTo(x,y,changeInitVals) {	
	if (changeInitVals == null || changeInitVals == true) {
		this.x = this.initx = x;
		this.y = this.inity = y;
	} else {	
		this.x = x;
		this.y = y;
	}
		
	if (nav.ns4) { 
		this.css.left = this.x;
		this.css.top = this.y;
	}	
	else if (nav.ie) { 
		this.css.pixelLeft = this.x;
		this.css.pixelTop = this.y;
	} 
}

function LayerDynObj_moveBy(x,y) {	
	this.x += (x == null) ? 0 : x;
	this.y += (y == null) ? 0 : y;
	if (nav.ns4) { 
		this.css.left = this.x;
		this.css.top = this.y;
	}	
	else if (nav.ie) { 
		this.css.pixelLeft = this.x;
		this.css.pixelTop = this.y;
	}
}

function LayerDynObj_changeClip(top, right, bottom, left) {
	this.clipRect.top 	 = parseInt(top);
	this.clipRect.right  = parseInt(right);
	this.clipRect.bottom = parseInt(bottom);
	this.clipRect.left   = parseInt(left);	
	if (nav.ns4) { 
		this.css.clip.top 		= this.clipRect.top; 
		this.css.clip.right 	= this.clipRect.right; 
		this.css.clip.bottom 	= this.clipRect.bottom; 
		this.css.clip.left 		= this.clipRect.left;
	} else { 
		this.css.clip = "rect("+ this.clipRect.top +"px "+ this.clipRect.right +"px "+ this.clipRect.bottom +"px "+ this.clipRect.left +"px)";
	}
}

function LayerDynObj_resizeTo(width, height, saveTmpVals, changeClip) {
	if (saveTmpVals) {
		this.tmpWidth 	= this.w;
		this.tmpHeight	= this.h;
	}
	this.w = width;
	this.h = height;
			
	if (nav.ns4) {  
		this.css.resizeTo(width, height);
	} else { 
		this.css.pixelWidth = width; 
		this.css.pixelHeight = height;
		if (changeClip != false) this.changeClip(0,width,height,0);
	} 
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
	if (nav.ns4) { 
		this.css.bgColor = this.css.bgcolor;
	} else if (nav.ie || nav.ns6) { 
		this.css.backgroundColor = this.css.bgcolor;
	} 
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
