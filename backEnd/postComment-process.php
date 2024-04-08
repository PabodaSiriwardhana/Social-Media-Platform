<?php

    require_once "../config/db-con.php";

    if (isset($_POST["postId"])){
        $postId = trim(mysqli_real_escape_string($db_con, $_POST["postId"]));
    }
    if (isset($_POST["likedProfileId"])){
        $likedProfileId = trim(mysqli_real_escape_string($db_con, $_POST["likedProfileId"]));
    }
    if (isset($_POST["likedProPicImg"])){
        $likedProPicImg = trim(mysqli_real_escape_string($db_con, $_POST["likedProPicImg"]));
    }
    if (isset($_POST["proFullName"])){
        $proFullName = trim(mysqli_real_escape_string($db_con, $_POST["proFullName"]));
    }
    if (isset($_POST["postComment"])){
        $postComment = trim(mysqli_real_escape_string($db_con, $_POST["postComment"]));
    }
    if (isset($_POST["postIdForGetComments"])){
        $postIdForGetComments = trim(mysqli_real_escape_string($db_con, $_POST["postIdForGetComments"]));
    }
    

    if (isset($postComment)) {
        //insert data into table
        $sql_create_postComment =$db_con-> prepare("INSERT INTO postcomment (postId, profileId, profilePic, profileName, comment, dateTime)  VALUES (?, ?, ?, ?, ?, ?)");
        $sql_create_postComment->bind_param('ssssss', $postId, $likedProfileId, $likedProPicImg, $proFullName, $postComment, $lkDateTime1);
    
        $postId = $postId;
        $likedProfileId = $likedProfileId;
        $likedProPicImg = $likedProPicImg;
        $proFullName = $proFullName;
        $postComment = $postComment;
        $lkDateTime1 = $lkDateTime1;
    
        if ($sql_create_postComment->execute() === TRUE) {

            //get data from table
            $sql_get_postComment =$db_con-> prepare("SELECT * FROM postcomment WHERE postId = ?");
            $sql_get_postComment->bind_param('s', $postId);
        
            $postId = $postId;
        
            if ($sql_get_postComment->execute() === TRUE) {
            
                $result = $sql_get_postComment->get_result();
        
                if ($result->num_rows > 0) {
        
                    while($row = $result->fetch_assoc()) {
                        
                        $commentId = $row["commentId"];
                        $postId = $row["postId"];
                        $profileId = $row["profileId"];
                        $profilePic = $row["profilePic"];
                        $profileName = $row["profileName"];
                        $comment = $row["comment"];
                        $dateTime = $row["dateTime"];
                        
                        
                        $rowData = array(
                            "commentId" => $commentId,
                            "postId" => $postId,
                            "profileId" => $profileId,
                            "profilePic" => $profilePic,
                            "profileName" => $profileName,
                            "comment" => $comment,
                            "dateTime" => $dateTime
                        );

                        
                        $rows[] = $rowData;
                    }
        
                    $response = array(
                        "message" => "gotArray",
                        "postCommentsArray" => $rows
                    );
        
                    $json_response = json_encode($response);
        
                    echo $json_response;
                }
                else{
                    $response = array(
                        "message" => "noComments"
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

    }


    if (isset($postIdForGetComments))  {
        //get data from table
        $sql_get_postComment =$db_con-> prepare("SELECT * FROM postcomment WHERE postId = ?");
        $sql_get_postComment->bind_param('s', $postIdForGetComments);
    
        $postIdForGetComments = $postIdForGetComments;
    
        if ($sql_get_postComment->execute() === TRUE) {
        
            $result = $sql_get_postComment->get_result();
    
            if ($result->num_rows > 0) {
    
                while($row = $result->fetch_assoc()) {
                    
                    $commentId = $row["commentId"];
                    $postId = $row["postId"];
                    $profileId = $row["profileId"];
                    $profilePic = $row["profilePic"];
                    $profileName = $row["profileName"];
                    $comment = $row["comment"];
                    $dateTime = $row["dateTime"];
                    
                    
                    $rowData = array(
                        "commentId" => $commentId,
                        "postId" => $postId,
                        "profileId" => $profileId,
                        "profilePic" => $profilePic,
                        "profileName" => $profileName,
                        "comment" => $comment,
                        "dateTime" => $dateTime
                    );

                    
                    $rows[] = $rowData;
                }
    
                $response = array(
                    "message" => "gotArray",
                    "postCommentsArray" => $rows
                );
    
                $json_response = json_encode($response);
    
                echo $json_response;
            }
            else{
                $response = array(
                    "message" => "noComments"
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