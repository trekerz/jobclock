// 显示相应日期的信息
function showResult(company,type,tick,site){
	$(".main-content").children().remove();
	var i = 0;
	var main_info = [];
	var main_info_head = [];
	var main_info_content1 = [];
	var main_info_content2 = [];
	var main_info_content3 = [];
	for(var item in company){
		main_info[i] = $("<div class='main-info'></div>").appendTo(".main-content");
		main_info_head[i] = $("<div class='main-info-head'></div>").appendTo(main_info[i]);
		main_info_content1[i] = $("<div class='main-info-content'></div>").appendTo(main_info[i]);
		main_info_content2[i] = $("<div class='main-info-content'></div>").appendTo(main_info[i]);
		main_info_content3[i] = $("<div class='main-info-content'></div>").appendTo(main_info[i]);
		$("<span></span>").appendTo(main_info_head[i]).text(company[item]);
		$("<span class='main-info-type'></span>").appendTo(main_info_content1[i]).text("类型");
		$("<span class='main-info-time'></span>").appendTo(main_info_content2[i]).text("时间");
		$("<span class='main-info-site'></span>").appendTo(main_info_content3[i]).text("地点");
		i++;
	}
	i = 0;
	for(var item in type){
		$("<span class='main-info-inner'></span>").appendTo(main_info_content1[i]).text(type[item]);
		i++;
	}
	i = 0;
	for(var item in tick){
		$("<span class='main-info-inner'></span>").appendTo(main_info_content2[i]).text(tick[item]);
		i++;
	}
	i = 0;
	for(var item in site){
		$("<span class='main-info-inner'></span>").appendTo(main_info_content3[i]).text(site[item]);
		i++;
	}
}

// 数据表为空时显示的为空提示信息
function showEmpty(month,date){
	$(".main-content").children().remove();
	var messageToShow = month+"月"+date+"日<br/><br/><hr style='width:60%;margin-left:20%;border-top:#ccc dashed 4px;'/><br/>没有宣讲会信息";
	$("<div class='main-info-empty'></div>").appendTo(".main-content").html(messageToShow);
}

// 信息显示入口函数
$(document).ready(function(){
	$hasClassHovered = $(".hovered").html(); // 防重复点击而导致过多http请求
	$(".head-card-item").click(function(){
		if(!($(this).html() == $hasClassHovered)){
			var month = $(this).children()[0].innerHTML;
			var date = $(this).children()[1].innerHTML;
			var dateToSend = month + date;
			$.ajax({
				type:"POST",
				url: "script/getdata.php",
				dataType:"json",
				data:{"request":dateToSend},
				success: function(result){
					if(result.success){
						if(result.db){
							showResult(result.company,result.type,result.tick,result.site);
						}else{
							showEmpty(month,date);
						}
					}else{
						alert("数据传输出错，请刷新重试。");
					}
				}
			});
		}else{
			console.log("重复点击~"); // 重复点击时不发送ajax
		}
		$hasClassHovered = $(this).html();
	});
});