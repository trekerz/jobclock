
function time(){
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var day = getDay(time.getDay());
	var hour = correctTime(time.getHours());
	var minute = correctTime(time.getMinutes());
	document.getElementById("head-time").innerHTML = (year+"年"+month+"月"+date+"日&nbsp;"+day+"&nbsp;"+hour+":"+minute);
}

function getDay(day){
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

var clockStart = setInterval(time,1000);



function countdown(){
	var now = new Date().getTime();
	var graduate = new Date(2017,6,1).getTime();
	var autumn = new Date(2016,11,31);
	var countdown1 = graduate - now;
	var countdown2 = autumn - now;


	var d1 = Math.floor(countdown1/1000/3600/24);
	document.getElementById("head-CD1-days").innerHTML = d1;
	var d2 = Math.floor(countdown2/1000/3600/24);
	document.getElementById("head-CD2-days").innerHTML = d2;
}

var countStart = setInterval(countdown,1000);