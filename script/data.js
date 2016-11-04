/**
* 根据请求从后台获取数据并构建前端显示模型
* 
* 1.判断所请求函数是否存在于sessionStorage中
* 	ifStored(date)
* 2.缓冲等待动画（网络不好时作用大些）
* 	showLoading()
* 3.接收数据时执行
* 	dataReceiving(month,date,result)
* 4.检测到数据在sessionStorage，取出复用
* 	dataReuse(storedData)
* 5.框架构建相应日期的信息
* 	showResult(result)
* 6.数据表为空时显示的为空提示信息
* 	showEmpty(month,date)
* 	
*/

// 全局变量
var sStorage = window.sessionStorage;

// 判断数据在sessionStorage中是否存在
function ifStored(date){
	try {
		var data = sStorage.getItem(date);
	}catch (e){
		console.log("数据读取失败:"+e);
	}
	
	if(data){
		return data;
	}else{
		return false;
	}
}

// 缓冲等待动画（网络不好时作用大些）
function showLoading(){
	$(".main-content").children().remove();
	var pngToShow = "<img src='./image/clock.png' alt='Loading...' class='head-logo loading-logo'><p>加载中......</p>";
	$("<div class='main-info-loading'></div>").appendTo(".main-content");
	$("<div class='main-info-loading-inner'></div>").appendTo(".main-info-loading").html(pngToShow);
}

// 接收数据时执行
function dataReceiving(month,date,result){
	if(result.success){
		if(result.db){
			showResult(result);
		}else{
			showEmpty(month,date);
		}

		try {
			sStorage.setItem(month+date,JSON.stringify(result));
		}
		catch (e){
			console.log("新数据存储失败:"+e);
		}
	}else{
		alert("数据传输出错，请刷新重试。");
	}
}

// 检测到数据在sessionStorage，直接复用
function dataReuse(storedData,month,date){
	var data = JSON.parse(storedData);
	if(data.db){
		showResult(data);
	}else{
		showEmpty(month,date);
	}
	console.log("来自sessionStorage的数据");
}

// 框架构建相应日期的信息
function showResult(result){
	$(".main-content").children().remove();
	var company = result.company,
	type = result.type,
	tick = result.tick,
	site = result.site,
	link = result.link,
	main_info = [],
	main_info_head = [],
	main_info_head_a = [],
	main_info_content1 = [],
	main_info_content2 = [],
	main_info_content3 = [];
	for(var i in company){

		// 渲染company
		main_info[i] = $("<div class='main-info'></div>").appendTo(".main-content");
		main_info_head[i] = $("<div class='main-info-head'></div>").appendTo(main_info[i]);
		main_info_content1[i] = $("<div class='main-info-content'></div>").appendTo(main_info[i]);
		main_info_content2[i] = $("<div class='main-info-content'></div>").appendTo(main_info[i]);
		main_info_content3[i] = $("<div class='main-info-content'></div>").appendTo(main_info[i]);
		main_info_head_a[i] = $("<a></a>").appendTo(main_info_head[i]);
		main_info_head_a[i].text(i+" . "+company[i]).stop().animate({marginLeft: "15px",opacity: 1},400);
		$("<span class='main-info-type'></span>").appendTo(main_info_content1[i]).text("类型");
		$("<span class='main-info-time'></span>").appendTo(main_info_content2[i]).text("时间");
		$("<span class='main-info-site'></span>").appendTo(main_info_content3[i]).text("地点");
		
		// 渲染type
		if(type[i] !== ""){
			$needToFixSize = $("<span class='main-info-inner'></span>").appendTo(main_info_content1[i]).text(type[i]);
			if(type[i].length > 35 && type[i].length <= 60){
				$needToFixSize.css("font-size","17px");
			}else if(type[i].length > 60){
				$needToFixSize.css("font-size","15px");
			}else{
				// 其它长度小于35的文本使用默认样式
			}
		}else{
			$("<span class='main-info-inner'></span>").appendTo(main_info_content1[i]).text("（无信息）");
		}

		// 渲染tick
		if(tick[i] !== ""){
			$("<span class='main-info-inner'></span>").appendTo(main_info_content2[i]).text(tick[i]);
		}else{
			$("<span class='main-info-inner'></span>").appendTo(main_info_content2[i]).text("（无信息）");
		}

		// 渲染site
		if(site[i] !== ""){
			$("<span class='main-info-inner'></span>").appendTo(main_info_content3[i]).text(site[i]);
		}else{
			$("<span class='main-info-inner'></span>").appendTo(main_info_content3[i]).text("（无信息）");
		}

		// 渲染link
		if(link[i] !== ""){
			var httpLink = "http://jyzx.6ihnep7.cas.scut.edu.cn/jyzx/newSystem/noticeDetail.jsp?id="+link[i];
			main_info_head_a[i].attr("href",httpLink);
		}else{
			// 没链接则不分配链接
		}

		var reg_site = /^.*五山.*$/; // 匹配校区使用不同颜色
		var reg_type = /^.*信|工|计科|不限.*$/; // 匹配专业使用不同颜色
		if(reg_site.test(site[i])){
			if(reg_type.test(type[i])){
				main_info_head[i].css("background-image","-webkit-gradient(linear,70% 0%, 100% 0%, from(#B9EFFF),color-stop(0.5,#67C0FF),to(#2DA8FF))");
			}else{
				main_info_head[i].css("background-color","#B9EFFF");
			}
		}else{
			if(reg_type.test(type[i])){
				main_info_head[i].css("background-image","-webkit-gradient(linear,70% 0%, 100% 0%, from(#EFFFEC),color-stop(0.5,#FFFF77),to(#FFFF15))");
			}else{
				main_info_head[i].css("background-color","#EFFFEC");
			}
		}

	}
}

// 数据表为空时显示的为空提示信息
function showEmpty(month,date){
	$(".main-content").children().remove();
	var messageToShow = month+"月"+date+"日<br/><br/><hr style='border-top:#ccc dashed 4px;'/><br/>没有宣讲会信息";
	$("<div class='main-info-empty'></div>").appendTo(".main-content");
	$("<div class='main-info-empty-inner'></div>").appendTo(".main-info-empty").html(messageToShow);

	$messageToShow = $(".main-info-empty-inner");
	$messageToShow.stop().animate({paddingTop: "15%",opacity: 1.0});
}



// 信息显示入口函数
$(document).ready(function(){
	$hasClassHovered = $(".hovered").html(); // 防重复点击而导致过多http请求
	$(".head-card-item").click(function(){

		var month = $(this).children()[0].innerHTML;
		var date = $(this).children()[1].innerHTML;
		var dateToSend = month + date;

		if(!($(this).html() == $hasClassHovered)){

			// 检查sessionStorage里有没有请求的数据
			var storedData = ifStored(dateToSend);
			if(storedData === false){
				showLoading();
				$.ajax({
					type:"POST",
					async: true,
					url: "script/getdata.php",
					dataType:"json",
					data:{"request":dateToSend},
					success: function(result){
						dataReceiving(month,date,result);
					}
				});
			}else{
				dataReuse(storedData,month,date);
			}

		}else{
			// 重复选择时不发送ajax
		}
		slidingDate(month,date);

		$hasClassHovered = $(this).html();
	});
});