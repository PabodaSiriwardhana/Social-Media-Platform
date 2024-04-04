<?php

require_once "config/db-con.php";

$target_directory = "profilePhotoImg/";

if (isset($_FILES["file"])) {

    $postImgname = trim(mysqli_real_escape_string($db_con,$_FILES["file"]["name"]));
    $profileId = trim(mysqli_real_escape_string($db_con,$_POST["profileId"]));

    $target_file = $target_directory.basename($_FILES["file"]["name"]); 
    $fileExtension = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $fileName = pathinfo($postImgname, PATHINFO_FILENAME);
    $proPic = $fileName."_".$lkDateTime2.".".$fileExtension;
    $proPicImgPath = $target_directory.$proPic;
    move_uploaded_file($_FILES["file"]["tmp_name"],$proPicImgPath);

    //update data into table
    $sql_update_propic =$db_con-> prepare("UPDATE users SET profilePic = ? WHERE profileId = ?");
    $sql_update_propic->bind_param('ss', $proPic, $profileId);

    $proPic = $proPic;
    $profileId = $profileId;

    if ($sql_update_propic->execute() === TRUE) {

        //update data into table
        $sql_update_propic_in_posts =$db_con-> prepare("UPDATE posts SET profilePic = ? WHERE profileId = ?");
        $sql_update_propic_in_posts->bind_param('ss', $proPic, $profileId);

        $proPic = $proPic;
        $profileId = $profileId;

        if ($sql_update_propic_in_posts->execute() === TRUE) {

            $response = array(
                "message" => "proPicUpdated",
                "proPicImgPath" => $proPicImgPath,
                "proId" => $profileId
            );
            
            $json_response = json_encode($response);
            
            echo $json_response;
        }
        else {

            $response = array(
                "message" => "error",
                "proId" => $profileId
            );
            
            $json_response = json_encode($response);
            
            echo $json_response;
        }


    } else {

        $response = array(
            "message" => "error",
            "proId" => $profileId
        );
        
        $json_response = json_encode($response);
        
        echo $json_response;
    }
}
else {

    $response = array(
        "message" => "error",
        "proId" => $profileId
    );
    
    $json_response = json_encode($response);
    
    echo $json_response;
}

?>