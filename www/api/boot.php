<?php

$apiServerUrl = $_SERVER["DOCUMENT_ROOT"]."/api/";
$apiKey = "68d2f8e1-b824-968d-d5d692017f03";
$compId = 1204;
$url = "http://football-api.com/api/?Action=";
$fromDate = date('d.m.Y');
// get fixture data 30 days from now
$toDate = date("d.m.Y",strtotime("+1 month"));

// setup api urls
$standingsUrl = $url . "standings&APIKey=" . $apiKey . "&comp_id=" . $compId;
$fixturesUrl = $url . "fixtures&APIKey=" . $apiKey . "&comp_id=" . $compId . "&from_date=" . $fromDate . "&to_date=" . $toDate;

// files

$apiFiles = array("standings", "fixtures");
$filesLength = count($apiFiles);

// caching the api to local json files

for($f=0; $f<$filesLength;$f++){

  $currentFileName = $apiFiles[$f] . ".json";
  $fileLocation = $apiServerUrl . $currentFileName;

  // if file is older than 10 days
  if(file_exists($fileLocation) && time() - filemtime($fileLocation)>864000000){
    $apiUrl = $apiFiles[$f] . "Url";
    $data = file_get_contents($$apiUrl);
    file_put_contents($fileLocation, $data);
  // file is here and ready to serve
  }else if(file_exists($fileLocation)){
    // Good to go, no need to do anything.
  }else{
  // file doesn't exist, create the file and push data
    $apiUrl = $apiFiles[$f] . "Url";
    $data = file_get_contents($$apiUrl);
    file_put_contents($fileLocation, $data);
   }
}

?>
