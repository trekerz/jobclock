$(document).ready(function(){
	$(".head-card-item").click(function(){
		var month = parseInt($(this).children()[0].innerHTML);
		var date = parseInt($(this).children()[1].innerHTML);
		$.ajax({
			type:"POST",
			url: "getdata.php?action=getdata",
			dataType:"json",
			data:{"month":month,"date":date},
			beforeSend: function(){

			},
			success: function(json){
				if(json.success == 1){
					console.log("get!");
				}else{
					console.log("didn't get!");
				}
			}
		});
	});
});