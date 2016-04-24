//跨浏览器的事件处理程序
function addHandler(element,eventName,listener) {
    if(element.addEventListener) {
        element.addEventListener(eventName,listener,false);
    }
    else if(element.attachEvent) {
        element.attachEvent('on'+eventName,listener);
    }
    else
        element['on'+eventName]=listener;
}
function getSchool(){
	var cityOption=city.options;
	var citySchool=schoolArr[cityOption.selectedIndex];
	school.length=0;
	for(var i=0;i<citySchool.length;i++){
		school[i]=new Option(citySchool[i],citySchool[i]);
	}
}
function getPosition(){
	var positionSelect;
	for (var i = 0; i <radio.length; i++) {
		if (radio[i].checked) {
			positionSelect=document.getElementById(radio[i].value);
			positionSelect.style.display="block";
		}
		else{
			document.getElementById(radio[i].value).style.display="none";
		}
	}
}
var schoolArr=[
			["北京大学","清华大学","北京邮电大学","北京航空航天大学"],
			["天津大学","南开大学"],
			["西安交通大学","西北工业大学","西安电子科技大学"],
			["上海大学","上海交通大学"]
		   ];

var radio=document.getElementsByName("position");
var form1=document.getElementById("form1");
var city=form1.elements["city"];
var school=form1.elements["school"];
window.onload=function(){
	addHandler(city,"change",getSchool);
	// addHandler(form1,"click",getPosition);
	for (var i = 0; i <radio.length; i++) {
		addHandler(radio[i],"click",getPosition);
	}
}