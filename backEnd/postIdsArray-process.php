<?php

    require_once "../config/db-con.php";

    if (isset($_POST["profileId"])){
        $profileId = trim(mysqli_real_escape_string($db_con, $_POST["profileId"]));
    }

    if (isset($profileId)) {
        
        //get data from Posts table by profileId
        $sql_get_post_by_proid =$db_con-> prepare("SELECT postId FROM posts WHERE profileId = ?");

        $sql_get_post_by_proid->bind_param('s', $profileId);
 
        $profileId = $profileId;
    
        if ($sql_get_post_by_proid->execute() === TRUE) {

            $result = $sql_get_post_by_proid->get_result();
        
            if ($result->num_rows > 0) {

                while($row = $result->fetch_assoc()) {
                    $idsArray[] = $row['postId'];
                }

                $response = array(
                    "message" => "gotArray",
                    "idsArray" => $idsArray
                );

                $json_response = json_encode($response);

                echo $json_response;

            }
            else{
                $response = array(
                    "message" => "noPosts"
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
    else {

        //get all data from Posts table
        $sql_get_post =$db_con-> prepare("SELECT postId FROM posts");
    
        if ($sql_get_post->execute() === TRUE) {

            $result = $sql_get_post->get_result();
        
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
                    "message" => "noPosts"
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