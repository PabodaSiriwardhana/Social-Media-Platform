<?php

    require_once "../config/db-con.php";

    $postId = trim(mysqli_real_escape_string($db_con, $_POST["postId"]));

     //get data from table
     $sql_create_post =$db_con-> prepare("SELECT * FROM posts WHERE postId = ?");
     
     $sql_create_post->bind_param('s', $postId);
 
     $postId = $postId;
 
     if ($sql_create_post->execute() === TRUE) {

        $result = $sql_create_post->get_result();
    
        if ($result->num_rows > 0) {

            $row = $result->fetch_assoc();
            
            $postId = $row['postId'];
            $text = $row['text'];
            $image = $row['image'];
            $dateTime = $row['dateTime'];
            $fullName = $row['fullName'];
            $profilePic = $row['profilePic'];
            $profileId = $row['profileId'];

            $response = array(
                "message" => "gotPostDetails",
                "postId" => $postId,
                "text" => $text,
                "image" => $image,
                "dateTime" => $dateTime,
                "fullName" => $fullName,
                "profilePic" => $profilePic,
                "profileId" => $profileId
            );

            $json_response = json_encode($response);

            echo $json_response;

        }
        else{
            $response = array(
                "message" => "noRow"
            );

            $json_response = json_encode($response);

            echo $json_response;
        }
 
     } else {
 
        $response = array(
            "message" => "error"
        );

        $json_response = json_encode($response);

        echo $json_response;
     }

?>