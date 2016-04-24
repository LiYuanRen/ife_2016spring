//明明用递归简单，非要作死用了非递归！
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
function visitPoint(cur){
	cur.style.backgroundColor="blue";
}
function visitedPoint(cur){
	if(cur!=null)
		cur.style.backgroundColor="white";
}
function preOrder(){
	var roo=document.getElementById("root");
	var cur=roo,s=[],temp,preCur;
	var timer = setInterval(preOrderOne, 500);
	function preOrderOne(){
		while(true){
			//将上一次访问过的节点背景恢复为白色
			visitedPoint(preCur);		
			//当前节点不为空时
			if(cur){
				//访问节点
				visitPoint(cur);
				//记录上一次访问过的节点
				preCur=cur;
				//将节点存入栈
				s.push(cur);
				//遍历左子树
				cur=cur.firstElementChild;
				break;	
			}
			//数组(栈)不为空时
			else if(s.length!=0){
				//退栈
				cur=s.pop();
				//遍历右子树
				cur=cur.lastElementChild;
			}
			//当节点为空并且栈为空,所有的节点都已经访问完，所以取消超时调用，取消无条件循环
			else{
				visitedPoint(preCur);//保证访问的最后一个节点背景颜色的恢复
				clearInterval(timer);
				break;
			}
		}
	}
}
function inOrder(){
	var roo=document.getElementById("root");
	var cur=roo,s=[],temp,preCur;
	var timer = setInterval(inOrderOne, 500);
	function inOrderOne(){
		while(true){
			visitedPoint(preCur);
			 //alert("in");
			//当前元素不为空时
			if(cur){
				//入栈
				s.push(cur);
				//遍历左子树
				cur=cur.firstElementChild;
			}
			//数组(栈)不为空时
			else if(s.length!=0){
				//出栈
				cur=s.pop();
				//访问节点
				visitPoint(cur);
				//记录上一次访问过的节点，以清除其背景颜色
				preCur=cur;
				//遍历右子树
				cur=cur.lastElementChild;
				break;
			}
			//当元素为空并且栈为空,所有的节点都已经访问完，所以取消超时调用，取消无条件循环
			else{
				visitedPoint(preCur);//保证访问的最后一个节点背景颜色的恢复
				clearInterval(timer);
				break;
			}
		}	
	}
}

//给按钮添加事件处理程序
function buttonHandler(){
	var button=document.getElementsByTagName("button");
	addHandler(button[0],"click",preOrder);
	addHandler(button[1],"click",inOrder);
	// addHandler(button[2],"click",postOrder(roo1));
}
window.onload=buttonHandler;


// var roo1=document.getElementById("root");
// function postOrder(T){
// 	// var cur=roo,s=[],temp,preCur;
// 	var preCur;
// 	var timer = setInterval(postOrderOne, 500);
// 	function postOrderOne(){
// 		while(true){
// 			visitedPoint(preCur);
// 			if(T){
// 				postOrder(T.firstElementChild);
// 				postOrder(T.lastElementChild);
// 				visitPoint(T);
// 				preCur=T;
// 				alert(T.getAttribute("id"));
// 				break;
// 			}
// 		}
// 	}
// }

// function postOrder(){
// 	var roo=document.getElementById("root");
// 	var cur=roo,s=[],temp,preCur;
// 	var timer = setInterval(postOrderOne, 200);
// 	function postOrderOne(){
// 		while(true){
// 			alert("s.length:"+s.length);
// 			visitedPoint(preCur);
// 			while(cur){
// 				s.push(cur);
// 				cur=cur.firstElementChild;
// 				alert("1");
// 			}
// 			while(s.length!=0&&s[s.length-1].tag!=undefined){
// 				cur=s.pop();
// 				visitPoint(cur);
// 				preCur=cur;
// 				alert("id"+cur.getAttribute("id"));
// 				//alert("2");
// 				cur=s[s.length-1].lastElementChild;
// 			}
// 			if(s.length!=0){
// 				s[s.length-1].tag='R';
// 				cur=s[s.length-1].lastElementChild;
// 				alert("3");
// 			}
// 			else if(s.length==0){
// 				visitedPoint(preCur);//保证访问的最后一个节点背景颜色的恢复
// 				clearInterval(timer);
// 				alert("4");
// 				break;
// 			}
// 			break;
// 		}
// 	}
// }

// function postOrder(){
// 	var roo=document.getElementById("root");
// 	var cur=roo,s=[],temp,preCur;
// 	while(cur||s.length!=0){
// 		while(cur){
// 			s.push(cur);
// 			cur=cur.firstElementChild;
// 		}
// 		while(s.length!=0&&s[s.length-1].tag!=undefined){
// 			cur=s.pop();
// 			visitPoint(cur);
// 			alert(cur.getAttribute("id"));
// 			cur=s[s.length-1].lastElementChild;
// 		}
// 		if(s.length!=0){
// 			s[s.length-1].tag='R';
// 			cur=s[s.length-1].lastElementChild;
// 		}
// 	}
// }