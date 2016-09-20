// hover和click日期后发生的动画
var currentClicked = $(".hovered");
var clickedOrNot = false;

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

$(".head-card-item").hover(hoverinItem,hoveroutItem);
$(".head-card-item").click(clickItem);