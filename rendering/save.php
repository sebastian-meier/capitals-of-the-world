<?php

if( isset($_POST["content"]) && !empty($_POST["content"]) && isset($_POST["name"]) && !empty($_POST["name"]) ) {
	if(strpos($_POST["name"], "png")){
		$dataURL = $_POST["content"];
		$parts = explode(',', $dataURL);
		$data = $parts[1];
		$encodedData = str_replace(' ','+',$data);
		$data = base64_decode($encodedData);
		$fp = fopen("./canvas-export/".$_POST["name"], 'w');
		fwrite($fp, $data);
		fclose($fp);
	}else{
		$fp = fopen("./canvas-export/".$_POST["name"], 'w');
		fwrite($fp, $_POST["content"]);
		fclose($fp);
	}
}

?>
