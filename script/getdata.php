<?php
	header("Content-Type: text/plain;charset=utf-8");

	// 屏蔽警告
	error_reporting(0);

	// 构造json格式数据的函数
	function jsonFactory($source,$index){
		$i = 0;
		$character = "";

		switch ($index) {
			case 1: $character="company";break;
			case 2: $character="type";break;
			case 3: $character="tick";break;
			case 4: $character="site";break;
			default: break;
		}

		// 循环取出记录
		while($row = mysql_fetch_row($source)){
			$arr[$i] = $row[0];
			$i++;
		}

		// 构造json格式数据并发送
		$mJson = '"'.$character.'":{';
		for($i=0; $i<count($arr); $i++){
			if($i !== count($arr) - 1){
				$mJson = $mJson.'"'.$character.($i+1).'":"'.$arr[$i].'",';
			}else{
				$mJson = $mJson.'"'.$character.($i+1).'":"'.$arr[$i].'"}';
			}
		}

		return $mJson;
	}
	
	// 定义数据库参数
	$server_name = "127.0.0.1:3306";
	$server_username = "root";
	$server_password = "root";
	$database = "job";
	
	// 入口
	if($_POST["request"]){
		$dateRequested = $_POST["request"];
		$sql_setchar = "set names 'utf-8'";
		$sql_company = "SELECT company FROM `".$dateRequested."`";
		$sql_type = "SELECT type FROM `".$dateRequested."`";
		$sql_tick = "SELECT tick FROM `".$dateRequested."`";
		$sql_site = "SELECT site FROM `".$dateRequested."`";

		// 连接
		$connect = mysql_connect($server_name , $server_username , $server_password);
		mysql_query($sql_setchar,$connect);

		// 查询
		$company = mysql_db_query($database, $sql_company, $connect);
		$type = mysql_db_query($database, $sql_type, $connect);
		$tick = mysql_db_query($database, $sql_tick, $connect);
		$site = mysql_db_query($database, $sql_site, $connect);

		if(!empty($company) || !empty($type) || !empty($tick) || !empty($site)){
			// 构造和发送json
			echo '{"success":true,"db":true,'.jsonFactory($company,1).','.jsonFactory($type,2).','.jsonFactory($tick,3).','.jsonFactory($site,4).'}';
		}else{
			// 数据表为空的情况
			echo '{"success":true,"db":false}';
		}
		

		// 释放资源
		mysql_free_result($company);
		mysql_free_result($type);
		mysql_free_result($tick);
		mysql_free_result($site);
		mysql_close($connect);
	}
?>