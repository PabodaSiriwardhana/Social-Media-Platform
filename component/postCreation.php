<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="css/postCreation.css">
  </head>
  <body>

  <div class="post-cre-outer">

      <div class="col-0 col-sm-0 col-md-2 col-lg-3"></div>
      <div class="col-12 col-sm-12 col-md-8 col-lg-6">
      <div class="card">
          <div class="card-body">

          <form enctype = 'multipart/form-data'>
          <div class="postTxtContainer">

            <div class="form-floating mb-4 mt-4">

              <textarea class="form-control" placeholder="Write anything in yor mind" id="postTxtArea"></textarea>
              <label for="postTxtArea">Write something in yor mind</label>

            </div>

            </div>

            <div class="postImgContainer">

            <label for="postUplImg" class="btn btn-primary btn-block btn-outlined mb-4" id="upImgLbl">Add Photo<i class="bi bi-upload"></i></label>
            <input type="file" accept="image/*" id="postUplImg" name="postUplImg" style="visibility:hidden;">

            <img id="upImg" class="mb-4" src="#"  alt="your image" />

            <button type="button" class="btn btn-secondary hidden mb-4" id="removePhotoBtn">Remove Photo<i class="bi bi-trash3"></i></button>

            </div>


            <button id="publishBtn" type="submit" name="submit" class="btn btn-primary btn-lg hidden">Publish</button>
            </div>
            </form>
            <div id="postMsgBox"></div>
        </div>
          

          

      </div>
      <div class="col-0 col-sm-0 col-md-2 col-lg-3"></div>

  </div>
  
    

  </body>
</html>
