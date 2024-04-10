$(document).ready(function(){

    var wallBody;
    var likeCount;
    var oldComments;

    $("#goUpBtn").hide();

    if($(window).width()<769){
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

    makeIdArray();

    function makeIdArray(){

        $.ajax({

            url: "backEnd/postIdsArray-process.php", 
            type: "POST",
            async: false,


            success: function(response){
                console.log(response);

                var response = JSON.parse(response);

                msg = response.message;

                if (msg=="noPosts") {
                    $("#wallbodyPosts").html('');
                }
                if (msg=="gotArray") {
                    
                    postIdArray = response.postIdArray;
                    postIdArrayfromPosts = postIdArray.reverse();

                    console.log(postIdArrayfromPosts);

                    $.ajax({
    
                        url: "backEnd/postLike-process.php", 
                        type: "POST",
                        async: false,
                        data: {"checkProfileId" : loggedProfileId},
                
                
                        success: function(response){
                            console.log(response);
                
                            var response = JSON.parse(response);
                
                            msg = response.message;

                            if (msg=="noPostLikes") {
                                
                                postIdArrayfromPostLike = [];

                                console.log(postIdArrayfromPostLike);
        
                                loadPosts(postIdArrayfromPosts, postIdArrayfromPostLike);
                            }
                            if (msg=="gotArray") {
                                
                                postIdArrayfromPostLike = response.postIdArray;
    
                                console.log(postIdArrayfromPostLike);
        
                                loadPosts(postIdArrayfromPosts, postIdArrayfromPostLike);
                            }
                        }
                    });
                }
            }
        });
    }
 

    function loadPosts(postIdArrayfromPosts, postIdArrayfromPostLike) {


        postIdArrayfromPosts.forEach(postId => {
            console.log("postId ="+postId);

            $.ajax({
            url: "backEnd/postLike-Process.php", 
            type: "POST",
            async: false,
            data: {"postIdforLikeCount" : postId},
            
                success: function(response){

                    console.log(response);

                    var response = JSON.parse(response);

                    likeCount = response.likeCount;

                    $.ajax({
                        url: "backEnd/wallBody-Process.php", 
                        type: "POST",
                        async: false,
                        data: {"postId" : postId},
                        
                        success: function(response){
                            console.log(response);

                            var response = JSON.parse(response);
                            
                
                            msg = response.message;
                            postIdValue = response.postId;
                            postdatetime = response.dateTime;
                            postdatetime = postdatetime.slice(0, -3);
                            publisherfullName = response.fullName;
                            publisherpropic = response.profilePic;
                            profileId = response.profileId;
                            if (response.text != null) {
                                posttxt = `<div name="${postIdValue}" class="postText  mt-4 col-12 col-sm-12 col-md-12 col-lg-10">${response.text}</div>`;
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

                            if ($.inArray(postIdValue, postIdArrayfromPostLike) !== -1) {
                                btnPart = `class="likedPostBtn likeBtn btn btn-primary">
                                <h6>Liked <i class="bi bi-hand-thumbs-up-fill bi-likedIco"></i></h6>`
                            } else {
                                btnPart = `class="postLikeBtn likeBtn btn btn-outline-primary">
                                <h6>Like <i class="bi bi-hand-thumbs-up"></i></h6>`
                            }


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

                            
                            var postHtml =`<div name="${postIdValue}" class="card mb-5">

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

                                <hr class="mt-4 mb-2 col-12 col-sm-12 col-md-12 col-lg-10">

                                <div class="mt-4 belowPost col-12 col-sm-12 col-md-12 col-lg-10">

                                    <div id="postLikeBtnContainer">
                                    <button name="${postIdValue}" id="postLikeBtnId${postIdValue}" ${btnPart}
                                    </button>
                                    </div>

                                    <div class="likeCountContainer">
                                    <div class="likeIco"><i class="bi bi-hand-thumbs-up-fill"></i></div>
                                    <h5 id="likeCountPost${postIdValue}">${likeCount}</h5>
                                    <div class="commentIco"><i class="bi bi-chat-right-fill"></i></div>
                                    <h5>23</h5>
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
                                    <img  class="newCommentProPic writeCommentPropic"  alt="Profile Photo">
                                    <input id="commentPostId${postIdValue}" placeholder="Write a comment..." type="text"><button name="${postIdValue}" class="commentSubmitBtn btn btn-primary"><i class="bi bi-send"></i></button>
                                    </div>

                                    <div id="oldCommentsContainer${postIdValue}" class="oldCommentsContainer">
                                    </div>
                                    
                                </div>
                                </div>
                    
                            </div>
                            
                        </div>`

                        console.log(postHtml);

                        $("#wallbodyPosts").append(postHtml);
                        }
                
                    });

                }
            
            });
            

        });

        $.ajax({
            url: "profilePhoto-Get-Process.php", 
            type: "POST",
            async: false,
            data: {
                "profileId": loggedProfileId
            },
            
        success: function(response){
            console.log(response);
    
            var response = JSON.parse(response);
    
            imageUrl = response.proPicImgPath.replace(/\\\//g, '/');
    
            console.log(imageUrl);
    
            if (response.message="gotProPic") {
                
                $("#postCreationPropic").attr("src", imageUrl);
                $(".newCommentProPic").attr("src", imageUrl);
                
            }
        }});
 
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

        setTimeout(function() {
            $("#goUpBtn").blur();
        });
    });


    $(window).resize(function() {

        if($(window).width()>768){
            $("#goUpBtn").show();
        }
        else{
            $("#goUpBtn").hide();
        }
      });

    
    

    $(document.body).on("click",".postLikeBtn", function(event){

        var likedPostId = $(this).attr('name');

        var clicks = $(this).data('clicks');

        

        if (clicks) {
            
            $(this).html(
                `<h6>Like <i class="bi bi-hand-thumbs-up"></i></h6>`
            );
            $(this).removeClass("btn-primary");
            $(this).addClass("btn-outline-primary");

            setTimeout(function() {
                $(".postLikeBtn").blur();
            });
                
            $.ajax({
    
                url: "backEnd/postLike-process.php", 
                type: "POST",
                data: {"postId" : likedPostId,
                        "likedProfileId" : loggedProfileId
                    },
    
    
                success: function(response){
                    console.log(response);
    
                    var response = JSON.parse(response);
    
                    msg = response.message;

                    if (msg=="postlikeRowDeleted") {
                        $.ajax({
                            url: "backEnd/postLike-Process.php", 
                            type: "POST",
                            async: false,
                            data: {"postIdforLikeCount" : likedPostId},
                            
                            success: function(response){
                
                                console.log(response);
                
                                var response = JSON.parse(response);
                
                                likeCount = response.likeCount;
                                likeCountContainerId="#likeCountPost"+likedPostId;

                                if (likeCount!="") {
                                    $(likeCountContainerId).html(likeCount);
                                }

                            }
                        });
                    }
            }});

            console.log("UnlikedPost");
            
        }
        else{
            $(this).html(
                `<h6>Liked <i class="bi bi-hand-thumbs-up-fill bi-likedIco"></i></h6>`
            );
            $(this).removeClass("btn-outline-primary");
            $(this).addClass("btn-primary");
            
            setTimeout(function() {
                $(".postLikeBtn").blur();
            });

            $.ajax({

                url: "backEnd/postLike-process.php", 
                type: "POST",
                data: {"postId" : likedPostId,
                        "profileId" : loggedProfileId
                    },
    
    
                success: function(response){
                    console.log(response);
    
                    var response = JSON.parse(response);
    
                    msg = response.message;

                    if (msg=="postlikeRowInserted") {
                        $.ajax({
                            url: "backEnd/postLike-Process.php", 
                            type: "POST",
                            async: false,
                            data: {"postIdforLikeCount" : likedPostId},
                            
                            success: function(response){
            
                                console.log(response);
                
                                var response = JSON.parse(response);
                
                                likeCount = response.likeCount;
                                likeCountContainerId="#likeCountPost"+likedPostId;
    
                                if (likeCount!="") {
                                    $(likeCountContainerId).html(likeCount);
                                }
    
                            }
                        });
                    }
            }});
            console.log("LikedPost");
        }

        $(this).data("clicks", !clicks);
    });

    $(document.body).on("click",".likedPostBtn", function(event){

        var likedPostId = $(this).attr('name');

        $(this).html(
            `<h6>Like <i class="bi bi-hand-thumbs-up"></i></h6>`
        );
        $(this).removeClass("btn-primary");
        $(this).addClass("btn-outline-primary");

        setTimeout(function() {
            button.blur();
        });
            
        $.ajax({

            url: "backEnd/postLike-process.php", 
            type: "POST",
            data: {"postId" : likedPostId,
                    "likedProfileId" : loggedProfileId
                },


            success: function(response){
                console.log(response);

                var response = JSON.parse(response);

                msg = response.message;

                if (msg=="postlikeRowDeleted") {
                    $.ajax({
                        url: "backEnd/postLike-Process.php", 
                        type: "POST",
                        async: false,
                        data: {"postIdforLikeCount" : likedPostId},
                        
                        success: function(response){
            
                            console.log(response);
            
                            var response = JSON.parse(response);
            
                            likeCount = response.likeCount;
                            likeCountContainerId="#likeCountPost"+likedPostId;

                            if (likeCount!="") {
                                $(likeCountContainerId).html(likeCount);
                            }

                        }
                    });
                }
        }});

        $(this).addClass("postLikeBtn");
        $(this).removeClass("likedPostBtn");
        console.log("UnlikedPost");
            
    });

    $(document.body).on("click",".commentSubmitBtn", function(event){

        var commentPostId = $(this).attr('name');

        commentPostIdValue = "#commentPostId"+commentPostId;

        postComment = $(commentPostIdValue).val();

        setTimeout(function() {
            $(".commentSubmitBtn").blur();
        });

        $.ajax({
            url: "profileDetails-Get-Process.php", 
            type: "POST",
            async: false,
            data: {
                "profileId": loggedProfileId
            },
            
            success: function(response){
                console.log(response);
    
                var response = JSON.parse(response);
    
                profilePic = response.profilePic;
                firstName = response.firstName;
                surname = response.surname;
                proFullName = firstName+" "+surname;

                $.ajax({
    
                    url: "backEnd/postComment-process.php", 
                    type: "POST",
                    async: false,
                    data: {"postId" : commentPostId,
                            "likedProfileId" : loggedProfileId,
                            "likedProPicImg" : profilePic,
                            "proFullName" : proFullName,
                            "postComment" : postComment,
                        },
        
        
                    success: function(response){
                        console.log(response);
        
                        var response = JSON.parse(response);
        
                        msg = response.message;
                        postCommentsArray = response.postCommentsArray;

                        oldCommentsContainer = "#oldCommentsContainer"+commentPostId;

                        if (msg == "gotArray") {

                            $(commentPostIdValue).val('');
                            
                            $(oldCommentsContainer).html('');
                        
                            console.log(postCommentsArray);
            
                            postCommentsArray.forEach(row => {
            
                                commentIdValue = row["commentId"];
                                commentProfileId = row["profileId"];
                                commentPostId = row["postId"];
                                comment = row["comment"];
                                commentprofilePic = row["profilePic"];
                                commenprofileName = row["profileName"];
                                commentdateTime = row["dateTime"];
                                commentdateTime = commentdateTime.slice(0, -3);

                                if (loggedProfileId == commentProfileId) {
                                    commentDeletebtn = `<div name="${commentPostId}" class="commentDeleteBtnContainer">
                                        <button name="${commentIdValue}" class="commentDeleteBtn"><i class="bi bi-trash3"></i></button>
                                    </div>`;
                                }
                                else{
                                    commentDeletebtn = "";
                                }
            
                                var oldCommentsHTML=
                                `<div class="oldComment mb-3">
                                    <div class="oldCommentPropicContainer">
                                        <img class="oldCommentPropic" src="profilePhotoImg/${commentprofilePic}" alt="Profile Photo">
                                    </div>
            
                                    <div class="oldCommentdetailsContainer">
                                        <div class="oldCommenterNameDateTimeContainer">
                                        <h6>${commenprofileName}</h6>
                                        <p class="commentDateTime">${commentdateTime}</p>
                                        </div>
                                        <div class="oldCommentContainer">
                                        <p name="${commentIdValue}">${comment}</p>
                                        ${commentDeletebtn}
                                        </div>
                                    </div>
                                                
                                </div>`;
            
                                console.log(oldCommentsHTML);
    
                                $(oldCommentsContainer).append(oldCommentsHTML);
                            });
                        }
                        if (msg == "noComments") {

                            $(oldCommentsContainer).html('');

                        }
                    
                    }
        
                });

        }});

    });

    $(document.body).on("click",".openCommentSection", function(event){

        var commentSectionPostId = $(this).attr('name');

        var clicks = $(this).data('clicks');

        oldCommentsContainer = "#oldCommentsContainer"+commentSectionPostId;

        setTimeout(function() {
            $(".openCommentSection").blur();
        });

        if (clicks) {

            $(oldCommentsContainer).html('');

        }
        else{
            
            $.ajax({
                url: "backEnd/postComment-process.php", 
                type: "POST",
                async: false,
                data: {"postIdForGetComments" : commentSectionPostId},
                
                success: function(response){
        
                    var response = JSON.parse(response);
                    msg = response.message;
                    postCommentsArray = response.postCommentsArray;
        
                    console.log(response);
        
                    if (msg == "gotArray") {
        
                        
                        console.log(postCommentsArray);
        
                        postCommentsArray.forEach(row => {
        
                            commentIdValue = row["commentId"];
                            commentProfileId = row["profileId"];
                            commentPostId = row["postId"];
                            comment = row["comment"];
                            commentprofilePic = row["profilePic"];
                            commenprofileName = row["profileName"];
                            commentdateTime = row["dateTime"];
                            commentdateTime = commentdateTime.slice(0, -3);

                            if (loggedProfileId == commentProfileId) {
                                commentDeletebtn = `<div name="${commentPostId}" class="commentDeleteBtnContainer">
                                    <button name="${commentIdValue}" class="commentDeleteBtn"><i class="bi bi-trash3"></i></button>
                                </div>`;
                            }
                            else{
                                commentDeletebtn = "";
                            }
        
                            var oldCommentsHTML=
                            `<div class="oldComment mb-3">
                                <div class="oldCommentPropicContainer">
                                    <img class="oldCommentPropic" src="profilePhotoImg/${commentprofilePic}" alt="Profile Photo">
                                </div>
        
                                <div class="oldCommentdetailsContainer">
                                    <div class="oldCommenterNameDateTimeContainer">
                                        <h6>${commenprofileName}</h6>
                                        <p class="commentDateTime">${commentdateTime}</p>
                                    </div>
                                    <div class="oldCommentContainer">
                                        <p name="${commentIdValue}">${comment}</p>
                                        ${commentDeletebtn}
                                    </div>

                                </div>
                                            
                            </div>`;
        
                            console.log(oldCommentsHTML);

                            $(oldCommentsContainer).append(oldCommentsHTML);
                        });
                    }
                    if (msg == "noComments") {

                        $(oldCommentsContainer).html('');
                    }
                }
        
            });
            
        }

        $(this).data("clicks", !clicks);
    
    });


    $(document.body).on("click",".commentDeleteBtn", function(event){

        var postCommentId = $(this).attr('name');
        var postId = $(this).parent('div.commentDeleteBtnContainer').attr('name');
        console.log(" Parent = "+postId);

        setTimeout(function() {
            $(".commentDeleteBtn").blur();
        });

        $.ajax({
            url: "backEnd/postComment-process.php", 
            type: "POST",
            async: false,
            data:  {"postCommentId" : postCommentId,
                    "postId" : postId
                    },
            
            success: function(response){
    
                var response = JSON.parse(response);
                msg = response.message;
                postCommentsArray = response.postCommentsArray;
    
                console.log(response);

                oldCommentsContainer = "#oldCommentsContainer"+postId;
                
    
                if (msg == "gotArray") {
    
                    
                    console.log(postCommentsArray);

                    $(oldCommentsContainer).html('');
    
                    postCommentsArray.forEach(row => {
    
                        commentIdValue = row["commentId"];
                        commentProfileId = row["profileId"];
                        commentPostId = row["postId"];
                        comment = row["comment"];
                        commentprofilePic = row["profilePic"];
                        commenprofileName = row["profileName"];
                        commentdateTime = row["dateTime"];
                        commentdateTime = commentdateTime.slice(0, -3);

                        if (loggedProfileId == commentProfileId) {
                            commentDeletebtn = `<div name="${commentPostId}" class="commentDeleteBtnContainer">
                                <button name="${commentIdValue}" class="commentDeleteBtn"><i class="bi bi-trash3"></i></button>
                            </div>`;
                        }
                        else{
                            commentDeletebtn = "";
                        }
    
                        var oldCommentsHTML=
                        `<div class="oldComment mb-3">
                            <div class="oldCommentPropicContainer">
                                <img class="oldCommentPropic" src="profilePhotoImg/${commentprofilePic}" alt="Profile Photo">
                            </div>
    
                            <div class="oldCommentdetailsContainer">
                                <div class="oldCommenterNameDateTimeContainer">
                                    <h6>${commenprofileName}</h6>
                                    <p class="commentDateTime">${commentdateTime}</p>
                                </div>
                                <div class="oldCommentContainer">
                                    <p name="${commentIdValue}">${comment}</p>
                                    ${commentDeletebtn}
                                </div>

                            </div>
                                        
                        </div>`;
    
                        console.log(oldCommentsHTML);

                        $(oldCommentsContainer).append(oldCommentsHTML);
                    });
                }
                if (msg == "noComments") {

                    $(oldCommentsContainer).html('');
                }
            }
    
        });
    
    });

 

});