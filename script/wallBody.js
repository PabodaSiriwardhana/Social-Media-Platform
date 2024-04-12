$(document).ready(function(){

    setTimeout(function() {
        $("#loadingSpinner").fadeOut();
    }, 1000);

    var wallBody;
    var likeCount;
    var oldComments;

    scrollDistanceforGoUpBtn();
    WindowWidthforGoUpBtn();

    $("#goUpBtn").hide();

    $(window).resize(function() {
        WindowWidthforGoUpBtn();
    });

    $(window).scroll(function() {
        scrollDistanceforGoUpBtn();
    });

    function WindowWidthforGoUpBtn() {

        var windowWidth = $(window).width();

        if(windowWidth<769){
            $("#goUpBtn").hide();
        }
        else{
            var scrollDistance = $(window).scrollTop();
            
            if (scrollDistance > 100) {
                $("#goUpBtn").fadeIn();
            }
            else{
                $("#goUpBtn").hide();
            }
        }
    }

    function scrollDistanceforGoUpBtn() {
        
        var scrollDistance = $(window).scrollTop();

        if(scrollDistance > 100){
            var windowWidth = $(window).width();

            if (windowWidth<769) {
                $("#goUpBtn").hide();
            } else {
                $("#goUpBtn").fadeIn();
            }
        }
        else{
            $("#goUpBtn").fadeOut();
        }
    }

  
    $("#goUpBtn").click(function() {
        $("html, body").animate({ scrollTop: 0 });

        setTimeout(function() {
            $("#goUpBtn").blur();
        });
    });


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
            url: "backEnd/postLikeCommentCount-process.php", 
            type: "POST",
            async: false,
            data: {"postIdforLikeCommentCount" : postId},
            
                success: function(response){

                    console.log(response);

                    var response = JSON.parse(response);

                    likeCount = response.likeCount;
                    commentCount = response.commentCount;

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
                                posttxt = `<div id="postText${postIdValue}" name="${postIdValue}" class="postText  mt-4 col-12 col-sm-12 col-md-12 col-lg-10">${response.text}</div>`;
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

                            if ($.inArray(postIdValue, postIdArrayfromPostLike) !== -1) {
                                btnPart = `class="likedPostBtn likeBtn btn btn-primary">
                                <h6>Liked <i class="bi bi-hand-thumbs-up-fill bi-likedIco"></i></h6>`
                            } else {
                                btnPart = `class="postLikeBtn likeBtn btn btn-outline-primary">
                                <h6>Like <i class="bi bi-hand-thumbs-up"></i></h6>`
                            }


                            if (loggedProfileId==profileId) {
                                postSettingsBtn = `<div class="postsettingsContainer btn-group">
                                <button class="dropdown-toggle postSettings-dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true"><i class="bi bi-three-dots"></i></button>

                                <ul class="dropdown-menu dropdown-menu-end">
                                <li><button id="postTextEditBtn${postIdValue}" name="${postIdValue}"  type="button" class="postTextEditBtn btn btn-secondary mb-4"  data-bs-toggle="modal" data-bs-target="#postTextEditModal">Edit Text<i class="bi bi-pencil"></i></button></li>

                                <li><button id="postDeleteBtn${postIdValue}" name="${postIdValue}" type="button" class="postDeleteBtn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#postDeleteModal">Delete Post<i class="bi bi-trash3"></i></button></li>
                                </ul>
                            </div>`;
                            }
                            else{
                                postSettingsBtn="";
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
                                    <h5 id="commentCountPost${postIdValue}">${commentCount}</h5>
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
                                    <input class="postCommentInput" id="commentPostId${postIdValue}" name="${postIdValue}"  placeholder="Write a comment..." type="text">
                                    <button id="commentSubmitBtn${postIdValue}" name="${postIdValue}" class="commentSubmitBtn btn btn-primary" disabled><i class="bi bi-send"></i></button>
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
            url: "backEnd/profilePhoto-Get-Process.php", 
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
                            url: "backEnd/postLikeCommentCount-process.php", 
                            type: "POST",
                            async: false,
                            data: {"postIdforLikeCommentCount" : likedPostId},
                            
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
                            url: "backEnd/postLikeCommentCount-process.php", 
                            type: "POST",
                            async: false,
                            data: {"postIdforLikeCommentCount" : likedPostId},
                            
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
                        url: "backEnd/postLikeCommentCount-process.php", 
                            type: "POST",
                            async: false,
                            data: {"postIdforLikeCommentCount" : likedPostId},
                        
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
            url: "backEnd/profileDetails-Get-Process.php", 
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

                            $.ajax({
                                url: "backEnd/postLikeCommentCount-process.php", 
                                    type: "POST",
                                    async: false,
                                    data: {"postIdforLikeCommentCount" : commentPostId},
                                
                                success: function(response){
                    
                                    console.log(response);
                    
                                    var response = JSON.parse(response);
                    
                                    commentCount = response.commentCount;
    
                                    commentCountContainerId="#commentCountPost"+commentPostId;
        
                                    if (commentCount!=="") {
                                        $(commentCountContainerId).html(commentCount);
                                    }
        
                                }
                            });

                            $(commentPostIdValue).val('');

                            $("#commentSubmitBtn" + commentPostId).attr("disabled", "disabled");
                            
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
                                        <button name="${commentIdValue}" class="commentDeleteBtn" data-bs-toggle="modal" data-bs-target="#commentDeleteModal"><i class="bi bi-trash3"></i></button>
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
                    
                    }
        
                });

        }});

    });

    $(document.body).on("click",".openCommentSection", function(event){

        var postId = $(this).attr('name');

        var clicks = $(this).data('clicks');

        oldCommentsContainer = "#oldCommentsContainer"+postId;

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
                data: {"postIdForGetComments" : postId},
                
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
                                    <button name="${commentIdValue}" class="commentDeleteBtn" data-bs-toggle="modal" data-bs-target="#commentDeleteModal"><i class="bi bi-trash3"></i></button>
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


    $(document.body).on("click", ".postCommentInput", function(event) {
        var postCommentInputId = $(this).attr('id');
        var postId = $(this).attr('name');
    
        $("#" + postCommentInputId).on("input", function() {
            var inputValue = $.trim($(this).val());

            ;
            if (inputValue !== "") {
                $("#commentSubmitBtn" + postId).removeAttr("disabled");
            } else {
                $("#commentSubmitBtn" + postId).attr("disabled", "disabled");
            }
        });
    });


    var postCommentId;
    var postId;

    $(document.body).on("click", ".commentDeleteBtn", function(event) {
        postCommentId = $(this).attr('name');
        postId = $(this).parent('div.commentDeleteBtnContainer').attr('name');

        setTimeout(function() {
            $(".commentDeleteBtn").blur();
        });
        
        return { postCommentId: postCommentId, postId: postId };
    });


    $(document.body).on("click", "#commentDeleteModalbtn", function() {
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

                $.ajax({
                    url: "backEnd/postLikeCommentCount-process.php", 
                        type: "POST",
                        async: false,
                        data: {"postIdforLikeCommentCount" : postId},
                    
                    success: function(response){
        
                        console.log(response);
        
                        var response = JSON.parse(response);
        
                        commentCount = response.commentCount;

                        commentCountContainerId="#commentCountPost"+postId;

                        if (commentCount!="") {
                            $(commentCountContainerId).html(commentCount);
                        }

                    }
                });
                
    
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
                                <button name="${commentIdValue}" class="commentDeleteBtn" data-bs-toggle="modal" data-bs-target="#commentDeleteModal"><i class="bi bi-trash3"></i></button>
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


    var commentDeleteBtnPostId; 

    $(document.body).on("click", ".postDeleteBtn", function(event) {
        commentDeleteBtnPostId = $(this).attr('name');
        return commentDeleteBtnPostId; 
    });

    $(document.body).on("click", "#postDeleteModalbtn", function() {

        $.ajax({
            url: "backEnd/postEditDelete-process.php", 
            type: "POST",
            data: {"postId" : commentDeleteBtnPostId},

            success: function(response) {

                console.log(response);
                var response = JSON.parse(response);
                msg = response.message;
                deletedPostId = response.deletedPostId;
                deletediImageName = response.deletediImageName;

                if (msg == "postDeleted") {
                    $("#postId"+deletedPostId).remove();
                }

                $.ajax({
                    url: "backEnd/deletePhysicalFiles-process.php", 
                    type: "POST",
                    data: {"deletediImageName" : deletediImageName},
                });
            }
        });
    });

    var postIdforupdatedText ;

    $(document.body).on("click", ".postTextEditBtn", function(event) {
        postTextEditPostId = $(this).attr('name');
        console.log(postTextEditPostId);

        $.ajax({
            url: "backEnd/postEditDelete-process.php", 
            type: "POST",
            data: {"postIdforTextEdit" : postTextEditPostId},

            success: function(response) {

                console.log(response);
                var response = JSON.parse(response);
                msg = response.message;
                postIdforupdatedText  = response.postId;
                existPostText = response.existPostText;

                if (msg == "gotPostText") {
                    $("#textareaModalInput").val(existPostText);
                    return postIdforupdatedText;
                }
                else{
                    return postIdforupdatedText;
                }
            }
        });
    });

    $(document.body).on("click", "#postTextEditModalbtn", function() {

        updatedPostText = $("#textareaModalInput").val();
        $("#textareaModalInput").val('');

        $.ajax({
            url: "backEnd/postEditDelete-process.php", 
            type: "POST",
            data: {"updatedPostText" : updatedPostText,
                    "postIdforupdatedText" : postIdforupdatedText,
                    },

            success: function(response) {

                console.log(response);
                var response = JSON.parse(response);
                msg = response.message;
                postId = response.postId;
                updatedPostText = response.updatedPostText;

                postIdforUpdatedText = "#postText"+postId;

                if (msg == "postTextUpdated") {
                    $(postIdforUpdatedText).html(updatedPostText);
                    
                }
            }
        });
    });
    
});