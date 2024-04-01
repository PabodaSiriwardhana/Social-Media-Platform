<?php

    require_once "config/db-con.php";

    $profileId = trim(mysqli_real_escape_string($db_con, $_POST["profileId"]));

     //get data from table
     $sql_create_post =$db_con-> prepare("SELECT * FROM users WHERE profileId = ?");
     $sql_create_post->bind_param('s', $profileId);
 
     $profileId = $profileId;
 
     if ($sql_create_post->execute() === TRUE) {

        $result = $sql_create_post->get_result();
    
        if ($result->num_rows > 0) {

            $row = $result->fetch_assoc();
            
            $firstName = $row['firstName'];
            $surname = $row['surname'];
            $birthday = $row['birthday'];
            $gender = $row['gender'];
            $email = $row['email'];

            $response = array(
                "message" => "gotProDetails",
                "firstName" => $firstName,
                "surname" => $surname,
                "birthday" => $birthday,
                "gender" => $gender,
                "email" => $email,
                "proId" => $profileId
            );

            $json_response = json_encode($response);

            echo $json_response;

        }
        else{
            $response = array(
                "message" => "error"
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