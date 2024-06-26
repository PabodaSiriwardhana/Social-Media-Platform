$(document).ready(function(){

    setTimeout(function() {
        $("#loadingSpinner").fadeOut();
    }, 1000);


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

                $("#profilePic").attr("src", imageUrl);
                
            }
    }});

    $.ajax({
        url: "backEnd/profileDetails-Get-Process.php", 
        type: "POST",
        data: {"profileId" : profileId},
        
        success: function(response){
            console.log(response);

            var response = JSON.parse(response);

            proId = response.proId;
            msg = response.message;
            firstName = response.firstName;
            surname = response.surname;
            birthday = response.birthday;
            gender = response.gender;
            email = response.email;

            if (msg=="gotProDetails") {
                
                $("#profileName").html(firstName+" "+surname);
                $("#profileEmail").html(email);
                $("#profileFname").html(firstName);
                $("#profileSname").html(surname);
                $("#profileBday").html(birthday);
                $("#profileGender").html(gender);
                
            }

    }});

    $("#proDetailsEditCard").hide();
    $("#propicEditCard").hide();
    $("#pwEditCard").hide();
    $("#deleteAccCard").hide();

    // EDIT DETAILS
    $("#editDetailsBtn").click(function(){
        
        $.ajax({
            url: "backEnd/profileDetails-Get-Process.php", 
            type: "POST",
            data: {"profileId" : profileId},
            
            success: function(response){
                console.log(response);

                var response = JSON.parse(response);

                proId = response.proId;
                msg = response.message;
                firstName = response.firstName;
                surname = response.surname;
                birthday = response.birthday;
                gender = response.gender;
                email = response.email;

                if (msg=="gotProDetails") {
                    
                    $("#newFName").val(firstName);
                    $("#newSurame").val(surname);
                    $("#newBday").val(birthday);
                    if (gender == "Male") {
                        $("#maleRadio").prop("checked", true);
                    } else {
                        $("#femaleRadio").prop("checked", true);
                    }
                    $("#newEmail").val(email);
                    
                }
    
        }});
        
        $("#pwEditCard").hide();
        $("#propicEditCard").hide();
        $("#deleteAccCard").hide();
        $("#proDetailsEditCard").show();

        $('html, body').animate({
            scrollTop: $("#proDetailsEditCard").offset().top
        });
    
    })
    
    $("#cancelUpdatedetailsBtn").click(function(){
        
        $("#proDetailsEditCard").hide();
        $("#proDetailsMsgboxContainer").hide();

        $('html, body').animate({
            scrollTop: $("#proDetailsCard").offset().top
        });
    
    })
    
    $("#resetDetailsFormBtn").click(function(){
 
        $.ajax({
            url: "backEnd/profileDetails-Get-Process.php", 
            type: "POST",
            data: {"profileId" : profileId},
            
            success: function(response){
                console.log(response);

                var response = JSON.parse(response);

                proId = response.proId;
                msg = response.message;
                firstName = response.firstName;
                surname = response.surname;
                birthday = response.birthday;
                gender = response.gender;
                email = response.email;

                if (msg=="gotProDetails") {
                    
                    $("#newFName").val(firstName);
                    $("#newSurame").val(surname);
                    $("#newBday").val(birthday);
                    if (gender == "Male") {
                        $("#maleRadio").prop("checked", true);
                    } else {
                        $("#femaleRadio").prop("checked", true);
                    }
                    $("#newEmail").val(email);
                    
                }
    
        }});
    
    })

    $("#updateProDetailsModalbtn").click(function(event){
        event.preventDefault();

        var newFName = $('#newFName').val();
        var newSurame = $('#newSurame').val();
        var newBday = $('#newBday').val();
        var myRadio = $('input[type="radio"]');
        var checkedValue = myRadio.filter(":checked").val();
        if ( checkedValue == undefined){
        var newGender = "null";
        }
        else{
        var newGender = checkedValue;
        };
        var newEmail = $('#newEmail').val();
        
        var form_data = new FormData();
        form_data.append("newFName",newFName);
        form_data.append("newSurame",newSurame);
        form_data.append("newBday",newBday);
        form_data.append("newGender",newGender);
        form_data.append("newEmail",newEmail);
        form_data.append("profileId",profileId);

        $.ajax({
            url: "backEnd/profileDetails-Update-Process.php", 
            type: "POST",
             dataType: 'script',
             cache: false,
             contentType: false,
             processData: false,
             data: form_data,
            
            success: function(response){
                console.log(response);

                var response = JSON.parse(response);

                proId = response.proId;
                msg = response.message;
                 

                if (msg=="userDetailsUpdated") {

                    $.ajax({
                        url: "backEnd/profileDetails-Get-Process.php", 
                        type: "POST",
                        data: {"profileId" : profileId},
                        
                        success: function(response){
                            console.log(response);
                
                            var response = JSON.parse(response);
                
                            proId = response.proId;
                            msg = response.message;
                            firstName = response.firstName;
                            surname = response.surname;
                            birthday = response.birthday;
                            gender = response.gender;
                            email = response.email;

                            oldCommentProName = ".oldCommentProName"+proId;
                
                            if (msg=="gotProDetails") {
                                
                                $("#profileName").html(firstName+" "+surname);
                                $(".postProNameInProfile").html(firstName+" "+surname);
                                $(oldCommentProName).html(firstName+" "+surname);
                                $("#profileEmail").html(email);
                                $("#profileFname").html(firstName);
                                $("#profileSname").html(surname);
                                $("#profileBday").html(birthday);
                                $("#profileGender").html(gender);

                                $('html, body').animate({
                                    scrollTop: $("#proDetailsCard").offset().top
                                });
                                
                                $("#proDetailsEditCard").hide();
                                $("#msgboxContainer").show();
                                $("#proDetailsMsgboxContainer").hide();
            
                                $("#msgboxContainer").html('<div class="alert alert-success" role="alert">Profile Details Updated!</div>');
            
                                setTimeout(function() {
                                    $("#msgboxContainer").fadeOut();
                                }, 2000);
                                
                            }
                            if (msg=="error") {
                    
                                $('html, body').animate({
                                    scrollTop: $("#proDetailsEditCard").offset().top
                                });
            
                                setTimeout(function() {
                                    $("#proDetailsMsgboxContainer").fadeOut();
                                },);
                                
                                setTimeout(function() {
                                    $("#proDetailsMsgboxContainer").fadeIn();
                                });
            
                                $("#proDetailsMsgboxContainer").html('<div class="alert alert-danger" role="alert">Somthing went wrong. Please try again!</div>');
                                
                            }
                
                    }});

                    

                    
                }
                if (msg=="empty") {
                    
                    $('html, body').animate({
                        scrollTop: $("#proDetailsEditCard").offset().top
                    });

                    setTimeout(function() {
                        $("#proDetailsMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#proDetailsMsgboxContainer").fadeIn();
                    });

                    $("#proDetailsMsgboxContainer").html('<div class="alert alert-warning" role="alert">All the details are required!</div>');
                    
                }
                if (msg=="exist") {
                    
                    $('html, body').animate({
                        scrollTop: $("#proDetailsEditCard").offset().top
                    });
                    
                    setTimeout(function() {
                        $("#proDetailsMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#proDetailsMsgboxContainer").fadeIn();
                    });
                    
                    $("#proDetailsMsgboxContainer").html('<div class="alert alert-danger" role="alert">Already exist an another account with this email!</div>');
                    
                }
                if (msg=="invalidDate") {
                    
                    $('html, body').animate({
                        scrollTop: $("#proDetailsEditCard").offset().top
                    });
                    
                    setTimeout(function() {
                        $("#proDetailsMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#proDetailsMsgboxContainer").fadeIn();
                    });
                    
                    $("#proDetailsMsgboxContainer").html('<div class="alert alert-danger" role="alert">Please enter Birthday correctly!</div>');
                    
                }
                if (msg=="underAge") {
                    
                    $('html, body').animate({
                        scrollTop: $("#proDetailsEditCard").offset().top
                    });
                    
                    setTimeout(function() {
                        $("#proDetailsMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#proDetailsMsgboxContainer").fadeIn();
                    });
                    
                    $("#proDetailsMsgboxContainer").html('<div class="alert alert-danger" role="alert">Your age must be at least 16 years old!</div>');
                    
                }
                if (msg=="error") {
                    
                    $('html, body').animate({
                        scrollTop: $("#proDetailsEditCard").offset().top
                    });

                    setTimeout(function() {
                        $("#proDetailsMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#proDetailsMsgboxContainer").fadeIn();
                    });

                    $("#proDetailsMsgboxContainer").html('<div class="alert alert-danger" role="alert">Somthing went wrong. Please try again!</div>');
                    
                }
        }});

    });

    // CHANGE PASSWORD
    $("#editPwBtn").click(function(){

        $('#oldPw').val('');
        $('#newPw').val('');
        $('#cNewPw').val('');
        
        $("#pwEditCard").show();
        $("#proDetailsEditCard").hide();
        $("#deleteAccCard").hide();
        $("#propicEditCard").hide();
        $("#proPWMsgboxContainer").hide();

        $('html, body').animate({
            scrollTop: $("#pwEditCard").offset().top
        });
    
    })

    $("#resetPWFormBtn").click(function(){

        $('#oldPw').val('');
        $('#newPw').val('');
        $('#cNewPw').val('');
    
    })

    $("#cancelUpdatePwBtn").click(function(){

        $('#oldPw').val('');
        $('#newPw').val('');
        $('#cNewPw').val('');
        
        $("#pwEditCard").hide();
        $("#proPWMsgboxContainer").hide();

        $('html, body').animate({
            scrollTop: $("#proDetailsCard").offset().top
        });
    
    })

    $("#updateProPWModalbtn").click(function(event){
        event.preventDefault();

        var oldPassword = $('#oldPw').val();
        var newPassword = $('#newPw').val();
        var cNewPassword = $('#cNewPw').val();
        
        var form_data = new FormData();
        form_data.append("oldPassword",oldPassword);
        form_data.append("newPassword",newPassword);
        form_data.append("cNewPassword",cNewPassword);
        form_data.append("profileId",profileId);

        $.ajax({
            url: "backEnd/profilePassword-Update-Process.php", 
            type: "POST",
             dataType: 'script',
             cache: false,
             contentType: false,
             processData: false,
             data: form_data,
            
            success: function(response){
                console.log(response);

                var response = JSON.parse(response);

                proId = response.proId;
                msg = response.message;
                 

                if (msg=="userPWUpdated") {
                    
                    $('html, body').animate({
                        scrollTop: $("#proDetailsCard").offset().top
                    });
                    
                    $("#pwEditCard").hide();
                    $("#msgboxContainer").show();
                    $("#proPWMsgboxContainer").hide();

                    $("#msgboxContainer").html('<div class="alert alert-success" role="alert">Password Updated!</div>');

                    $('#oldPw').val('');
                    $('#newPw').val('');
                    $('#cNewPw').val('');

                    setTimeout(function() {
                        $("#msgboxContainer").fadeOut();
                    }, 2000);

                    
                }
                if (msg=="empty") {
                    
                    $('html, body').animate({
                        scrollTop: $("#pwEditCard").offset().top
                    });

                    setTimeout(function() {
                        $("#proPWMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#proPWMsgboxContainer").fadeIn();
                    });

                    $("#proPWMsgboxContainer").html('<div class="alert alert-warning" role="alert">All the details are required with valid characters!</div>');
                    
                }
                if (msg=="oldPWIncorrect") {
                    
                    $('html, body').animate({
                        scrollTop: $("#pwEditCard").offset().top
                    });

                    setTimeout(function() {
                        $("#proPWMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#proPWMsgboxContainer").fadeIn();
                    });
                    
                    $("#proPWMsgboxContainer").html('<div class="alert alert-danger" role="alert">Old Password is incorrect!</div>');
                    
                }
                if (msg=="6chars") {
                    
                    $('html, body').animate({
                        scrollTop: $("#pwEditCard").offset().top
                    });

                    setTimeout(function() {
                        $("#proPWMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#proPWMsgboxContainer").fadeIn();
                    });
                    
                    $("#proPWMsgboxContainer").html('<div class="alert alert-warning" role="alert">New Password should contain atleast 6 characters!</div>');
                    
                }
                if (msg=="PWandCPWnotmatch") {
                    
                    $('html, body').animate({
                        scrollTop: $("#pwEditCard").offset().top
                    });

                    setTimeout(function() {
                        $("#proPWMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#proPWMsgboxContainer").fadeIn();
                    });
                    
                    $("#proPWMsgboxContainer").html('<div class="alert alert-danger" role="alert">New Password and Confirm New Password does not match!</div>');
                    
                }
                if (msg=="error") {

                    
                    $('html, body').animate({
                        scrollTop: $("#pwEditCard").offset().top
                    });

                    setTimeout(function() {
                        $("#proPWMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#proPWMsgboxContainer").fadeIn();
                    });

                    $("#proPWMsgboxContainer").html('<div class="alert alert-danger" role="alert">Somthing went wrong. Please try again!</div>');
                    
                }
        }});

    });

    // UPDATE PROFILE PHOTO
    $("#propicUpl").change(function(){
        readURL(this);
        $("#uplProPicBtn").hide();
        $("#deleteAccCard").hide();
        $("#proDetailsEditCard").hide();
        $("#pwEditCard").hide();
        $("#propicEditCard").show();

        $('html, body').animate({
            scrollTop: $("#propicEditCard").offset().top
        });

    });

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
    
    $("#cancelUpdatePropicBtn").click(function(){
        $("#propicEditCard").hide();
        $("#propicMsgboxContainer").hide();
        $("#uplProPicBtn").show()

        $('#propicUpl').val('');
    });


    $("#updatePropicBtn").click(function(event){
        event.preventDefault();
        
        $("#propicEditCard").hide();
        $("#propicMsgboxContainer").hide();
        $("#uplProPicBtn").show();

        var file_data = $('#propicUpl').prop('files')[0];
        
        var form_data = new FormData();
        form_data.append("file",file_data);
        form_data.append("profileId",profileId);

        console.log(file_data);

        $.ajax({
            url: "backEnd/profilePhoto-Update-Process.php", 
            type: "POST",
             dataType: 'script',
             cache: false,
             contentType: false,
             processData: false,
             data: form_data,
            
            success: function(response){
                console.log(response);

                var response = JSON.parse(response);

                imageUrl = response.proPicImgPath.replace(/\\\//g, '/');
                msg = response.message;
                deletedProPic = response.deletedProPic;

                oldCommentProPic = ".oldCommentProPic"+profileId;
                 

                if (msg=="proPicUpdated") {
                    $("#msgboxContainer").html('<div class="alert alert-success" role="alert">Profile Photo Updated!</div>');

                    $("#profilePic").attr("src", imageUrl);
                    $("#profile").attr("src", imageUrl);
                    $(".postProPicInProfile").attr("src", imageUrl);
                    $(oldCommentProPic).attr("src", imageUrl);

                    $('#propicUpl').val('');

                    setTimeout(function() {
                        $("#msgboxContainer").fadeOut();
                    }, 2000);

                    $('html, body').animate({
                        scrollTop: $("#proDetailsCard").offset().top
                    });
                    
                }
                if (msg=="error") {
                    $("#propicMsgboxContainer").html('<div class="alert alert-danger" role="alert">Something went wrong. Please try again!</div>');

                    $('#propicUpl').val('');

                    
                    setTimeout(function() {
                        $("#propicMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#propicMsgboxContainer").fadeIn();
                    });
                    
                }
                if (deletedProPic!="") {

                    $.ajax({
                        url: "backEnd/deletePhysicalFiles-process.php", 
                        type: "POST",
                        data: {"deletedProPic" : deletedProPic},
                    });
                }
            }
    });

    });

    // DELETE ACCOUNT
    $("#deleteAccBtn").click(function(){
        readURL(this);
        $("#pwEditCard").hide();
        $("#proDetailsEditCard").hide();
        $("#propicEditCard").hide();
        $("#deleteAccMsgboxContainer").hide();
        $("#deleteAccCard").show();

        $('html, body').animate({
            scrollTop: $("#deleteAccCard").offset().top
        });

    });

    $("#cancelDeleteAccBtn").click(function(){
        readURL(this);
        $("#pwEditCard").hide();
        $("#proDetailsEditCard").hide();
        $("#propicEditCard").hide();
        $("#deleteAccMsgboxContainer").hide();
        $("#deleteAccCard").hide();

        $('#confPW').val('');

        $('html, body').animate({
            scrollTop: $("#proDetailsCard").offset().top
        });

    });

    function removeCookie(cookieName, options) {
        options = options || {};
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + (options.path || '/');
    }


    $("#deleteAccModalbtn").click(function(event){
        event.preventDefault();

        var pwConfirmation = $('#confPW').val();

        $.ajax({
            url: "backEnd/deleteAccount-process.php", 
            type: "POST",
            data: {"profileId" : profileId,
                    "password" : pwConfirmation
                    },
            
            success: function(response){
                console.log(response);

                var response = JSON.parse(response);

                msg = response.message;

                if (msg=="accountDeleted") {

                    removeCookie('pabz-profileId', { path: '/' });


                    window.location.href = 'http://localhost/pabz/home.php?message=accountDeleted';
                    
                    
                    
                }
                if (msg=="error") {
                    $("#deleteAccMsgboxContainer").html('<div class="alert alert-danger" role="alert">Something went wrong. Please try again!</div>');

                    $('#confPW').val('');
                    
                    setTimeout(function() {
                        $("#deleteAccMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#deleteAccMsgboxContainer").fadeIn();
                    });
                }
                if (msg=="pwIncorrect") {
                    $("#deleteAccMsgboxContainer").html('<div class="alert alert-danger" role="alert">Password is incorrect!</div>');

                    $('#confPW').val('');

                    
                    setTimeout(function() {
                        $("#deleteAccMsgboxContainer").fadeOut();
                    },);
                    
                    setTimeout(function() {
                        $("#deleteAccMsgboxContainer").fadeIn();
                    });
                    
                }
            }
         });

    });

})