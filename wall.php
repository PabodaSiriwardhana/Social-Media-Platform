<?php

  if (isset($_COOKIE['pabz-profileId'])) {

    $cookieProfileId = $_COOKIE['pabz-profileId'];
    
    ?>

        <!doctype html>
        <html lang="en">
          <head>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">

            <!-- Bootstrap Icons -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">


            <!-- Bootstrap CSS -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

            <title>PABZ | WALL</title>
            <link rel="icon" href="logo/pabz-favicon-color.png" type="image/png">
            
          </head>
          <body>
            
            <?php require "component/navbar.php"; ?>

            <?php require "component/postCreation.php"; ?>

            <?php require "component/wallBody.php"; ?>

            <div class="modal fade" id="logOutModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Log Out</h5>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to log out?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button id="logOutProfileModalbtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Log Out</button>
                    </div>
                    </div>
                </div>
            </div>

            <!-- jquery Script File-->
            <script src="script/jquery-3.7.1.min.js"></script>

            <!-- Script Files-->
            <script src="script/navbar.js"></script>

            <script src="script/wall.js"></script>

            <script src="script/postCreation.js"></script>

            <!-- Option 1: Bootstrap Script -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
          
          </body>
        </html>

    <?php
  }
  else {
    header("Location: http://localhost/pabz/home.php");
    exit();
  }

?>


