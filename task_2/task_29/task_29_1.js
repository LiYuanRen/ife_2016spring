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
function wordCount(str) {
	var count = str.replace(/[^\x00-\xff]/g,"**").length;
	return count;
}
function test() {
	var input=document.getElementsByTagName("input")[0];
	var hint=document.getElementById("hint");
	var count=wordCount(input.value);
	if (count>=4&&count<=16) {
		hint.innerHTML="名称格式正确";
		hint.style.color="green";
		input.focus();
		input.style.borderColor="green";
	}
	else if(count==0){
		hint.innerHTML="名称不能为空";
		hint.style.color="red";
		input.focus();
		input.style.borderColor="red";
	}
	else if(count<4||count>16){
		hint.innerHTML="输入的名称长度过长或过短";
		hint.style.color="red";
		input.focus();
		input.style.borderColor="red";
	}
}
function buttonHandle() {
	var button=document.getElementsByTagName("button")[0];
	addHandler(button,"click",test);
}
window.onload=buttonHandle;