
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/wallBody.css">
</head>
<body>

  <div id="loadingSpinner">
    <div class="spinner-border text-primary" role="status">
    </div>
    <div>
      <h2>Loading...</h2>
    </div>
  </div>

  <div class="wall-body">

  <div class="col-0 col-sm-0 col-md-1 col-lg-2 col-xl-3"></div>

  <div class="mb-5 col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6">

    <!-- <div class="card mb-5">

      <div class="card-body post-container ">

        <div class="post-header col-12 col-sm-12 col-md-12 col-lg-10">
            <div class="postPropicContainer">
                <img class="publisherPropic" src="img/avatar2.png"  alt="Profile Photo">
            </div>

            <div class="postdetailsContainer">
                <div class="publisherName">xyz</div>
                <div class="publishedDatetime">1111</div>
            </div>

            <div class="postsettingsContainer btn-group">

                <button class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true"><i class="bi bi-three-dots"></i></button>

                <ul class="dropdown-menu dropdown-menu-end">
                  <li><button type="button" class="btn btn-secondary mb-4">Edit Text<i class="bi bi-pencil"></i></button></li>

                  <li><button type="button" class="btn btn-secondary" >Delete Post<i class="bi bi-trash3"></i></button></li>
                </ul>

            </div>

        </div>

        

        <div class="post-body col-12 col-sm-12 col-md-12 col-lg-10 mb-4">
            <div class="postText mt-4">head</div>
            <div class="postImagecontainer">
              <img class="postImage mt-4" src="img/avatar2.png">
            </div>

        </div>

        <hr class=" col-12 col-sm-12 col-md-12 col-lg-10">

        <div class="belowPost col-12 col-sm-12 col-md-12 col-lg-10">

            <div id="postLikeBtnContainer">
              <button id="postLikeBtn" class="postLikeBtn likeBtn btn btn-outline-primary">
                <h5>Like</h5>
                <div class=""><i class="bi bi-hand-thumbs-up"></i></div>
              </button>
            </div>

            <div class="likeCountContainer">
              <div class="likeIco"><i class="bi bi-hand-thumbs-up-fill"></i></div>
              <h5>234</h5>
              <h2 class="icoSeperator">|</h2>
              <div class="commentIco"><i class="bi bi-chat-right-fill"></i></div>
              <h5>234</h5>
            </div>

            <div >
              <button class="commentBtn btn btn-outline-primary"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseComments" aria-expanded="false" aria-controls="collapseComments">
                <h5>Comment</h5>
                <div class=""><i class="bi bi-chat-right"></i></div>
              </button>
            </div>
            
            
        </div>

        <div class="collapse mt-3 col-12 col-sm-12 col-md-12 col-lg-10 Comments" id="collapseComments">

          <div class="card card-body">

            <div class="writeComment mb-3">
              <img class="writeCommentPropic" src="img/avatar2.png" alt="Profile Photo">
              <input placeholder="Write a comment..." type="text"><button class="commentSubmitBtn btn btn-primary"><i class="bi bi-send"></i></button>
            </div>

            <div class="oldComment mb-3">
              <div class="oldCommentPropicContainer">
                <img class="oldCommentPropic" src="img/avatar2.png" alt="Profile Photo">
              </div>

              <div class="oldCommentsContainer">
                <div class="oldCommentdetailsContainer">
                  <div class="oldCommenterNameDateTimeContainer">
                    <h6>Paboda Siriwardana</h6>
                    <p class="commentDateTime">2022 22 22 22 32.</p>
                  </div>
                  <div class="oldCommenteContainer">
                    <p>HEllO Hi How are you..</p>
                  </div>
                </div>
              </div>

              <div class="commentDeleteBtnContainer">
                <button><i class="bi bi-trash3"></i></button>
              </div>
              
            </div>
            
          </div>
        </div>

      </div>
      
    </div> -->



    <div id="wallbodyPosts"></div>

    <div id="goUpBtn" class="goUpBox"  data-bs-toggle="tooltip" data-bs-placement="top" title="Go To Top"><i class="bi bi-arrow-up"></i></div>

  </div>
  

  <div class="col-0 col-sm-0 col-md-1 col-lg-2 col-xl-3"></div>

  </div>

  

</body>
</html>