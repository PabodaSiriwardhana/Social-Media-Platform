$(document).ready(function(){

    $("#upImg").hide();
    $("#upImgLbl").show();
    $("#postImgContainer").hide();
    $("#publishBtn").hide();
    $("#removePhotoBtn").hide();
    $("#postMsgBox").hide();

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

    const profileId = getCookie('pabz-profileId');
    console.log(profileId);

    $.ajax({
        url: "backEnd/profilePhoto-Get-Process.php", 
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

    $.ajax({
        url: "backEnd/profileDetails-Get-Process.php", 
        type: "POST",
        data: {"profileId" : profileId},
        
        success: function(response){
            console.log(response);

            var response = JSON.parse(response);

            message = response.message;
            firstName = response.firstName;
            surname = response.surname;
            profilePic = response.profilePic;

            if (message=="gotProDetails") {
                
                $("#postTxtArea").attr("placeholder","What's on your mind, "+firstName+"?");
                $("#postTxtArealbl").html("What's on your mind, "+firstName+"?");
                
            }

    }});

    

    function readURL(input) {

        $("#removePhotoBtn").show();

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#upImg').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#postUplImg").change(function(){
        readURL(this);
        $(this).hide();
        $("#upImgLbl").hide();
        $("#upImg").show();
        $("#postImgContainer").show();
        $("#publishBtn").show();
    });

    $("#removePhotoBtn").click(function(){
        $(this).hide();
        $("#upImgLbl").show();
        $("#upImg").hide();
        $("#postImgContainer").hide();

        $('#postUplImg').val('');

        if($('#postTxtArea').val().length==0){
            $("#publishBtn").hide();
        }

        $('html, body').animate({scrollTop: 0});
    });

    $('#postTxtArea').bind("keyup input paste", function() {
        if ($(this).val().length > 0 || $('#postUplImg').val() != '') {
            $("#publishBtn").show();
        } else {
            $("#publishBtn").hide();
        }
    });
    
    
    $("#publishBtn").click(function(event){
        event.preventDefault();

        
        $("#publishBtn").hide();
        $("#upImg").hide();
        $("#upImg").hide();
        $("#upImgLbl").show();
        $("#removePhotoBtn").hide();

        var postTxt  = $('#postTxtArea').val();
        var file_data = $('#postUplImg').prop('files')[0];

        fullName = firstName+" "+surname;
        
        var form_data = new FormData();
        form_data.append("file",file_data);
        form_data.append("postTxt",postTxt);
        form_data.append("profileId",profileId);
        form_data.append("fullName",fullName);
        form_data.append("profilePic",profilePic);

        console.log(file_data);

        $.ajax({
            url: "backEnd/postCreation-process.php", 
            type: "POST",
             dataType: 'script',
             cache: false,
             contentType: false,
             processData: false,
             data: form_data,
            
            success: function(response){

                console.log(response);

                var response = JSON.parse(response);

                msg = response.message;
                newPostId = response.newPostId;
                
                if(msg=="postCreated"){
                    $("#postMsgBox").show();
                    $("#postMsgBox").html('<div class="alert alert-success" role="alert">Your post published on the wall !!</div>');

                    setTimeout(function() {
                        $("#postMsgBox").fadeOut();
                    }, 2000);

                    console.log(newPostId);

                    $.ajax({
                        url: "backEnd/wallBody-Process.php", 
                        type: "POST",
                        async: false,
                        data: {"postId" : newPostId},
                        
                        success: function(response){
                            console.log(response);

                            var response = JSON.parse(response);
                            
                            msg = response.message;
                            postIdValue = response.postId;
                            postdatetime = response.dateTime;
                            postdatetime = postdatetime.slice(0, -3);
                            publisherfullName = response.fullName;
                            publisherpropic = response.profilePic;
                            if (response.text != null) {
                                posttxt = `<div name="${postIdValue}" class="postText  mt-4 col-12 col-sm-12 col-md-12 col-lg-10">${response.text}</div>`;
                            }
                            else{
                                posttxt = `<div id="postText${postIdValue}" name="${postIdValue}" class="postText  mt-4 col-12 col-sm-12 col-md-12 col-lg-10"></div>`;
                            }
                            if (response.image != null) {
                                postimg =`<div class="postImagecontainer">
                                        <img src="postImg/${response.image}" class="postImage mt-4 col-12 col-sm-12 col-md-12 col-lg-10">
                                    </div>`;
                            }
                            else{
                                postimg="";
                            }

                            
                            var postHtml =`<div id="postId${postIdValue}" name="${postIdValue}" class="card mb-5">

                            <div class="card-body post-container">
                    
                            <div class="post-header col-12 col-sm-12 col-md-12 col-lg-10">
                                <div class="postPropicContainer">
                                    <img src="profilePhotoImg/${publisherpropic}" class="publisherPropic"  alt="Profile Photo">
                                </div>
                    
                                <div class="postdetailsContainer">
                                    <div class="publisherName">${publisherfullName}</div>
                                    <div class="publishedDatetime">${postdatetime}</div>
                                </div>

                                <div class="postsettingsContainer btn-group">
                                <button class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true"><i class="bi bi-three-dots"></i></button>

                                <ul class="dropdown-menu dropdown-menu-end">
                                <li><button id="postTextEditBtn${postIdValue}" name="${postIdValue}"  type="button" class="postTextEditBtn btn btn-secondary mb-4"  data-bs-toggle="modal" data-bs-target="#postTextEditModal">Edit Text<i class="bi bi-pencil"></i></button></li>

                                <li><button id="postDeleteBtn${postIdValue}" name="${postIdValue}" type="button" class="postDeleteBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#postDeleteModal">Delete Post<i class="bi bi-trash3"></i></button></li>
                                </ul>
                                </div>
                            </div>
                    
                            <div class="post-body">
                                ${posttxt}
                                ${postimg}    
                            </div>

                                <hr class="mt-4 mb-2 col-12 col-sm-12 col-md-12 col-lg-10">

                                <div class="mt-4 belowPost col-12 col-sm-12 col-md-12 col-lg-10">

                                    <div id="postLikeBtnContainer">
                                    <button name="${postIdValue}" id="postLikeBtnId${postIdValue}" class="postLikeBtn likeBtn btn btn-outline-primary">
                                    <h6>Like <i class="bi bi-hand-thumbs-up"></i></h6>
                                    </button>
                                    </div>

                                    <div class="likeCountContainer">
                                    <div class="likeIco"><i class="bi bi-hand-thumbs-up-fill"></i></div>
                                    <h5 id="likeCountPost${postIdValue}">0</h5>
                                    <div class="commentIco"><i class="bi bi-chat-right-fill"></i></div>
                                    <h5 id="commentCountPost${postIdValue}">0</h5>
                                    </div>

                                    <div >
                                    <button name="${postIdValue}" class="openCommentSection commentBtn btn btn-outline-primary"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseComments${postIdValue}" aria-expanded="false" aria-controls="collapseComments">
                                        <h6>Comment <i class="bi bi-chat-right"></i></h6>
                                    </button>
                                    </div>
                                    
                                    
                                </div>

                                <div class="collapse mt-3 col-12 col-sm-12 col-md-12 col-lg-10 Comments" id="collapseComments${postIdValue}">

                                <div class="card card-body">

                                    <div class="writeComment mb-3">
                                    <img src="profilePhotoImg/${publisherpropic}"  class="newCommentProPic writeCommentPropic"  alt="Profile Photo">
                                    <input class="postCommentInput" id="commentPostId${postIdValue}" name="${postIdValue}"  placeholder="Write a comment..." type="text">
                                    <button type="button"    disabled="disabled" id="commentSubmitBtn${postIdValue}" name="${postIdValue}" class="commentSubmitBtn btn btn-primary" disabled><i class="bi bi-send"></i></button>
                                    </div>

                                    <div id="oldCommentsContainer${postIdValue}" class="oldCommentsContainer">
                                    </div>
                                    
                                </div>
                                </div>
                    
                            </div>
                            
                        </div>`

                        console.log(postHtml);

                        $("#wallbodyPosts").prepend(postHtml);
                        }
                
                    });
                }
                if(msg=="empty"){
                    $("#postMsgBox").show();
                    $("#postMsgBox").html('<div class="alert alert-warning" role="alert">Please add some content to your post before publishing!</div>');

                    setTimeout(function() {
                        $("#postMsgBox").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#postMsgBox").fadeIn();
                    });
                }
                if(msg=="error"){
                    $("#postMsgBox").show();
                    $("#postMsgBox").html('<div class="alert alert-danger" role="alert">Something went wrong. Try again!</div>');

                    setTimeout(function() {
                        $("#postMsgBox").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#postMsgBox").fadeIn();
                    });
                }
                $('#postUplImg').val('');
                $('#postTxtArea').val('');
                
        }});

    });

});