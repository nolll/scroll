function Scroll() {
	this.top = 0;
	this.left = 0;
	this.width = 0;
	this.height = 0;
	this.centerPoint = 0;
	this.text = "";
	this.letters = [];
	this.letterSpacing = 0;
	this.letterWidth = 0;
	this.letterHeight = 0;
	this.speed = 0;
	this.step = 0;
	this.amplitude = 0;
	this.sine = [];
	this.background = null;
	this.margin = 0;
}

Scroll.prototype.init = function() {
	for (var i = 0; i < this.text.length; i++) {
		this.letters[i] = new Letter(this.text.substring(i, i + 1), i, this.letterWidth, this.letterHeight);
		this.letters[i].lay.moveTo(this.width + this.letterSpacing * i, this.centerPoint);
	}
	this.calcSine();
}

Scroll.prototype.calcSine = function() {
	var pi = Math.PI;
	for (var i = 0; i < this.width; i++) {
		this.sine[i] = Math.sin(i * 2 * pi / 360);
	}
}

function Letter(letter, index, width, height) {
	this.lay = new LayerDynObj("letter" + index, 0, 0, width, height, true, 1, null, null, null, letter);
}