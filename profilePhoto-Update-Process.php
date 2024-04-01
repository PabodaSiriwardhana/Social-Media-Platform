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
    $sql_create_post =$db_con-> prepare("UPDATE users SET profilePic = ? WHERE profileId = ?");
    $sql_create_post->bind_param('ss', $proPic, $profileId);

    $proPic = $proPic;
    $profileId = $profileId;

    if ($sql_create_post->execute() === TRUE) {

        $response = array(
            "message" => "proPicUpdated",
            "proPicImgPath" => $proPicImgPath,
            "proId" => $profileId
        );
        
        $json_response = json_encode($response);
        
        echo $json_response;

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