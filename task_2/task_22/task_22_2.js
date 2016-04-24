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