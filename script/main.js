/**
* 日期按钮入口函数
* 两侧滚动入口函数
* 显示联系信息入口函数
* 
* 1.hoverinItem ()
* 2.hoveroutItem ()
* 3.clickItem ()
* 4.delCookie(name)
* 5.showVisitTimes(times)
* 
 */

// $("body").append("<script type='text/javascript' src='./script/data.js'></script>");

// 全部变量
var currentClicked = $(".hovered");
var clickedOrNot = false;

// hover和click日期后发生的动画
function hoverinItem (){
	currentClicked.removeClass("hovered");
	$(this).addClass("hovered");
}

function hoveroutItem (){
	if(clickedOrNot == false){
		$(this).removeClass("hovered");
		currentClicked.addClass("hovered");
	}else{
		clickedOrNot = false;
	}
}

function clickItem (){
	currentClicked.removeClass("hovered");
	$(this).addClass("hovered");
	clickedOrNot = true;
	currentClicked = $(this);
}

// 删除Cookie
function delCookie(name){
	var timeToUse = new Date();
	timeToUse.setTime(timeToUse.getTime() - 1);
	document.cookie = name+"="+";expires="+timeToUse.toGMTString();
}

// 显示侧边滑动栏日期
function slidingDate(month,date){
	var monthEng = "";
	switch (parseInt(month)) {
		case 1:monthEng = "January";break;
		case 2:monthEng = "February";break;
		case 3:monthEng = "March";break;
		case 4:monthEng = "April";break;
		case 5:monthEng = "May";break;
		case 6:monthEng = "June";break;
		case 7:monthEng = "July";break;
		case 8:monthEng = "August";break;
		case 9:monthEng = "September";break;
		case 10:monthEng = "October";break;
		case 11:monthEng = "November";break;
		case 12:monthEng = "December";break;
		default:break;
	}
	$(".dateLeft").children().remove();
	$(".dateLeft").append($("<div class='bigDate'>"+date+"</div><div class='smallMonth'>"+monthEng+"</div>"));
}

// 显示侧边滑动栏星期
function slidingDay(month,date){
	var year = (new Date()).getFullYear();
	var time = new Date(year,month-1,date);
	$(".dateLeft").children().remove();
	$(".dateLeft").append($("<div class='bigDay'>"+getXingqi(time.getDay())+"</div>"));
}

// 打印出访问次数
function showVisitTimes(times){
	$("<div class='foot-times'></div>").appendTo($(".foot")).text(times);
}



// 日期按钮入口函数
$(document).ready(function(){
	$(".head-card-item").hover(hoverinItem,hoveroutItem);
	$(".head-card-item").click(clickItem);
});

// 两侧滚动入口函数
$(document).ready(function(){
	var $miao1 = $(".main-left"),
	$miao2 = $(".main-right"),
	$window = $(window),
	$mOffsetTop = $miao1.offset().top; // 初始的距离浏览器顶部的长度（试验值260）

	$window.scroll(function(){
		if($window.scrollTop() > $mOffsetTop - 250){
			// 窗口滑动大于260-250=10时才跟着滑动
			$miao1.stop().animate({marginTop: $window.scrollTop()});
			$miao2.stop().animate({marginTop: $window.scrollTop()});
		}else{
			$miao1.stop().animate({marginTop: 50});
			$miao2.stop().animate({marginTop: 50});
		}
	});

});

// 显示联系信息入口函数
$(".foot-contact").hide();
$(".foot-public").hide();
$(document).ready(function(){
	$(".dateLeft").mouseenter(function(){
		slidingDay($(".hovered").children()[0].innerHTML,$(".hovered").children()[1].innerHTML); // 随时监测hover		
	});
	$(".dateLeft").mouseleave(function(){
		slidingDate($(".hovered").children()[0].innerHTML,$(".hovered").children()[1].innerHTML); // 随时监测hover
	});

	$(".foot-contact").fadeIn(2000);
	$(".foot-public").fadeIn(2000);
});

// 页面初始ajax信息传输
$(document).ready(function(){
	showLoading(); // data.js
	var hoverMonth = $(".hovered").children()[0].innerHTML;
	var hoverDate = $(".hovered").children()[1].innerHTML;
	var dateToSend = hoverMonth + hoverDate;
	document.cookie = "status=visited";
	$.ajax({
		type:"POST",
		async: true,
		url: "script/getdata.php",
		dataType:"json",
		data:{"request":dateToSend},
		success: function(result){
			showVisitTimes(result.visited);
			dataReceiving(hoverMonth,hoverDate,result); // data.js
			slidingDate(hoverMonth,hoverDate);
		}
	});
	delCookie("status");
});