$(document).ready(function(){

    $("#upImg").hide();
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

    $.ajax({
        url: "profileDetails-Get-Process.php", 
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

                $('html, body').animate({
                    scrollTop: $("#upImg").offset().top
                });
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

        $('#postUplImg').val('');

        if($('#postTxtArea').val().length==0){
            $("#publishBtn").hide();
        }
    });

    $('#postTxtArea').bind("keyup input paste",function(){

        if($(this).val().length>0){
            $("#publishBtn").show();
        }
        else{
            if ($('#postUplImg').val('') && $(this).val().length==0) {
                $("#publishBtn").hide();
            }
            else{
                $("#publishBtn").show();
            }
            
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
            url: "postCreation-process.php", 
            type: "POST",
             dataType: 'script',
             cache: false,
             contentType: false,
             processData: false,
             data: form_data,
            
            success: function(response){
                console.log(response);
                
                if(response=="postCreated"){
                    $("#postMsgBox").show();
                    $("#postMsgBox").html('<div class="alert alert-success" role="alert">Your post published on the wall !!</div>');

                    setTimeout(function() {
                        $("#postMsgBox").fadeOut();
                    }, 5000);
                }
                if(response=="empty"){
                    $("#postMsgBox").show();
                    $("#postMsgBox").html('<div class="alert alert-warning" role="alert">Please add some content to your post before publishing!</div>');

                    setTimeout(function() {
                        $("#postMsgBox").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#postMsgBox").fadeIn();
                    });
                }
                if(response=="error"){
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