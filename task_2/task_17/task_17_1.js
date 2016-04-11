/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var radio=document.getElementsByName("gra-time");


// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
//根据数值的大小获得相应的颜色
function getColor(num){
  if(num>0&&num<=100){
    return 'red';
  }
  else if(num>100&&num<=200){
    return 'green';
  }
  else if(num>200&&num<=300){
    return 'grey';
  }
  else if(num>300&&num<=400){
    return 'black';
  }
  else if(num>400&&num<=500){
    return 'pink';
  }
}
//计算每个圆柱的宽度
function getWidth(num){
  return Math.round(1300/(num*2+1));
}
/**
 * 渲染图表
 */
function renderChart() {
  var chartHtml="";
  var selectData=chartData[pageState.nowSelectCity][pageState.nowGraTime];
  var chartWrap=document.getElementById("aqi-chart-wrap");
  var interval=getWidth(objectLength(selectData));//parseInt(chartWrap.style.width),不造为啥这个宽度取不了，无耐就没有传参
  var left=interval;
  if(pageState.nowGraTime=="day"){
    for(var key in selectData){
      title=pageState.nowSelectCity+":"+key+" "+selectData[key];
      chartHtml+="<div title='" + title + "' style='height:" +selectData[key]+ ";width:"+interval+"px;left:" +left+ "px;background-color:" + getColor(selectData[key]) + ";'"+"></div>";
      left=left+interval*2;
    }
  }
  else if(pageState.nowGraTime=="week"){
    for(var key in selectData){
      title=pageState.nowSelectCity+":"+"第"+key+"周 "+selectData[key];
      chartHtml+="<div title='" + title + "' style='height:" +selectData[key]+ ";width:"+ interval +"px;left:" +left+ "px;background-color:" + getColor(selectData[key]) + ";'"+"></div>";
      left=left+interval*2;
    }
  }
  else if(pageState.nowGraTime=="mouth"){
    for(var key in selectData){
      title=pageState.nowSelectCity+":"+"第"+key.slice(1,2)+"月 "+selectData[key];
      chartHtml+="<div title='" + title + "' style='height:" +selectData[key]+ ";width:"+interval+"px;left:" +left+ "px;background-color:" + getColor(selectData[key]) + ";'"+"></div>";
      left=left+interval*2;
    }
  }
  chartWrap.innerHTML=chartHtml;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var dwm=this.value;
  if(dwm!=pageState.nowGraTime){
    pageState.nowGraTime=dwm; // 设置对应数据
    renderChart();// 调用图表渲染函数
  }
}
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var city = this.value;
  if(city!=pageState.nowSelectCity){
    pageState.nowSelectCity=city;// 设置对应数据
    renderChart();// 调用图表渲染函数
  }
}
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
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  for (var i = 0; i <radio.length; i++) {
    radio[i].onclick = graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select = document.getElementById("city-select");
  var cityHtml="";
  for(var city in aqiSourceData){
    cityHtml+="<option>"+city+"<\/option>";
  }
  select.innerHTML=cityHtml;
  pageState.nowSelectCity = select.options[0].value;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addHandler(select,"change",citySelectChange);
}

// 获取对象的长度
function objectLength(obj){
  var len=0;
  for(var key in obj){
    len++;
  }
  return len;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for(var city in aqiSourceData){
    var cityData=aqiSourceData[city],week={},mouth={};
    var daysWe=0,daysMou=0,weekNum=1,singleWeek=0,singleMouth=0,len=0;
    chartData[city]={};
    var cityDataLenght=objectLength(cityData);
    for(var data in cityData){
      //week
      dataObject=new Date(data.replace(/-/g, "/"));//将日期字符串转换为日期对象，以便调用getDay()
      singleWeek=singleWeek+cityData[data];//记录每周的aqi和
      len++,daysWe++;
      if(dataObject.getDay()==6||len==cityDataLenght){
        week[weekNum]=Math.round(singleWeek/daysWe);//计算每周的平均aqi
        singleWeek=0;
        weekNum++;//记录总共有多少周
        daysWe=0;//记录每周的天数
      }
      //mouth
      var preMouth,nowMouth=data.slice(5,7);
      if(len==cityDataLenght){//当遍历到每个城市的最后一天时
        singleMouth=singleMouth+cityData[data];//记录该月的aqi和
        daysMou++;//记录该月的天数
        mouth[preMouth]=Math.round(singleMouth/daysMou); //计算本月的平均aqi  
      }
      else if(len==1||preMouth==nowMouth){//当遍历到每个城市的第一天或者前一天和当天为同一月时
        singleMouth=singleMouth+cityData[data];
        daysMou++;
      }
      else if(preMouth!=nowMouth){//当遍历到每个城市的前一天和当天属于不同月份时
        mouth[preMouth]=Math.round(singleMouth/daysMou);//计算上个月的aqi
        singleMouth=cityData[data];
        daysMou=1;
      }
      preMouth=nowMouth;
    }
    chartData[city]["day"]=cityData;
    chartData[city]["week"]=week;
    chartData[city]["mouth"]=mouth; 
  }
  renderChart();
}

/**
 * 初始化函数
 */
window.onload=function init(){
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
};