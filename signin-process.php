<?php

require_once "config/db-con.php";

$email = trim(mysqli_real_escape_string($db_con, $_POST["email"]));
$password = trim(mysqli_real_escape_string($db_con, $_POST["password"]));

if (empty($email) || empty($password)) {

    echo "empty";
}
else{

    $sql_check_email = $db_con-> prepare("SELECT * FROM users WHERE email = ?");
    $sql_check_email->bind_param('s', $email);
    $sql_check_email->execute();
    $check_email_result = $sql_check_email->get_result();

    if ($check_email_result->num_rows > 0) {
        
        $user_data_row = $check_email_result->fetch_assoc();

        $userdb_password = $user_data_row['password'];

        $pw_verfication = password_verify($password, $userdb_password);

        if($pw_verfication == true){

            $cookie_name = "pabz-user";
            $cookie_value = $email;
            setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day

            echo "goWall";
        }
        else{

            echo "pwIncorrect";
        }
    }
    else{
        
        echo "exist";
    }
}

?>