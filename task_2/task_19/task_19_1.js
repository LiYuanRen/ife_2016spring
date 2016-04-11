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
function getColor(num){
  if(num>0&&num<=20){
    return 'red';
  }
  else if(num>20&&num<=40){
    return 'green';
  }
  else if(num>40&&num<=60){
    return 'grey';
  }
  else if(num>60&&num<=80){
    return 'black';
  }
  else if(num>80&&num<=100){
    return 'blue';
  }
}
//渲染数组图表
function renderChart(){
	if(arrayList.length>60){
		alert("最多允许添加60个元素");
	}
	else{
		var numberChart=document.getElementById("number-chart");
		var chartHtml="";
		var interval=5;
		for(var i=0;i<arrayList.length;i++){
			chartHtml+="<div style='height:" +arrayList[i] + "px;left:"+ interval +"px;background-color:"+ getColor(arrayList[i]) +"'>"+arrayList[i]+"</div>";
			interval+=25;
		}
		// alert(chartHtml);
		numberChart.innerHTML=chartHtml;
	}
}
//冒泡排序
// function sort(){
// 	var numberChart=document.getElementById("number-chart");
// 	var divList=numberChart.getElementsByTagName("div");
// 	timer = setInterval(sortOne, 30);
// 	function sortOne(){
// 		alert("sort");
// 		var flag=1;
// 		for(var i=0;i<arrayList.length&&flag;i++){
// 			for(var j=arrayList.length-1&&flag;j>i;j--){
// 				flag=0;
// 				if(arrayList[j]<arrayList[j-1]){
// 					var temp=arrayList[j];
// 					arrayList[j]=arrayList[j-1];
// 					arrayList[j-1]=temp;
// 					var tempColor=divList[j].style.backgroundColor;
// 					divList[j].style.height=arrayList[j]+"px";
// 					divList[j].style.backgroundColor=divList[j-1].style.backgroundColor;
// 					divList[j].innerHTML=arrayList[j];
// 					divList[j-1].style.height=arrayList[j-1]+"px";
// 					divList[j-1].style.backgroundColor=tempColor;
// 					divList[j-1].innerHTML=arrayList[j-1];
// 				}
// 			}
// 		}
// 		clearInterval(timer);
// 		return;
// 	}
// }
 function sort() {//开始冒泡排序
 	var len = arrayList.length
    var i = 0, j = len-1,temp,timer = null;
	var divList=document.getElementById("number-chart").getElementsByTagName("div");
    timer = setInterval(sortOne, 30);//每次调用run()，如果发现有符合条件的则交换数值
        function sortOne() {
            if (i < len) {
                if (j >i) {
                    if (arrayList[i] > arrayList[j]) {
                        temp = arrayList[i];
                        arrayList[i] = arrayList[j];
                        arrayList[j] = temp;
                        var tempColor=divList[i].style.backgroundColor;
                        divList[i].style.height = arrayList[i] + "px";
                        divList[i].style.backgroundColor=divList[j].style.backgroundColor;
                        divList[i].innerHTML = arrayList[i];
                        divList[j].style.height = arrayList[j] + "px";
                        divList[j].style.backgroundColor=tempColor;
                        divList[j].innerHTML = arrayList[j] ;
                    }
                    j--;
                }
                else{
                    i++;
                    j = len-1;
                }
            }
            else {
                clearInterval(timer);
                return;
            }
        }
    }

//左侧入
function addLeft(){
	var input=document.getElementsByName("input")[0];
	if(Number(input.value)>0&&Number(input.value)<100){
		arrayList.unshift(input.value.trim());
		renderChart();
	}
	else{
		alert("请输入0~100的有效数字");
	}
}
//右侧入
function addRight(){
	var input=document.getElementsByName("input")[0];
	if(Number(input.value)>0&&Number(input.value)<100){
		arrayList.push(input.value.trim());
		renderChart();
	}
	else{
		alert("请输入0~100的有效数字");
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
function randomNum(){
	for(i=0;i<60;i++){
		arrayList[i]=Math.ceil(Math.random()*100);
	}
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
	var sortArr=document.getElementsByName("sort")[0];
	addHandler(sortArr,"click",sort);
	var randomNumber=document.getElementsByName("randomNumber")[0];
	addHandler(randomNumber,"click",randomNum)	
}
window.onload=buttonHandler;
