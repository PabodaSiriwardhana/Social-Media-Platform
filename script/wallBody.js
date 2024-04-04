$(document).ready(function(){

    $("#goUpBtn").hide();

    if($(window).width()>768){
        $("#goUpBtn").show();
    }
    else{
        $("#goUpBtn").hide();
    }

    function getCookie(cookieName) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for(let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    };

    const loggedProfileId = getCookie('pabz-profileId');

    var postId =1;

    makeIdArray()

    function makeIdArray(){

        $.ajax({

            url: "backEnd/postIdArray-process.php", 
            type: "POST",
            data: {"postId" : postId},


            success: function(response){
                console.log(response);

                var response = JSON.parse(response);

                msg = response.message;
                postIdArray = response.postIdArray;

                console.log(postIdArray);
                loadPosts(postIdArray);
        }});

    }


    var wallBody= "";

    findLastPostId(postId);

    function findLastPostId (postId){

        $.ajax({

            url: "backEnd/wallBody-Process.php", 
            type: "POST",
            data: {"postId" : postId},


            success: function(response){
                console.log(response);

                var response = JSON.parse(response);

                msg = response.message;
                postId = response.postId;

                if(msg=="gotPostDetails") {
                    findLastPostId(++postId);
                }
                if (msg=="noRow") {
                    lastPostId = postId;
                    console.log("lastPostId "+lastPostId);
                    // loadPosts(lastPostId);
                }

        }});

    }

    function loadPosts(postIdArray) {

        $.each(postIdArray, function(index, postId) {
                        
            $.ajax({
                url: "backEnd/wallBody-Process.php", 
                type: "POST",
                data: {"postId" : postId},
                
                success: function(response){
                    console.log(response);
        
                    var response = JSON.parse(response);
        
                    msg = response.message;
                    postId = response.postId;
                    if (response.text != null) {
                        posttxt = `<div class="postText  mt-4 col-12 col-sm-12 col-md-12 col-lg-10">${response.text}</div>`;
                    }
                    else{
                        posttxt = "";
                    }
                    if (response.image != null) {
                        postimg =`<div class="postImagecontainer">
                                <img src="postImg/${response.image}" class="postImage mt-4 col-12 col-sm-12 col-md-12 col-lg-10">
                            </div>`;
                    }
                    else{
                        postimg="";
                    }
                    postdatetime = response.dateTime;
                    publisherfullName = response.fullName;
                    publisherpropic = response.profilePic;
                    profileId = response.profileId;

                    $.ajax({
                        url: "profilePhoto-Get-Process.php", 
                        type: "POST",
                        data: {
                            "profileId": profileId
                        },
                        
                        success: function(response){
                            console.log(response);
                
                            var response = JSON.parse(response);
                
                            imageUrl = response.proPicImgPath.replace(/\\\//g, '/');
                
                            console.log(imageUrl);
                
                            if (response.message="gotProPic") {
                                
                                $("#postCreationPropic").attr("src", imageUrl);
                                
                            }
                    }});


                    if (loggedProfileId==profileId) {
                        postSettingsBtn = `<div class="postsettingsContainer btn-group">
                        <button class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true"><i class="bi bi-three-dots"></i></button>

                        <ul class="dropdown-menu dropdown-menu-end">
                        <li><button type="button" class="btn btn-secondary mb-4">Edit Text<i class="bi bi-pencil"></i></button></li>

                        <li><button type="button" class="btn btn-secondary" >Delete Post<i class="bi bi-trash3"></i></button></li>
                        </ul>
                    </div>`;
                    }
                    else{
                        postSettingsBtn="";
                    }
        
                    wallBody +=
                    `<div class="card mb-5">

                        <div class="card-body post-container">
                  
                          <div class="post-header col-12 col-sm-12 col-md-12 col-lg-10">
                              <div class="postPropicContainer">
                                  <img src="profilePhotoImg/${publisherpropic}" class="publisherPropic"  alt="Profile Photo">
                              </div>
                  
                              <div class="postdetailsContainer">
                                    <div class="publisherName">${publisherfullName}</div>
                                    <div class="publishedDatetime">${postdatetime}</div>
                                </div>

                                ${postSettingsBtn}
                          </div>
                  
                          <div class="post-body">
                            ${posttxt}
                            ${postimg}    
                          </div>
                  
                        </div>
                        
                    </div>`

                      $("#wallbodyPosts").html(wallBody);
                      console.log(wallBody);
        
            }});
            
        });

  
    };

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) { 
            $("#goUpBtn").fadeIn();
        } else {
            $("#goUpBtn").fadeOut();
        }
    });

  
    $("#goUpBtn").click(function() {
        $("html, body").animate({ scrollTop: 0 });
    });


    $(window).resize(function() {

        if($(window).width()>768){
            $("#goUpBtn").show();
        }
        else{
            $("#goUpBtn").hide();
        }
      });

    // $.ajax({
    //     url: "backEnd/wallBody-Process.php", 
    //     type: "POST",
    //     data: {"postId" : postId},
        
    //     success: function(response){
    //         console.log(response);

    //         var response = JSON.parse(response);

    //         msg = response.message;
    //         postId = response.postId;
    //         posttxt = response.text;
    //         postimg = response.image;
    //         postdatetime = response.dateTime;
    //         publisherfullName = response.fullName;
    //         publisherpropic = response.profilePic;

    //         if (msg=="gotPostDetails") {
                
    //             $(".publisherPropic").attr("src", "profilePhotoImg/"+publisherpropic);
    //             $(".postImage").attr("src", "postImg/"+postimg);
    //             $(".publisherName").html(publisherfullName);
    //             $(".publishedDatetime").html(postdatetime);
    //             $(".postText").html(posttxt);
                
    //         }

    // }});

});