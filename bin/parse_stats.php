<?php

define("SOURCE_DIR", "/var/log/sysstat");

$chartData = array();

foreach (scandir(SOURCE_DIR) as $file) {

	if (!preg_match('/^sa\\d+$/', $file)) {
		continue;
	}

	$path = SOURCE_DIR . '/' . $file;
	$data = `sadf -d $path`;
	$lines = explode("\n", $data);

	// Remove header
	unset($lines[0]);

	// Line pattern:
	// # hostname;interval;timestamp;CPU;%user;%nice;%system;%iowait;%steal;%idle

	foreach ($lines as $line) {
		if (empty($line)) {
			continue;
		}

		$values = explode(";", $line);
		$timestamp = strtotime($values[2]);
		$values = array_slice($values, 4);

		foreach($values as &$value) {
			$value = (float) $value;
		}
		unset($value);

		$chartData[$timestamp] = $values;
	}

}

ksort($chartData);

echo json_encode($chartData);

