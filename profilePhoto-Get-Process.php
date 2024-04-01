<?php

    require_once "config/db-con.php";


    $profileId = trim(mysqli_real_escape_string($db_con, $_POST["profileId"]));

    $get_directory = "profilePhotoImg/";

     //get data from table
     $sql_create_post =$db_con-> prepare("SELECT * FROM users WHERE profileId = ?");
     $sql_create_post->bind_param('s', $profileId);
 
     $profileId = $profileId;
 
     if ($sql_create_post->execute() === TRUE) {

        $result = $sql_create_post->get_result();
    
        if ($result->num_rows > 0) {

            $row = $result->fetch_assoc();
            
            $proPicImgPath = $get_directory.$row['profilePic'];
            $proId = $row['profileId'];

            $response = array(
                "message" => "gotProPic",
                "proPicImgPath" => $proPicImgPath,
                "proId" => $proId
            );

            $json_response = json_encode($response);

            echo $json_response;

        }
        else{
            echo "error";
        }
 
     } else {
 
         echo "error";
     }

?>