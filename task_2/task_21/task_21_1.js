var arrayList1=[];
var arrayList2=[];
var hobbyList=[];
var tagList=[];
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
function renderChart(info,htmlElement){
	var elementChart=document.getElementById(htmlElement);
	var chartHtml="";
	for(var i=0;i<info.length;i++){
		chartHtml+="<div>"+info[i]+"</div>";
	}	
	elementChart.innerHTML=chartHtml;
	if(htmlElement=="tag"){
		deleteTag(elementChart);	
	}
}
//点击标签时删除相应的标签
function deleteTag(obj){
	var temp=[];
	for(var i=0;i<obj.childNodes.length;i++){
		temp.push(obj.childNodes[i].innerHTML);
		addHandler(obj.childNodes[i],"click",function (i){
			return function(){
				var index=tagList.indexOf(temp[i]);
				tagList.splice(index,1);
				renderChart(tagList,"tag");
			}
		}(i));
		addHandler(obj.childNodes[i],"mouseover",function (i){
			return function(){
				obj.childNodes[i].innerHTML="删除"+temp[i];
			}
		}(i));
		addHandler(obj.childNodes[i],"mouseout",function (i){
			return function(){
				obj.childNodes[i].innerHTML=temp[i];
			}
		}(i));
	}
}

//对输入的内容进行处理
function inputHandler(inputValue){
	var pattern= /[\d\w\u4e00-\u9fa5]+/g;
	return inputValue.match(pattern);
}
//返回一个数组中可枚举的自由属性的名字
function keys(o){
	if (typeof o!=="object") {
		throw TypeError();
	}
	var result=[];
	for(var prop in o){
		if (o.hasOwnProperty(prop)) {
			result.push(prop);
		}
	}
	return result;
}
//对数组进行去重
function unique(arr){
	var obj={};
	arr.forEach(function (item){
		obj[item]=1;
	});
	return keys(obj);
}
//添加爱好
function addHobby(){
	var input=document.getElementsByTagName("textarea")[0];
	var inputList=inputHandler(input.value);
	for(var i=inputList.length-1;i>=0;i--){
		arrayList1.push(inputList[i]);
	}
	hobbyList=unique(arrayList1).slice(0,10);//数组去重并且保证长度最大为10
	renderChart(hobbyList,"hobby");//爱好渲染
}
//添加标签
function addTag(){
	//当输入空格、回车、逗号时，添加元素
	if(event.keyCode==13||event.keyCode==32||event.keyCode==188){
		var tagValue=document.getElementsByTagName("input")[0].value;
		arrayList2.push(tagValue.trim());
	}
	tagList=unique(arrayList2).slice(0,10);//数组去重并且保证长度最大为10	
	renderChart(tagList,"tag");//标签渲染
}
//给按钮添加事件处理程序
function buttonHandler(){
	var button=document.getElementsByTagName("button")[0];
	addHandler(button,"click",addHobby);
	var input=document.getElementsByTagName("input")[0];
	addHandler(input,"keydown",addTag)
}
window.onload=buttonHandler;