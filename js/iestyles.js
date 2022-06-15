/*
 *	decrease the font-size by 1px in stylesheet classes on ie.
 *	will adjust the font-size to be similar on ie and ns
 */
if (nav.ie) {
	for (i = 0; i < document.styleSheets[0].rules.length; i++) {
		var objRule = document.styleSheets[0].rules[i];
		var intSize = parseInt(objRule.style.fontSize);
		if (!isNaN(intSize)) {
			intSize -= 1;
			objRule.style.fontSize	= intSize + "px";
		}	
	}
}	