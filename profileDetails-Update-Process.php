<?php

    require_once "config/db-con.php";

    $newFName = trim(mysqli_real_escape_string($db_con,$_POST["newFName"]) );
    $newSurame = trim(mysqli_real_escape_string($db_con, $_POST["newSurame"]));
    $newBday = trim(mysqli_real_escape_string($db_con, $_POST["newBday"]));
    $newGender = trim(mysqli_real_escape_string($db_con, $_POST["newGender"]));
    $newEmail = trim(mysqli_real_escape_string($db_con, $_POST["newEmail"]));
    $profileId = trim(mysqli_real_escape_string($db_con,$_POST["profileId"]));
    $fullName = $newFName." ".$newSurame;

    if (empty($newFName) || empty($newSurame) || empty($newBday) || empty($newEmail) || ($newGender == "null") ){

        $response = array(
            "message" => "empty",
            "proId" => $profileId
        );
        
        $json_response = json_encode($response);
        
        echo $json_response;
    }
    else{
        
        $sql_check_email = $db_con-> prepare("SELECT * FROM users WHERE profileId != ? AND email = ?");
        $sql_check_email->bind_param('ss', $profileId, $newEmail);
        $sql_check_email->execute();
        $check_email_result = $sql_check_email->get_result();
        if ($check_email_result->num_rows > 0) {
            
            $response = array(
                "message" => "exist",
                "proId" => $profileId
            );
            
            $json_response = json_encode($response);
            
            echo $json_response;
        }
        else{

            //update data in the table
            $sql_update_user = $db_con-> prepare("UPDATE users SET firstName = ?, surname = ?, birthday = ?, gender = ?, email = ? WHERE profileId = ?");
            $sql_update_user->bind_param('ssssss', $newFName, $newSurame, $newBday, $newGender, $newEmail, $profileId);

            $newFName = $newFName;
            $newSurame = $newSurame; 
            $newBday = $newBday;
            $newGender = $newGender;
            $newEmail = $newEmail;
            $profileId = $profileId;

            if ($sql_update_user->execute() === TRUE) {

                

                //update data in the table
                $sql_update_user_in_posts = $db_con-> prepare("UPDATE posts SET fullName = ? WHERE profileId = ?");
                $sql_update_user_in_posts->bind_param('ss', $fullName, $profileId);

                $fullName = $fullName;
                $profileId = $profileId;

                if ($sql_update_user_in_posts->execute() === TRUE) {

                    $response = array(
                        "message" => "userDetailsUpdated",
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

            } 
            else {

                $response = array(
                    "message" => "error",
                    "proId" => $profileId
                );
                
                $json_response = json_encode($response);
                
                echo $json_response;
            }
        }

    }


?>