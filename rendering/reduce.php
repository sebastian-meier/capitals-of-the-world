<?php

	$name = $_POST["url"];
	$img = imagecreatefrompng($name);
	imageAlphaBlending($img, true);
	imageSaveAlpha($img, true);
	imagepng($img, $name);

?>
