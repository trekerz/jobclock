// 显示相应日期的信息
function showResult(company,type,tick,site){
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
	var i = 0;
	for(var item in type){
		$("<span class='main-info-inner'></span>").appendTo(main_info_content1[i]).text(type[item]);
		i++;
	}
	var i = 0;
	for(var item in tick){
		$("<span class='main-info-inner'></span>").appendTo(main_info_content2[i]).text(tick[item]);
		i++;
	}
	var i = 0;
	for(var item in site){
		$("<span class='main-info-inner'></span>").appendTo(main_info_content3[i]).text(site[item]);
		i++;
	}
}

// 信息显示入口函数
$(document).ready(function(){
	$(".head-card-item").click(function(){
		var month = $(this).children()[0].innerHTML;
		var date = $(this).children()[1].innerHTML;
		var dateToSend = month + date;
		console.log(dateToSend);
		$.ajax({
			type:"POST",
			url: "script/getdata.php",
			dataType:"json",
			data:{"request":dateToSend},
			success: function(result){
				if(result.success){
					showResult(result.company,result.type,result.tick,result.site);
				}else{
					alert("数据传输出错，请刷新重试。");
				}
			}
		});
	});
});