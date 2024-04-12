<?php

    require_once "../config/db-con.php";


    $firstName = trim(mysqli_real_escape_string($db_con,$_POST["firstName"]) );
    $surname = trim(mysqli_real_escape_string($db_con, $_POST["surname"]));
    $birthday = trim(mysqli_real_escape_string($db_con, $_POST["birthday"]));
    $gender = trim(mysqli_real_escape_string($db_con, $_POST["gender"]));
    $email = trim(mysqli_real_escape_string($db_con, $_POST["email"]));
    $password = trim(mysqli_real_escape_string($db_con, $_POST["password"]));
    $cPassword = trim(mysqli_real_escape_string($db_con, $_POST["cPassword"]));
    $profilePic = "default-profile-photo.png";

    $today = new DateTime();


    if (empty($firstName) || empty($surname) || empty($birthday) || empty($email) || empty($password) ||  ($gender == "null") ){

        $response = array(
            "message" => "empty",

        );
        
        $json_response = json_encode($response);
        
        echo $json_response;
    }
    else{

        $DoB = new DateTime($birthday);
    
        // Calculate age
        $diff = date_diff($DoB, $today);
        $age = $diff->format("%R%y");

        if ($age>0) {
            

            if ($age>15) {

                if (6>mb_strlen($password, "UTF-8")) {
    
                    $response = array(
                        "message" => "6chars",

                    );
                    
                    $json_response = json_encode($response);
                    
                    echo $json_response;
                }
                else{
        
                    if ($password != $cPassword) {
        
                        $response = array(
                            "message" => "pwMatch",
    
                        );
                        
                        $json_response = json_encode($response);
                        
                        echo $json_response;
                    }
                    else{
        
                        $sql_check_email = $db_con-> prepare("SELECT * FROM users WHERE email = ?");
                        $sql_check_email->bind_param('s', $email);
                        $sql_check_email->execute();
                        $check_email_result = $sql_check_email->get_result();
                        if ($check_email_result->num_rows > 0) {
                            
                            $response = array(
                                "message" => "exist",
        
                            );
                            
                            $json_response = json_encode($response);
                            
                            echo $json_response;
                        }
                        else{
        
                            //Encrypt Password
                            $enPassword = password_hash($password, PASSWORD_DEFAULT, ['cost'=> 12]);
        
                            //insert data into table
                            $sql_create_user =$db_con-> prepare("INSERT INTO users(firstName, surname, birthday, gender, email, password, profilePic)
                            VALUES (?, ?, ?, ?, ?, ?, ?)");
                            $sql_create_user->bind_param('sssssss', $firstName, $surname, $birthday, $gender, $email, $enPassword, $profilePic);
        
                            $firstName = $firstName;
                            $surname = $surname; 
                            $birthday = $birthday;
                            $gender = $gender;
                            $email = $email;
                            $enPassword = $enPassword;
                            $profilePic = $profilePic;
        
                            if ($sql_create_user->execute() === TRUE) {
                            
                                $response = array(
                                    "message" => "goSigninPg",
                                    "email" => $email
            
                                );
                                
                                $json_response = json_encode($response);
                                
                                echo $json_response;
        
                            } else {
        
                                $response = array(
                                    "message" => "error",
            
                                );
                                
                                $json_response = json_encode($response);
                                
                                echo $json_response;
                            }
                        }
                    }
                }
    
            } else {
                
                $response = array(
                    "message" => "underAge",
                );
                
                $json_response = json_encode($response);
                
                echo $json_response;
            }
        }
        else{
            
            $response = array(
                "message" => "invalidDate"
            );
            
            $json_response = json_encode($response);
            
            echo $json_response;
        }

        

        

    }

?>