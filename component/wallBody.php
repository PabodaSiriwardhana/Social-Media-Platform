
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/wallBody.css">
</head>
<body>

  <div class="wall-body">

  <div class="col-0 col-sm-0 col-md-1 col-lg-3"></div>

  <div class="col-12 col-sm-12 col-md-10 col-lg-6 wall">

    <div id="wallbodyPosts"></div>

  

    <div class="card mb-5">

      <div class="card-body post-container ">

        <div class="post-header col-12 col-sm-12 col-md-12 col-lg-10">
            <div class="postPropicContainer">
                <img class="publisherPropic"  alt="Profile Photo">
            </div>

            <div class="postdetailsContainer">
                <div class="publisherName"></div>
                <div class="publishedDatetime"></div>
            </div>

            <div class="postsettingsContainer btn-group">

                <button class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true"><i class="bi bi-three-dots"></i></button>

                <ul class="dropdown-menu dropdown-menu-end">
                  <li class="mb-4"><button id="myProfilebtn" type="button" class="btn btn-secondary"><p>My Profile</p><i class="bi bi-person"></i></button></li>

                  <li><button id="logOutbtn" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#logOutModal"><p>Log Out</p><i class="bi bi-box-arrow-left"></i></button></li>
                </ul>

            </div>
        </div>

        <div class="post-body ">
            <div class="postText mt-4 col-12 col-sm-12 col-md-12 col-lg-10"></div>
            <div class="postImagecontainer">
              <img class="postImage mt-4 col-12 col-sm-12 col-md-12 col-lg-10">
            </div>
        </div>

      </div>
      
    </div>


    <div class="card mb-5">

      <div class="card-body post-container">

        <div class="post-header">
            <div class="postPropicContainer">
                <img class="publisherPropic"  alt="Profile Photo">
            </div>

            <div class="postdetailsContainer">
                <div class="publisherName"></div>
                <div class="publishedDatetime"></div>
            </div>
        </div>

        <div class="post-body">
            <div class="postText mt-4"></div>
            <div class="postImagecontainer">
              <img class="postImage mt-4">
            </div>
        </div>

      </div>
      
    </div>

  </div>

  <div class="col-0 col-sm-0 col-md-1 col-lg-3"></div>

  </div>

</body>
</html>