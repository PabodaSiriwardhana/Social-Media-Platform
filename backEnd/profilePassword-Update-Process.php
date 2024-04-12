<?php

require_once "../config/db-con.php";

$oldPassword = trim(mysqli_real_escape_string($db_con,$_POST["oldPassword"]) );
$newPassword = trim(mysqli_real_escape_string($db_con, $_POST["newPassword"]));
$cNewPassword = trim(mysqli_real_escape_string($db_con, $_POST["cNewPassword"]));
$profileId = trim(mysqli_real_escape_string($db_con, $_POST["profileId"]));

if (empty($oldPassword) || empty($newPassword) || empty($cNewPassword) ){

    $response = array(
        "message" => "empty",
        "proId" => $profileId
    );
    
    $json_response = json_encode($response);
    
    echo $json_response;
}
else{
    
    $sql_check_oldPW = $db_con-> prepare("SELECT * FROM users WHERE profileId = ?");
    $sql_check_oldPW->bind_param('s', $profileId);
    $sql_check_oldPW->execute();
    $check_oldPW_result = $sql_check_oldPW->get_result();
    if ($check_oldPW_result->num_rows > 0) {
        
        $user_data_row = $check_oldPW_result->fetch_assoc();

        $userdb_password = $user_data_row['password'];

        $oldPW_verfication = password_verify($oldPassword, $userdb_password);

        if($oldPW_verfication == true){

            if (6>mb_strlen($newPassword, "UTF-8")) {

                $response = array(
                    "message" => "6chars",
                    "proId" => $profileId
                );
                
                $json_response = json_encode($response);
                
                echo $json_response;
            }
            else{

                if ($newPassword != $cNewPassword) {

                    $response = array(
                        "message" => "PWandCPWnotmatch",
                        "proId" => $profileId
                    );
                    
                    $json_response = json_encode($response);
                    
                    echo $json_response;
                }
                else{
    
                    //Encrypt Password
                    $newEnPassword = password_hash($newPassword, PASSWORD_DEFAULT, ['cost'=> 12]);
    
                    //update password in the table
                    $sql_update_password = $db_con-> prepare("UPDATE users SET password = ? WHERE profileId = ?");
                    $sql_update_password->bind_param('ss', $newEnPassword, $profileId);
    
                    $newEnPassword = $newEnPassword;
                    $profileId = $profileId;
    
                    if ($sql_update_password->execute() === TRUE) {
                    
                        $response = array(
                            "message" => "userPWUpdated",
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
            }

        }
        else{

            $response = array(
                "message" => "oldPWIncorrect",
                "proId" => $profileId
            );
            
            $json_response = json_encode($response);
            
            echo $json_response;
        }

    }
    else{

        $response = array(
            "message" => "error",
            "proId" => $profileId
        );
        
        $json_response = json_encode($response);
        
        echo $json_response;

    }

}

?>