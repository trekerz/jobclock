<?php
	/**
	* 获取请求，查找数据库并返回数据
	* 根据cookie计数访问次数
	* 
	* 1.jsonFactory($source,$index)
	* 2.visitedCount($cookie_get,$connect,$database)
	* 
	*/

	header("Content-Type: text/plain;charset=utf-8");
	include "../include/config.inc.php";

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
			case 5: $character="link";break;
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

	// 获取并返回访问次数（注意$connect和$database要当做参数引用进来）
	function visitedCount($cookie_get,$connect,$database){
		$visited = mysql_db_query($database, "SELECT count FROM visited", $connect);
		$oldValue = mysql_fetch_row($visited)[0];
		mysql_free_result($visited);
		if($cookie_get == "visited"){
			$newValue = $oldValue + 1;
			mysql_db_query($database, "UPDATE visited SET count=".$newValue, $connect);
			return $newValue;
		}else{
			return $oldValue;
		}
	}
	
	// 入口
	if($_POST["request"]){

		// 获取cookie
		$cookie_get = $_COOKIE["status"];

		// 获取ajax数据
		$dateRequested = $_POST["request"];
		$sql_setchar = "set names 'utf-8'";
		$sql_company = "SELECT company FROM `".$dateRequested."`";
		$sql_type = "SELECT type FROM `".$dateRequested."`";
		$sql_tick = "SELECT tick FROM `".$dateRequested."`";
		$sql_site = "SELECT site FROM `".$dateRequested."`";
		$sql_link = "SELECT link FROM `".$dateRequested."`";

		// 连接
		$connect = mysql_connect($server_name , $server_username , $server_password);
		mysql_db_query($sql_setchar,$connect);

		// 查询
		$company = mysql_db_query($database, $sql_company, $connect);
		$type = mysql_db_query($database, $sql_type, $connect);
		$tick = mysql_db_query($database, $sql_tick, $connect);
		$site = mysql_db_query($database, $sql_site, $connect);
		$link = mysql_db_query($database, $sql_link, $connect);


		// 输出
		if(!empty($company) || !empty($type) || !empty($tick) || !empty($site) || !empty($link)){
			// 构造和发送json
			echo '{"success":true,"db":true,'.jsonFactory($company,1).','.jsonFactory($type,2).','.jsonFactory($tick,3).','.jsonFactory($site,4).','.jsonFactory($link,5).',"visited":'.visitedCount($cookie_get,$connect,$database).'}';
		}else{
			// 数据表为空的情况
			echo '{"success":true,"db":false,"visited":'.visitedCount($cookie_get,$connect,$database).'}';
		}
		
		// 释放资源
		mysql_free_result($company);
		mysql_free_result($type);
		mysql_free_result($tick);
		mysql_free_result($site);
		mysql_close($connect);
	}
?>