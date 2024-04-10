<?php

    require_once "../config/db-con.php";

    if (isset($_POST["deletediImageName"])){
        $deletediImageName = trim(mysqli_real_escape_string($db_con, $_POST["deletediImageName"]));
    }
    if (isset($_POST["deletedProPic"])){
        $deletedProPic = trim(mysqli_real_escape_string($db_con, $_POST["deletedProPic"]));
    }

    if (isset($deletediImageName)){

        $file_path = "../postImg/".$deletediImageName;

        unlink($file_path);
    }
    if (isset($deletedProPic)){

        if ($deletedProPic!="default-profile-photo.png") {
            
            $file_path = "../profilePhotoImg/".$deletedProPic;

            unlink($file_path);
        }
    }
?>