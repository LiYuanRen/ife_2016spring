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

//左侧入
function addLeft(){
	var input=document.getElementsByName("input")[0];
	if(isNaN(input.value)){
		alert("请输入有效的数字");
	}
	else{
		arrayList.unshift(input.value);
		renderChart();
	}
}
//右侧入
function addRight(){
	var input=document.getElementsByName("input")[0];
	if(isNaN(input.value)){
		alert("请输入有效的数字");
	}
	else{
		arrayList.push(input.value);
		renderChart();
	}
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
}
window.onload=buttonHandler;
