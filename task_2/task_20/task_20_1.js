var arrayList=[];

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
//渲染数组图表
function renderChart(){
	var numberChart=document.getElementById("number-chart");
	var chartHtml="";
	for(var i=0;i<arrayList.length;i++){
		chartHtml+="<div>"+arrayList[i]+"</div>";
	}
	numberChart.innerHTML=chartHtml;
}
//对输入的内容进行处理
function inputHandler(inputValue){
	var pattern= /[\d\w\u4e00-\u9fa5]+/g;
	return inputValue.match(pattern);
}
//左侧入
function addLeft(){
	var input=document.getElementsByTagName("textarea")[0];
	var inputList=inputHandler(input.value);
	for(var i=inputList.length-1;i>=0;i--){
		arrayList.unshift(inputList[i]);
	}
	renderChart();
}
//右侧入
function addRight(){
	var input=document.getElementsByTagName("textarea")[0];
	var inputList=inputHandler(input.value);
	for(var i=0;i<inputList.length;i++){
		arrayList.push(inputList[i]);
	}
	renderChart();
}
//左侧出
function deleteLeft(){
	alert("删除"+arrayList[0]);
	arrayList.shift();
	renderChart();
}
//右侧出
function deleteRight(){
	alert("删除"+arrayList[arrayList.length-1]);
	arrayList.pop();
	renderChart();
}
//查询处理
function searchHandler(){
	var word=document.getElementsByTagName("input")[0].value;
	var divList=document.getElementById("number-chart").getElementsByTagName("div");
	for(var i=0;i<divList.length;i++){
		var patt=new RegExp(word,"g");
		if(patt.test(divList[i].innerHTML)){
			divList[i].style.backgroundColor="blue";
		}
	}
}
//给按钮添加事件处理程序
function buttonHandler(){
	var leftIn=document.getElementsByName("leftIn")[0];
	addHandler(leftIn,"click",addLeft);
	var rightIn=document.getElementsByName("rightIn")[0];
	addHandler(rightIn,"click",addRight);
	var leftOut=document.getElementsByName("leftOut")[0];
	addHandler(leftOut,"click",deleteLeft);
	var rightOut=document.getElementsByName("rightOut")[0];
	addHandler(rightOut,"click",deleteRight);	
	var search=document.getElementsByName("search")[0];
	addHandler(search,"click",searchHandler);
}
window.onload=buttonHandler;
