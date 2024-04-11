<?php

    require_once "../config/db-con.php";

    if (isset($_POST["postId"])){
        $postId = trim(mysqli_real_escape_string($db_con, $_POST["postId"]));
    }
    if (isset($_POST["postIdforTextEdit"])){
        $postIdforTextEdit = trim(mysqli_real_escape_string($db_con, $_POST["postIdforTextEdit"]));
    }
    if (isset($_POST["updatedPostText"])){
        $updatedPostText = trim(mysqli_real_escape_string($db_con, $_POST["updatedPostText"]));
    }
    if (isset($_POST["postIdforupdatedText"])){
        $postIdforupdatedText = trim(mysqli_real_escape_string($db_con, $_POST["postIdforupdatedText"]));
    }

    

    if (isset($postId)){
        //get data from Posts table
        $sql_get_post =$db_con-> prepare("SELECT * FROM posts WHERE postId = ?");
        $sql_get_post->bind_param('s', $postId);

        $postId = $postId;

        if ($sql_get_post->execute() === TRUE) {

            $result = $sql_get_post->get_result();
        
            if ($result->num_rows > 0) {

                $row = $result->fetch_assoc();

                $imgName = $row['image'];
                

                //delete data from Posts table
                $sql_delete_post =$db_con-> prepare("DELETE FROM posts WHERE postId = ?");
                $sql_delete_post->bind_param('s', $postId);

                $postId = $postId;
            
                if ($sql_delete_post->execute() === TRUE) {

                    //delete data from Comments table
                    $sql_delete_post_comments =$db_con-> prepare("DELETE FROM postcomment WHERE postId = ?");
                    $sql_delete_post_comments->bind_param('s', $postId);

                    $postId = $postId;

                    $sql_delete_post_comments->execute();

                    //delete data from Likes table
                    $sql_delete_post_comments =$db_con-> prepare("DELETE FROM postlike WHERE postId = ?");
                    $sql_delete_post_comments->bind_param('s', $postId);

                    $postId = $postId;

                    $sql_delete_post_comments->execute();
                        
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
            else {
            
                $response = array(
                    "message" => "error"
                );

                $json_response = json_encode($response);

                echo $json_response;
            }
        }
        else {
            
            $response = array(
                "message" => "error"
            );

            $json_response = json_encode($response);

            echo $json_response;
        }
    }

    if (isset($postIdforTextEdit)){
        //get data from Posts table
        $sql_get_posttext =$db_con-> prepare("SELECT * FROM posts WHERE postId = ?");
        $sql_get_posttext->bind_param('s', $postIdforTextEdit);

        $postIdforTextEdit = $postIdforTextEdit;

        if ($sql_get_posttext->execute() === TRUE) {

            $result = $sql_get_posttext->get_result();
        
            if ($result->num_rows > 0) {

                $row = $result->fetch_assoc();

                $postText = $row['text'];

                if ($postText !== NULL || $postText !== "") {
                    
                    $response = array(
                        "message" => "gotPostText",
                        "postId" => $postIdforTextEdit,
                        "existPostText" => $postText
                    );
    
                    $json_response = json_encode($response);
    
                    echo $json_response;

                } else {
                    
                    $response = array(
                        "message" => "emptyPostText",
                        "postId" => $postIdforTextEdit
                    );
    
                    $json_response = json_encode($response);
    
                    echo $json_response;
                }
            }
            else {
            
                $response = array(
                    "message" => "error"
                );

                $json_response = json_encode($response);

                echo $json_response;
            }
        }
        else {
            
            $response = array(
                "message" => "error"
            );

            $json_response = json_encode($response);

            echo $json_response;
        }
    }

    if (isset($updatedPostText)){
        //update data in Posts table
        $sql_get_posttext =$db_con-> prepare("UPDATE posts SET text = ? WHERE postId = ?");
        $sql_get_posttext->bind_param('ss', $updatedPostText, $postIdforupdatedText);

        $updatedPostText = $updatedPostText;
        $postIdforupdatedText = $postIdforupdatedText;

        if ($sql_get_posttext->execute() === TRUE) {

            $response = array(
                "message" => "postTextUpdated",
                "updatedPostText" => $updatedPostText,
                "postId" => $postIdforupdatedText
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


?>