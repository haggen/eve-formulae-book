<?php

header('Content-Type: application/json; charset=utf-8');

$source = file_get_contents($file);
$data = json_decode($source, true);

function find($data, $fn) {
  foreach($data as $i) {
    if($fn($i)) return [$i];
  }
}

if(isset($_GET['name'])) {
  $data = find($data, function($type) {
    return $type['name'] == $_GET['name'];
  });
}

if(isset($_GET['id'])) {
  $data = find($data, function($type) {
    return $type['id'] == $_GET['id'];
  });
}

echo json_encode($data);
