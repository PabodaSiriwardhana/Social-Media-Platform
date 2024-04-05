<?php

    require_once "../config/db-con.php";

    $postId = trim(mysqli_real_escape_string($db_con, $_POST["postId"]));

     //get data from table
     $sql_create_post =$db_con-> prepare("SELECT postId FROM posts");
 
     if ($sql_create_post->execute() === TRUE) {

        $result = $sql_create_post->get_result();
    
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
                "message" => "noRow",
                "postId" => $postId
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