<?php

$domain = "http://localhost/pabz";

$servername = "localhost";
$username = "root";
$password = "";
$dbName = "pabzdb";

// Create connection
$db_con = new mysqli($servername, $username, $password, $dbName);

// Check connection
if ($db_con->connect_error) {
    header("location:$domain/error.php?emsg=Database Error!");
}

//Date Time Function
date_default_timezone_set('Asia/colombo');

$lkDateTime1 = date('Y-m-d H:i');
$lkDateTime2 = date('Y-m-d_H-i-s');

?>