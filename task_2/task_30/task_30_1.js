var right=true;
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
function insertAfter(newElment,targetElement) {
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		targetElement.appendChild(newElment);
	}
	else{
		parent.insertBefore(newElment,targetElement.nextSibling);
	}
}
function wordCount(str) {
	var count = str.replace(/[^\x00-\xff]/g,"**").length;
	return count;
}
function testName(name,nameHint) {
	var count=wordCount(name.value);
	if (count>=4&&count<=16) {
		nameHint.innerHTML="名称格式正确";
		nameHint.style.color="green";
		name.style.borderColor="green";
	}
	else {
		name.style.borderColor="red";
		nameHint.style.color="red";
		if(count==0){
			nameHint.innerHTML="名称不能为空";
		}
		else if(count<4||count>16){
			nameHint.innerHTML="输入的名称长度过长或过短";
		}
		right=false;
	}
}
function testPw(pw,pwHint){
	var count=wordCount(pw.value);
	var boo=/^[A-Za-z0-9]+$/g.test(pw.value);
	if (count>=8&&count<=16&&boo) {
		pwHint.innerHTML="密码可用";
		pwhint.style.color="green";
		pw.style.borderColor="green";
	}
	else {
		pwHint.style.color="red";
		pw.style.borderColor="red";	
		if(count<8){
			pwHint.innerHTML="密码太短并且不能为空";
		}
		else if(count>16){
			pwHint.innerHTML="密码太长";
		}
		else if(!boo){
			pwHint.innerHTML="密码必须由字母和数字组成";
		}
		right=false;
	}
}
function testPw1(pw,pw1,pw1Hint){
	if(pw.value==pw1.value){
		testPw(pw1,pw1Hint);
	}
	else{
		pw1Hint.innerHTML="请保证两次输入一致";
		pw1Hint.style.color="red";
		pw1.style.borderColor="red";
		right=false;
	}
}
function testEmail(email,emailHint) {
	var result=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email.value);
	if(result){
		emailHint.innerHTML="邮箱格式正确";
		email.style.borderColor="green";
		emailHint.style.color="green";
	}
	else{
		emailHint.innerHTML="邮箱格式错误";
		email.style.borderColor="red";
		emailHint.style.color="red";
		right=false;
	}
}
function testTelephone(telephone,telephoneHint){
	var result=/^\d{11}$/.test(telephone.value);
	if(result){
		telephoneHint.innerHTML="手机格式正确";
		telephone.style.borderColor="green";
		telephoneHint.style.color="green";
	}
	else{
		telephoneHint.innerHTML="手机格式错误";
		telephone.style.borderColor="red";
		telephoneHint.style.color="red";
		right=false;
	}
}
function buttonHandle() {
	var name=document.getElementsByName("name")[0];
	var pw=document.getElementsByName("pw")[0];
	var pw1=document.getElementsByName("pw1")[0];
	var email=document.getElementsByName("email")[0];
	var telephone=document.getElementsByName("telephone")[0];
	var nameHint=document.getElementById("nameHint");
	var pwHint=document.getElementById("pwHint");
	var pw1Hint=document.getElementById("pw1Hint");
	var emailHint=document.getElementById("emailHint");
	var telephoneHint=document.getElementById("telephoneHint");
	var button=document.getElementsByTagName("button")[0];
	addHandler(name,"focus",function(){
		nameHint.style.color="gray";
		name.style.borderColor="gray";
		nameHint.innerHTML="必填，长度为4~16个字符";
	});
	addHandler(name,"blur",function(){
		testName(name,nameHint);
	});
	addHandler(pw,"focus",function(){
		pwHint.style.color="gray";
		pw.style.borderColor="gray";
		pwHint.innerHTML="必填，长度为8~16，字母和数字组成";
		
	});
	addHandler(pw,"blur",function(){
		testPw(pw,pwHint);
	});
	addHandler(pw1,"focus",function(){
		pw1Hint.style.color="gray";
		pw1.style.borderColor="gray";
		pw1Hint.innerHTML="必填，长度为8~16，字母和数字组成";
	});
	addHandler(pw1,"blur",function(){
		testPw1(pw,pw1,pw1Hint);
	});
	addHandler(email,"focus",function(){
		emailHint.style.color="gray";
		email.style.borderColor="gray";
		emailHint.innerHTML="请输入正确的邮箱";
	});
	addHandler(email,"blur",function(){
		testEmail(email,emailHint);
	});
	addHandler(telephone,"focus",function(){
		telephoneHint.style.color="gray";
		telephone.style.borderColor="gray";
		telephoneHint.innerHTML="请输入正确的手机号";
	});
	addHandler(telephone,"blur",function(){
		testTelephone(telephone,telephoneHint);
	});
	addHandler(button,"click",function(e){
		e.preventDefault();
		testName(name,nameHint);
		testPw(pw,pwHint);
		testPw1(pw,pw1,pw1Hint);
		testEmail(email,emailHint);
		testTelephone(telephone,telephoneHint);
		if(right){
			alert("提交成功！");
		}
		else{
			alert("提交失败，请检查输入！");
		}
	})
}
window.onload=buttonHandle;