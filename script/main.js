

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



$(document).ready(function(){
	$(".head-card-item").hover(hoverinItem,hoveroutItem);
	$(".head-card-item").click(clickItem);
});