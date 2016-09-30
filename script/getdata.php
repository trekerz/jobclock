<?php
	$connect = new mysqli("127.0.0.1:8080","root","root","job");
	$result = $connect->query("SELECT * FROM '926'");
	$row = $result->fetch_assoc();
	echo htmlentities($row['_message']);
?>