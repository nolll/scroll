/*
Description:
	- Rectobject
	
Used by:
	- LayerObject_dyn.js
	- LayerObject_dyn_nestled.js	

Dependencies:

*/

function Rect(top, right, bottom, left) {
	this.top 	= this.initTop 	  = parseInt(top); 
	this.right 	= this.initRight  = parseInt(right);
	this.bottom = this.initBottom = parseInt(bottom);
	this.left 	= this.initLeft   = parseInt(left);
}

