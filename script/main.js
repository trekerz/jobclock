

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

// 显示联系信息
$(".contact").hide();
$(document).ready(function(){
	$(".miao-right").mouseenter(function(){
		$(".contact").fadeIn(300);
		$(".miao-right").attr("src","./image/miao3.png");
	});
	$(".miao-right").mouseleave(function(){
		$(".contact").fadeOut(300);
		$(".miao-right").attr("src","./image/miao2.png");
	});
});