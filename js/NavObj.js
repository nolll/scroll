function navObj(){
	this.browser = navigator.userAgent;
	this.version = parseInt(navigator.appVersion);
	this.win = this.browser.indexOf("Win") > 0;
	this.ie = this.browser.indexOf("MSIE") > 0;
	this.ie4 = this.browser.indexOf("MSIE 4") > 0;
	this.ie5 = this.browser.indexOf("MSIE 5") > 0;
	this.ie55 = this.browser.indexOf("MSIE 5.5") > 0;
	this.ns4 = (!this.ie && this.version == 4);
	this.ns6 = (!this.ie && this.version == 5);
	this.dom = document.getElementById;
}
nav = new navObj();
