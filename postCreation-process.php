<?php

    require_once "config/db-con.php";


    $postTxt = trim(mysqli_real_escape_string($db_con, $_POST["postTxt"]));
    $profileId = trim(mysqli_real_escape_string($db_con, $_POST["profileId"]));
    $fullName = trim(mysqli_real_escape_string($db_con, $_POST["fullName"]));
    $profilePic = trim(mysqli_real_escape_string($db_con, $_POST["profilePic"]));

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

        $response = array(
            "message" => "empty"
        );

        $json_response = json_encode($response);

        echo $json_response;
    }
    else{

        //insert data into table
        $sql_create_post =$db_con-> prepare("INSERT INTO posts(text, image, dateTime, profileId, fullName, profilePic)
        VALUES (?, ?, ?, ?, ?, ?)");
        $sql_create_post->bind_param('ssssss', $postTxt, $postImg, $lkDateTime1, $profileId, $fullName, $profilePic);

        $postTxt = $postTxt;
        $postImg = $postImg; 
        $lkDateTime1 = $lkDateTime1;
        $profileId = $profileId;
        $fullName = $fullName;
        $profilePic = $profilePic;

        if ($sql_create_post->execute() === TRUE) {

            $last_id = mysqli_insert_id($db_con);

            $response = array(
                "message" => "postCreated",
                "newPostId" => $last_id
            );

            $json_response = json_encode($response);

            echo $json_response;

        } else {

            $response = array(
                "message" => "error"
            );

            $json_response = json_encode($response);

            echo $json_response;
        }

    }


?>