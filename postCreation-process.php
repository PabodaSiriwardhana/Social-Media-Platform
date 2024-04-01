<?php

    require_once "config/db-con.php";


    $postTxt = trim(mysqli_real_escape_string($db_con, $_POST["postTxt"]));

    $target_directory = "postImg/";

    if (isset($_FILES["file"])) {
        $postImgname = trim(mysqli_real_escape_string($db_con,$_FILES["file"]["name"]));
        $target_file = $target_directory.basename($_FILES["file"]["name"]); 
        $fileExtension = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $fileName = pathinfo($postImgname, PATHINFO_FILENAME);
        $postImg = $fileName."_".$lkDateTime2.".".$fileExtension;
        $newfilename = $target_directory.$postImg;
        move_uploaded_file($_FILES["file"]["tmp_name"],$newfilename);
    }

    if ($postTxt=="") {
        $postTxt = null;
    }


    if (empty($postTxt) && empty($postImg)){

        echo "empty";
    }
    else{

        //insert data into table
        $sql_create_post =$db_con-> prepare("INSERT INTO posts(text, image, dateTime)
        VALUES (?, ?, ?)");
        $sql_create_post->bind_param('sss', $postTxt, $postImg, $lkDateTime1);

        $postTxt = $postTxt;
        $postImg = $postImg; 
        $lkDateTime1 = $lkDateTime1;

        if ($sql_create_post->execute() === TRUE) {

            echo "postCreated";

        } else {

            echo "error";
        }

    }


?>