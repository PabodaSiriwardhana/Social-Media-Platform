<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="css/postCreation.css">
  </head>
  <body>

  <div class="post-cre-outer">

      <div class="col-0 col-sm-0 col-md-1 col-lg-2 col-xl-3"></div>

      <div class="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6">

        <div class="card mb-4">
          
          <div class="card-body">

          <h3 class="mt-2 mb-2 postcreateheading">Create Post</h3>

            <form class=" col-12 col-sm-12 col-md-12 col-lg-10" enctype = 'multipart/form-data'>
              
                <div class="postPropicAndTxtContainer mb-4 mt-4  col-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="postPropicContainer">
                      <img id="postCreationPropic" alt="Profile Photo">
                  </div>

                  <div class="postTxtContainer">
                    <div class="form-floating">
                      <textarea class="form-control" id="postTxtArea" rows="1"></textarea>
                      <label id="postTxtArealbl" for="postTxtArea"></label>
                    </div>
                  </div>
                </div>

                <hr>

                <div class="postImgContainer col-12 col-sm-12 col-md-12 col-lg-10">

                  <label for="postUplImg" class="mb-4 btn btn-primary btn-block btn-outline" id="upImgLbl">Add Photo<i class="bi bi-image"></i></i></label>
                  <input type="file" accept="image/*" id="postUplImg" name="postUplImg" style="display:none;">

                  <img id="upImg" class="mb-4" src="#"  alt="your image" />

                  <button type="button" class="mb-4 btn btn-secondary" id="removePhotoBtn">Remove Photo<i class="bi bi-trash3"></i></button>

                  <button id="publishBtn" type="submit" name="submit" class="mt-4 btn btn-primary btn-lg">Publish<i class="bi bi-clipboard-check"></i></button>

                </div>

            </form>

            <div id="postMsgBox"></div>
            
          </div>

        </div>
        
      </div>

      <div class="col-0 col-sm-0 col-md-1 col-lg-2 col-xl-3"></div>

  </div>
  
    

  </body>
</html>
