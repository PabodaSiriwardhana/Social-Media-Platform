<?php

    require_once "../config/db-con.php";

    if (isset($_POST["postId"])){
        $postId = trim(mysqli_real_escape_string($db_con, $_POST["postId"]));
    }

    

    if (isset($postId)){
        //get data from table
        $sql_get_post =$db_con-> prepare("SELECT * FROM posts WHERE postId = ?");
        $sql_get_post->bind_param('s', $postId);

        $postId = $postId;

        if ($sql_get_post->execute() === TRUE) {

            $result = $sql_get_post->get_result();
        
            if ($result->num_rows > 0) {

                $row = $result->fetch_assoc();

                $imgName = $row['image'];
                

                //delete data from table
                $sql_delete_post =$db_con-> prepare("DELETE FROM posts WHERE postId = ?");
                $sql_delete_post->bind_param('s', $postId);

                $postId = $postId;
            
                if ($sql_delete_post->execute() === TRUE) {
                        
                    $response = array(
                        "message" => "postDeleted",
                        "deletedPostId" => $postId,
                        "deletediImageName" => $imgName
                    );

                    $json_response = json_encode($response);

                    echo $json_response;
            
                } 
                else {
            
                    $response = array(
                        "message" => "error"
                    );

                    $json_response = json_encode($response);

                    echo $json_response;
                }
            }
        }
    }


?>