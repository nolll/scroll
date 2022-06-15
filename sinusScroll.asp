<html>
<head>
	<title>Sinus Scroll</title>
	<style>
	#scrolldiv {
		position:absolute;
		top:200;
		left:20;
		color:#ffffff;
		font-weight:bold;
		font-family:arial;
		font-size:14px;
		z-index:7;
	}
	#borderdiv {
		position:absolute;
		top:0;
		left:0;
		width:720;
		height:500;
		color:#cccccc;
		background:#cccccc;
		z-index:3;
		clip:rect(145 505 270 95);
	}
	#windowdiv {
		position:absolute;
		top:0;
		left:0;
		width:720;
		height:500;
		color:#000000;
		background:#000000;
		z-index:5;
		clip:rect(150 500 265 100);
	}
	#bardiv {
		position:absolute;
		top:183;
		left:100;
		width:400;
		height:49;
		z-index:10;
	}
	</style>
</head>

<body bgcolor="#999999">

<div id="borderdiv">

<div id="windowdiv">
<%
theText = "razorfish developers"
'theText = ucase(theText)
for i = len(theText) to 1 step -1
	thisChar = mid(theText, i, 1)
%>
	<div id="scrolldiv"><%=thisChar%></div>
<%
next
%>
	<div id="bardiv"><img src="baranim2.gif" width="400" height="49"></div>
</div>

</body>
</html>

<script language="javascript">
var width = 720;
var pos = width;
var left = 0;
var amplitude = 35;
var top = 200;
var pi = Math.PI;
var numChars = document.all.scrolldiv.length;
var firstPos = 0;
var lastPos = numChars - 1;
var lastTop = 0;
var vertSpeed = 2;
var horiSpeed = 3;
var charDistance = 10;

function paintSinus() {
	for (i = firstPos; i < numChars; i++) {
		var thispos = pos - charDistance * i;
		var thisPosForRad = thispos * vertSpeed;
		var rad = thisPosForRad * 2 * pi / 360;
		var mathTop = amplitude * Math.sin(rad);
		var thisTop = top + mathTop;
		var divtomove = lastPos - i;
		var thisColor;
		if (thisTop > lastTop) {
			document.all.scrolldiv[divtomove].style.zIndex = 13;
			if (mathTop > 35 || mathTop < -35) thisColor = "#aaaaaa";
			else if (mathTop > 30 || mathTop < -30) thisColor = "#bbbbbb";
			else if (mathTop > 25 || mathTop < -25) thisColor = "#cccccc";
			else if (mathTop > 20 || mathTop < -20) thisColor = "#dddddd";
			else if (mathTop > 15 || mathTop < -15) thisColor = "#eeeeee";
			else if (mathTop > 10 || mathTop < -10) thisColor = "#ffffff";
			document.all.scrolldiv[divtomove].style.color = thisColor;
		} else {
			document.all.scrolldiv[divtomove].style.zIndex = 7;
			document.all.scrolldiv[divtomove].style.color = "#999999";
		}
		document.all.scrolldiv[divtomove].style.top = thisTop;
		document.all.scrolldiv[i].style.left = thispos;
		lastTop = thisTop;
	}
	pos = pos - horiSpeed;
	if (pos == left) pos = width;
	lastTop = document.all.scrolldiv[lastPos].style.pixelTop;
}
setInterval("paintSinus()", 20);
//paintSinus();

</script>