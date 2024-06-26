<?php

    require_once "../config/db-con.php";

    if (isset($_POST["postId"])){
        $postId = trim(mysqli_real_escape_string($db_con, $_POST["postId"]));
    }
    if (isset($_POST["profileId"])){
        $profileId = trim(mysqli_real_escape_string($db_con, $_POST["profileId"]));
    }
    if (isset($_POST["likedProfileId"])){
        $likedProfileId = trim(mysqli_real_escape_string($db_con, $_POST["likedProfileId"]));
    }
    if (isset($_POST["checkProfileId"])){
        $checkProfileId = trim(mysqli_real_escape_string($db_con, $_POST["checkProfileId"]));
    }

    if (isset($profileId)) {
        //insert data into table
        $sql_create_postlike =$db_con-> prepare("INSERT INTO postlike (postId, profileId)  VALUES (?, ?)");
        $sql_create_postlike->bind_param('ss', $postId, $profileId);
    
        $postId = $postId;
        $profileId = $profileId;
    
        if ($sql_create_postlike->execute() === TRUE) {
        
            $response = array(
                "message" => "postlikeRowInserted",
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
    if (isset($likedProfileId)){
        //delete data from table
        $sql_delete_postlike =$db_con-> prepare("DELETE FROM postlike WHERE postId = ? AND profileId = ?");
        $sql_delete_postlike->bind_param('ss', $postId, $likedProfileId);

        $postId = $postId;
        $likedProfileId = $likedProfileId;
    
        if ($sql_delete_postlike->execute() === TRUE) {
        
            $response = array(
                "message" => "postlikeRowDeleted",
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
    if (isset($checkProfileId)){
        //get data from table
        $sql_get_postlike =$db_con-> prepare("SELECT postId FROM postlike WHERE profileId = ?");
        $sql_get_postlike->bind_param('s', $checkProfileId);

        $checkProfileId = $checkProfileId;
    
        if ($sql_get_postlike->execute() === TRUE) {
        
            $result = $sql_get_postlike->get_result();
    
            if ($result->num_rows > 0) {
    
                while($row = $result->fetch_assoc()) {
                    $ids[] = $row['postId'];
                }
    
                $response = array(
                    "message" => "gotArray",
                    "postIdArray" => $ids
                );
    
                $json_response = json_encode($response);
    
                echo $json_response;
            }
            else{
                $response = array(
                    "message" => "noPostLikes"
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
    }
    

     

?>