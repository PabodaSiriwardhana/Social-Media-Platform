<?php

    require_once "../config/db-con.php";

    if (isset($_POST["profileId"])){
        $profileId = trim(mysqli_real_escape_string($db_con, $_POST["profileId"]));
    }
    if (isset($_POST["password"])){
        $password = trim(mysqli_real_escape_string($db_con, $_POST["password"]));
    }


    if (isset($password)){

        $sql_check_password = $db_con-> prepare("SELECT * FROM users WHERE profileId = ?");
        $sql_check_password->bind_param('s', $profileId);
        $sql_check_password->execute();
        $check_email_result = $sql_check_password->get_result();

        if ($check_email_result->num_rows > 0) {
            
            $user_data_row = $check_email_result->fetch_assoc();

            $userdb_password = $user_data_row['password'];

            $pw_verfication = password_verify($password, $userdb_password);

            if($pw_verfication == true){

                //delete data from Posts table
                $sql_delete_post =$db_con-> prepare("DELETE FROM users WHERE profileId = ?");
                $sql_delete_post->bind_param('s', $profileId);

                $profileId = $profileId;
            
                if ($sql_delete_post->execute() === TRUE) {

                    //delete data from Comments table
                    $sql_delete_post_comments =$db_con-> prepare("DELETE FROM postcomment WHERE profileId = ?");
                    $sql_delete_post_comments->bind_param('s', $profileId);

                    $profileId = $profileId;

                    $sql_delete_post_comments->execute();

                    //delete data from Likes table
                    $sql_delete_post_comments =$db_con-> prepare("DELETE FROM postlike WHERE profileId = ?");
                    $sql_delete_post_comments->bind_param('s', $profileId);

                    $profileId = $profileId;

                    $sql_delete_post_comments->execute();
                        
                    $response = array(
                        "message" => "accountDeleted"
                    );

                    //delete data from Posts table
                    $sql_delete_post_posts =$db_con-> prepare("DELETE FROM posts WHERE profileId = ?");
                    $sql_delete_post_posts->bind_param('s', $profileId);

                    $profileId = $profileId;

                    $sql_delete_post_posts->execute();
                        
                    $response = array(
                        "message" => "accountDeleted"
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
            else{

                $response = array(
                    "message" => "pwIncorrect"
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
            "message" => "empty"
        );

        $json_response = json_encode($response);

        echo $json_response;
    }

?>