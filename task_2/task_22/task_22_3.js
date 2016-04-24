function task22(){

	var tree=new binaryTree();
	var roo=document.getElementById("root");
	var button=document.getElementsByTagName("button");
	var timer;
	for (var i = 0; i<button.length; i++) {
		addHandler(button[i],"click",function(){
			clearInterval(timer);
			[].forEach.call(tree.nodeList,function(i){
				visitedPoint(i);
			});
			tree.nodeList=[];
			tree[this.id](roo);
			animation(tree);
		});
	}

	function binaryTree(){
		this.nodeList=[];
	}

	binaryTree.prototype.preOrder=function (T){
		if(T){
			this.nodeList.push(T);
			if (T.firstElementChild) {
				this.preOrder(T.firstElementChild);
			}
			if (T.lastElementChild) {
				this.preOrder(T.lastElementChild);
			}
		}
	}
	binaryTree.prototype.inOrder=function (T){
		if(T){
			if (T.firstElementChild) {
				this.inOrder(T.firstElementChild);
			}
			this.nodeList.push(T);
			if (T.lastElementChild) {
				this.inOrder(T.lastElementChild);
			}
		}
	}
	binaryTree.prototype.postOrder=function (T){
		if(T){
			if (T.firstElementChild) {
				this.postOrder(T.firstElementChild);
			}
			if (T.lastElementChild) {
				this.postOrder(T.lastElementChild);
			}
			this.nodeList.push(T);
		}
	}

	function animation(treeType){
		var input=document.getElementsByTagName("input")[0].value;
		var item=0;
		if (treeType.nodeList.length>0) {
			visitPoint(treeType.nodeList[item]);
			timer=setInterval(function (){
				if(item==treeType.nodeList.length-1){
					visitedPoint(treeType.nodeList[item]);
					clearInterval(timer);
				}
				else{
					item++;
					visitedPoint(treeType.nodeList[item-1]);
					visitPoint(treeType.nodeList[item]);
				}
			},input);
		}
	}
	function visitPoint(node){
		node.style.backgroundColor="blue";
	}
	function visitedPoint(node){
		node.style.backgroundColor="white";
	}
}
window.onload=task22;
