<?php

	include 'simple_html_dom.php';

	// Create DOM from URL or file
$html = file_get_html('http://www.bomberosperu.gob.pe/po_diario.asp');

// Find all images 

$images = $html->find('img');

/*
foreach( $images as $element) { 
  print $element->src;

}

*/

// Find all links 

$link = $html->find('div[align=left] span.tITULO');

foreach($link as $element) {
  print_r($element);
}