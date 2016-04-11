function task21(){
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
	//对输入的内容进行处理
	function inputHandler(inputValue){
		var pattern= /[\d\w\u4e00-\u9fa5]+/g;
		return inputValue.match(pattern);
	}
	//添加爱好
	function addHobby(){
		var input=document.getElementsByTagName("textarea")[0];
		var inputList=inputHandler(input.value);//对输入的爱好进行分词处理
		for (var i = 0; i < inputList.length; i++) {
			hobbyQueue.addRight(inputList[i]);//添加爱好
		}
		//(hobbyQueue.list).forEach(hobbyQueue.addRight(item));//将爱好存储在它的list中，这句的forEach执行不了
		hobbyQueue.unique();//去重并且保证长度为10
		hobbyQueue.renderChart();//爱好渲染
	}
	//添加标签
	function addTag(){
		//当输入空格、回车、逗号时，添加元素
		if(event.keyCode==13||event.keyCode==32||event.keyCode==188){
			var tagValue=document.getElementsByTagName("input")[0].value;
			tagQueue.addRight(tagValue.trim());//添加标签
		}
		tagQueue.unique();//去重并且保证长度为10
		tagQueue.renderChart();//爱好渲染
	}

	//点击标签时删除相应的标签，使用闭包，防止i所有的函数共享一个父作用域，造成i的值和预期的结果不一致(都等于obj.childNodes.length)
	function deleteTag(obj){
		var temp=[];
		for(var i=0;i<obj.childNodes.length;i++){
			temp.push(obj.childNodes[i].innerHTML);
			addHandler(obj.childNodes[i],"click",function (i){
				return function(){
					var index=tagQueue.list.indexOf(temp[i]);
					tagQueue.list.splice(index,1);
					tagQueue.renderChart();
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
	//构造函数，创建自己私有的成员
	function Queue(htmlElement){
		this.list=[];
		this.htmlElement=htmlElement;
	}
	//原型链，为了对象tagQueue和hobby共享这些方法
	Queue.prototype.addRight=function(item){
		this.list.push(item);
		this.renderChart();
	}
	Queue.prototype.renderChart=function(){
		var elementChart=document.getElementById(this.htmlElement);
		var chartHtml="";
		for(var i=0;i<this.list.length;i++){
			chartHtml+="<div>"+this.list[i]+"</div>";
		}
		elementChart.innerHTML=chartHtml;
		if(this.htmlElement=="tag"){
			deleteTag(elementChart);
		}	
	}
	Queue.prototype.unique=function(){//数组去重并且保证长度最大为10
		var obj={};
		this.list.forEach(function (item){
			obj[item]=1;
		});
		this.list=keys(obj).slice(0,10);
	}

	//分别创建tag和hobby的Queue实例
	var tagQueue=new Queue("tag");
	var hobbyQueue=new Queue("hobby");
	//为两个按钮添加事件
	var button=document.getElementsByTagName("button")[0];
	addHandler(button,"click",addHobby);
	var input=document.getElementsByTagName("input")[0];
	addHandler(input,"keydown",addTag);
}
window.onload=task21;