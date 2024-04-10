<!doctype html>
<html lang="en">
  <head>

    <!-- CSS -->
    <link rel="stylesheet" href="css/navbar.css">

  </head>

  <body>

    <!-- HEADER START -->
    <nav class="navbar navbar-expand-md sticky-top navbar-dark bg-primary">

      <div class="container-fluid outer">

        <div class="wrapper wrapper-left">

            <a class="navbar-brand" href="http://localhost/pabz/wall.php">
              <img src="logo/pabz-transparent.png" alt="PABZ Logo" class="d-inline-block align-text-top"  id="logo">
            </a>

        </div>

        <div class="wrapper wrapper-middle" >

          <div class="center-icons" id="header-middle">

              <div id="navbarWallbtn" class="icon-container-middle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Wall"><i class="bi bi-house"></i></div>

              <div class="icon-container-middle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Videos"><i class="bi bi-play-btn"></i></div>

              <div class="icon-container-middle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Marketplace"><i class="bi bi-shop"></i></div>

              <div class="icon-container-middle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Gaming"><i class="bi bi-controller"></i></div>
        
          </div>

        </div>
          
        <div class="wrapper wrapper-right">

            <div class="right-icons container">

                <div class="icon-container-right"  data-bs-placement="bottom" title="Messages" data-bs-toggle="offcanvas" data-bs-target="#MessagesoffcanvasRight" aria-controls="offcanvasRight">
                  <i class="bi bi-chat-dots"></i>
                </div>
                
                <div class="icon-container-right" data-bs-placement="bottom" title="Notifications" data-bs-toggle="offcanvas" data-bs-target="#NotificationsoffcanvasRight" aria-controls="offcanvasRight">
                  <i class="bi bi-bell"></i>
                </div>

                <img alt="Profile Photo" class="d-inline-block align-text-top profileImg dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true" id="profile" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Account">

                <ul class="dropdown-menu dropdown-menu-end">

                  <li class="mb-2"><button id="myProfilebtn" type="button" class="btn btn-primary"><p>My Profile</p><i class="bi bi-person"></i></button></li>

                  <li><button id="logOutbtn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#logOutModal"><p>Log Out</p><i class="bi bi-box-arrow-left"></i></button></li>

                </ul>
            </div>

        </div>

      

      </div>

    </nav>
    <!-- HEADER END -->

    
    <!-- FOOTER START-->
    <nav class="navbar navbar-dark bg-primary fixed-bottom mt-6" id="footer-navbar">

        <div class="center-icons">

          <div id="footerWallbtn" class="icon-container-middle nav-item">
            <i class="bi bi-house"></i>
          </div>

          <div class="icon-container-middle nav-item"><i class="bi bi-play-btn"></i></div>
          <div class="icon-container-middle nav-item"><i class="bi bi-shop"></i></div>
          <div class="icon-container-middle nav-item"><i class="bi bi-controller"></i></div>

        </div>

    </nav>
    <!-- FOOTER END-->

    


  </body>
</html>
