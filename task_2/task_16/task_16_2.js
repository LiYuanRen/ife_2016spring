/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
 // window.alert("!!!");
var aqiData = {};
var city_input=document.getElementById("aqi-city-input");
var value_input=document.getElementById("aqi-value-input");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city=city_input.value.trim();
	// if(typeof city ==Number){
	// 	alter("请输入合法值");
	// }
	var value=value_input.value.trim();
	aqiData[city]=value;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var table=document.getElementById("aqi-table");
  var tab_content="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
  for(var city in aqiData){
  	// tab_content+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button onclick=\"delBtnHandle('"+city+"')\">删除</button></td></tr>";
    tab_content += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button onclick = \"delBtnHandle('" + city + "')\">删除</button></td></tr>";
  }
  table.innerHTML=city?tab_content:'';
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */

function addBtnHandle(city) {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var button_add=document.getElementById("add-btn");
  button_add.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
 //  var table=document.getElementById("aqi-table");
 //  var tr=table.getElementsByTagName("tr");
 //  for (var i = 1; i < tr.length; i++) {
	// tr[i].getElementsByTagName("button")[0].addEventListener("click",delBtnHandle,false);
 //  }
}

init();
