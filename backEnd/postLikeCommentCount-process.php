<?php

    require_once "../config/db-con.php";

    if (isset($_POST["postIdforLikeCommentCount"])){
        $postIdforCount = trim(mysqli_real_escape_string($db_con, $_POST["postIdforLikeCommentCount"]));
    }

if (isset($postIdforCount)){
        //get data count from table
        $sql_get_postlikecount =$db_con-> prepare("SELECT profileId FROM postlike WHERE postId = ?");
        $sql_get_postlikecount->bind_param('s', $postIdforCount);

        $postIdforCount = $postIdforCount;
    
        if ($sql_get_postlikecount->execute() === TRUE) {
        
            $Likeresult = $sql_get_postlikecount->get_result();
    
            if ($Likeresult->num_rows > 0) {
    
                $likeCount = mysqli_num_rows($Likeresult);

                //get data count from table
                $sql_get_postCommentcount =$db_con-> prepare("SELECT commentId FROM postComment WHERE postId = ?");
                $sql_get_postCommentcount->bind_param('s', $postIdforCount);

                $postIdforCount = $postIdforCount;
            
                if ($sql_get_postCommentcount->execute() === TRUE) {
                
                    $Commentresult = $sql_get_postCommentcount->get_result();
            
                    if ($Commentresult->num_rows > 0) {
            
                        $CommentCount = mysqli_num_rows($Commentresult);
            
                        $response = array(
                            "message" => "gotbothCounts",
                            "commentCount" => $CommentCount,
                            "likeCount" => $likeCount
                        );
            
                        $json_response = json_encode($response);
            
                        echo $json_response;
                    }
                    else{
                        $response = array(
                            "message" => "gotLikesCount",
                            "commentCount" => "0",
                            "likeCount" => $likeCount
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
            else{

                //get data count from table
                $sql_get_postCommentcount =$db_con-> prepare("SELECT commentId FROM postComment WHERE postId = ?");
                $sql_get_postCommentcount->bind_param('s', $postIdforLikeCount);

                $postIdforLikeCount = $postIdforLikeCount;
            
                if ($sql_get_postCommentcount->execute() === TRUE) {
                
                    $Commentresult = $sql_get_postCommentcount->get_result();
            
                    if ($Commentresult->num_rows > 0) {
            
                        $CommentCount = mysqli_num_rows($Commentresult);
            
                        $response = array(
                            "message" => "gotCommentCounts",
                            "commentCount" => $CommentCount,
                            "likeCount" => "0"
                        );
            
                        $json_response = json_encode($response);
            
                        echo $json_response;
                    }
                    else{
                        $response = array(
                            "message" => "bothEmptyCounts",
                            "commentCount" => "0",
                            "likeCount" => "0"
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
        
    
        } else {
    
            $response = array(
                "message" => "error"
            );

            $json_response = json_encode($response);

            echo $json_response;
        }
    }


?>