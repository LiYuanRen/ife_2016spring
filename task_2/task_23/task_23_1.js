function task23(){
	var tree=new Tree();
	var roo=document.getElementsByClassName("root")[0];
	var butTravel=document.getElementsByClassName("traversal")[0].getElementsByTagName("button");
	var butSearch=document.getElementsByClassName("search")[0].getElementsByTagName("button");

	var timer;
	for (var i = 0;i<butTravel.length; i++) {
		addHandler(butTravel[i],"click",function(){
			clearInterval(timer);
			[].forEach.call(tree.nodeList,function(i){
				visitedPoint(i);
			});
			tree.nodeList=[];
			tree[this.id](roo);
			animation(tree,"ddd");
		});
	}
	for (var i = 0;i<butSearch.length; i++) {
		addHandler(butSearch[i],"click",function(){
			clearInterval(timer);
			[].forEach.call(tree.nodeList,function(i){
				visitedPoint(i);
			});
			tree.nodeList=[];
			tree[this.id](roo);
			animation(tree,this.id.substring(0,5));
		});
	}


	function Tree(){
		this.nodeList=[];
	}
	Tree.prototype.travelDFS = function(T){
		if(T){
			this.nodeList.push(T);
			for(var i=0;i<T.childNodes.length;i++){
				if(T&&T.childNodes[i].nodeType==1){
					this.travelDFS(T.childNodes[i]);
				}
			}
		}
	}
	Tree.prototype.searchDFS = function(T){
		var input=document.getElementsByTagName("input")[0].value;
		if(T){
			this.nodeList.push(T);
			for(var i=0;i<T.childNodes.length;i++){
				if(T&&T.childNodes[i].nodeType==1){
					var nn=T.childNodes[i].innerText;
					if (String(T.childNodes[i].innertext)!=String(input)) {
						// alert("node:"+T.childNodes[i].innerText+";input:"+input);
						this.searchDFS(T.childNodes[i]);
					}
				}
			}
		}
	}
	// Tree.prototype.travelBFS=function(T){
	// 	var queue=[];
	// 	if(T){
	// 		var temp=T;
	// 		this.nodeList.push(T);
	// 		queue.push(temp);
	// 		while(temp.nextElementSibling){
	// 			this.nodeList.push(temp.nextElementSibling);
	// 			queue.push(temp.nextElementSibling);
	// 			temp=temp.nextElementSibling;
	// 		}
	// 		while(queue.length!=0) {
	// 			this.travelBFS(queue.pop().firstElementChild);
	// 		}
	// 	}
	// }
	// Tree.prototype.travelBFS=function(T){
	// 	var temp=[],i=0,j=0,k=0,a;
	// 	if(T){
	// 		temp[i][j].push(T);
	// 		T=T.nextElementSibling;
	// 		j++;
	// 	}
	// 	while(i==0||a){
	// 		j=0,k=0;
	// 		while(j<temp[i].length){
	// 			a=temp[i][j].firstElementChild;
	// 			while(a) {
	// 				temp[i+1][k]=a;
	// 				a=a.nextElementSibling;
	// 				k++;
	// 			}
	// 			j++;
	// 		}
	// 		a=temp[i+1][0].firstElementChild;
	// 		i++;
	// 	}
	// 	for(i=0;i<temp.length;i++){
	// 		for(j=0;j<temp[i].length;j++){
	// 			this.nodeList.push(temp[i][j]);
	// 		}
	// 	}
	// }
	// Tree.prototype.travelBFS=function(T){
	// 	if(T){
	// 		this.nodeList.push(T);
	// 		var temp=T;
	// 		while(temp.nextElementSibling){
	// 			this.nodeList.push(temp.nextElementSibling);
	// 			temp=temp.nextElementSibling;
	// 		}
	// 			this.travelBFS(T.firstElementChild);
	// 	}
	// }
	function animation(treeType,butType){
		var item=0;
		var input=document.getElementsByTagName("input")[0].value;
		if (treeType.nodeList.length>0) {
			visitPoint(treeType.nodeList[item]);
			timer=setInterval(function (){
				// alert("ff");
				if (butType=="search"&&treeType.nodeList[item].innerText!=input) {
						alert("node:"+treeType.nodeList[item].innerText+";input:"+input);
						clearInterval(timer);
				}
				if(item==treeType.nodeList.length-1){
					visitedPoint(treeType.nodeList[item]);
					clearInterval(timer);
				}
				else{
					item++;
					visitedPoint(treeType.nodeList[item-1]);
					visitPoint(treeType.nodeList[item]);
				}
			},500);
		}
	}
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
	function visitPoint(node){
		node.style.backgroundColor="blue";
	}
	function visitedPoint(node){
		node.style.backgroundColor="white";
	}
}
window.onload=task23;