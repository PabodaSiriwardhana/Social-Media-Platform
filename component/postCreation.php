<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="css/postCreation.css">
  </head>
  <body>

  <div class="post-cre-outer">

      <div class="col-0 col-sm-0 col-md-1 col-lg-3"></div>

      <div class="col-12 col-sm-12 col-md-10 col-lg-6">

      <div class="card">
          <div class="card-body">

          <form class="col-12 col-sm-12 col-md-12 col-lg-10" enctype = 'multipart/form-data'>
             
            <div class="postPropicAndTxtContainer mb-4 mt-4  col-12 col-sm-12 col-md-12 col-lg-12">
              <div class="postPropicContainer">
                  <img id="postCreationPropic" alt="Profile Photo">
              </div>

              <div class="postTxtContainer">
                <div class="form-floating">
                  <textarea class="form-control" id="postTxtArea"></textarea>
                  <label id="postTxtArealbl" for="postTxtArea"></label>
                </div>
              </div>
            </div>

            <hr>

            <div class="postImgContainer col-12 col-sm-12 col-md-12 col-lg-10">

              <label for="postUplImg" class="btn btn-primary btn-block btn-outlined " id="upImgLbl">Add Photo<i class="bi bi-image"></i></i></label>
              <input type="file" accept="image/*" id="postUplImg" name="postUplImg" style="visibility:hidden;">

              <img id="upImg" class="mb-4" src="#"  alt="your image" />

              <button type="button" class="btn btn-secondary mb-4" id="removePhotoBtn">Remove Photo<i class="bi bi-trash3"></i></button>

            </div>


            <button id="publishBtn" type="submit" name="submit" class="btn btn-primary btn-lg mb-4">Publish<i class="bi bi-clipboard-check"></i></button>
            </div>

          </form>

          <div class="mb-4" id="postMsgBox"></div>
          
        </div>
          

          

      </div>
      <div class="col-0 col-sm-0 col-md-1 col-lg-3"></div>

  </div>
  
    

  </body>
</html>
