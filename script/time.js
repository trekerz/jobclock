/**
* 两个倒计时
* 按钮上的日期显示
 */

// var time = new Date(); //time变量因为每次定时都需要改变，故不能设为全局变量

// 当前时间显示
function showTime(){
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var day = getXingqi(time.getDay());
	var hour = correctTime(time.getHours());
	var minute = correctTime(time.getMinutes());
	document.getElementById("head-time").innerHTML = (year+"年"+month+"月"+date+"日 "+day+" "+hour+":"+minute);

	setTimeout(showTime,1000);
}

function getXingqi(day){
	switch (day) {
		case 1:return "星期一";break;
		case 2:return "星期二";break;
		case 3:return "星期三";break;
		case 4:return "星期四";break;
		case 5:return "星期五";break;
		case 6:return "星期六";break;
		case 0:return "星期日";break;
		default:break;
	}
}

function correctTime(num){
	switch (num) {
		case 1:return "01";break;
		case 2:return "02";break;
		case 3:return "03";break;
		case 4:return "04";break;
		case 5:return "05";break;
		case 6:return "06";break;
		case 7:return "07";break;
		case 8:return "08";break;
		case 9:return "09";break;
		case 0:return "00";break;
		default:return num;break;
	}
}

// 两个倒计时
function countdown(){
	var time = new Date();
	var now = time.getTime();
	var graduate = new Date(2017,6,1).getTime();
	var autumn = new Date(2016,11,31);
	var countdown1 = graduate - now;
	var countdown2 = autumn - now;

	var d1 = Math.floor(countdown1/1000/3600/24);
	document.getElementById("head-CD1-days").innerHTML = d1;
	var d2 = Math.floor(countdown2/1000/3600/24);
	document.getElementById("head-CD2-days").innerHTML = d2;

	setTimeout(countdown,1000);
}

// 根据当前日期显示导航栏日期按钮组
function defaultDateToShow(){
	var time = new Date();
	var now = time.getTime();
	var aDay = 86400000;
	for(var i=0;i<10;i++){
		if(i <= 4){
			$(".head-card-item:eq("+i+")").children("span")[0].innerHTML = new Date(now-(4-i)*aDay).getMonth() + 1;
			$(".head-card-item:eq("+i+")").children("span")[1].innerHTML = new Date(now-(4-i)*aDay).getDate();
		}else{
			$(".head-card-item:eq("+i+")").children("span")[0].innerHTML = new Date(now+(i-4)*aDay).getMonth() + 1;
			$(".head-card-item:eq("+i+")").children("span")[1].innerHTML = new Date(now+(i-4)*aDay).getDate();
		}
	}
}


// 时间日期相关入口函数
$(document).ready(function(){
	// 解决setInterval刚开始需要1s后才显示的问题
	setTimeout(showTime,0);
	setTimeout(countdown,0);

	defaultDateToShow();
});