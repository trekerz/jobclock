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
var banner = $(".foot-banner");
var num = 1;

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
	var $miao1 = $(".main-left");
	var $miao2 = $(".main-right"),
	$window = $(window),
	offset = $miao1.offset(),
	topPadding = 250;
	$window.scroll(function(){
		if($window.scrollTop() > offset.top - 250){
			$miao1.stop().animate({marginTop: $window.scrollTop() - offset.top + topPadding});
			$miao2.stop().animate({marginTop: $window.scrollTop() - offset.top + topPadding});
		}else{
			$miao1.stop().animate({marginTop: 50});
			$miao2.stop().animate({marginTop: 50});
		}
	});
});

// 显示联系信息入口函数
$(".contact").hide();
$(".public").hide();
$(document).ready(function(){
	$(".miao-right").mouseenter(function(){
		$(".contact").fadeIn(300);
		$(".miao-right").attr("src","./image/miao3.png");
	});
	$(".miao-right").mouseleave(function(){
		$(".contact").fadeOut(300);
		$(".miao-right").attr("src","./image/miao2.png");
	});

	$(".miao-left").mouseenter(function(){
		$(".public").fadeIn(300);
		$(".miao-left").attr("src","./image/miao1.png");
	});
	$(".miao-left").mouseleave(function(){
		$(".public").fadeOut(300);
		$(".miao-left").attr("src","./image/miao0.png");
	});
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
		}
	});
	delCookie("status");
});