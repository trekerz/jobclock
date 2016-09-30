<?php
	header("Content-Type: text/plain;charset=utf-8");

	// 屏蔽警告
	error_reporting(0);

	// 构造json格式数据的函数
	function jsonFactory($source,$num){
		// 循环取出记录
		$i = 0;
		$character = "";

		while($row=mysql_fetch_row($source)){
			$arr[$i] = $row[0];
			$i++;
		}

		switch ($num) {
			case 1: $character="company";break;
			case 2: $character="type";break;
			case 3: $character="tick";break;
			case 4: $character="site";break;
			default: break;
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
		$sql_company = "SELECT company FROM `928`";
		$sql_type = "SELECT type FROM `928`";
		$sql_tick = "SELECT tick FROM `928`";
		$sql_site = "SELECT site FROM `928`";

		// 连接
		$connect = mysql_connect($server_name , $server_username , $server_password);
		mysql_query($sql_setchar,$connect);
		$db = mysql_select_db($database,$connect);

		// 查询
		$company = mysql_db_query($database, $sql_company, $connect);
		$type = mysql_db_query($database, $sql_type, $connect);
		$tick = mysql_db_query($database, $sql_tick, $connect);
		$site = mysql_db_query($database, $sql_site, $connect);

		// 构造和发送json
		echo '{"success":true,'.jsonFactory($company,1).','.jsonFactory($type,2).','.jsonFactory($tick,3).','.jsonFactory($site,4).'}';

		// 释放资源
		mysql_free_result($company);
		mysql_close($connect);
	}
?>