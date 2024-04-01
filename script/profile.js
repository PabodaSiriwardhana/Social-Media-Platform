$(document).ready(function(){

    var profileId = 3;

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

                $("#profilePic").attr("src", imageUrl);
                
            }
    }});

    $.ajax({
        url: "profileDetails-Get-Process.php", 
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

    // EDIT DETAILS
    $("#editDetailsBtn").click(function(){
        
        $.ajax({
            url: "profileDetails-Get-Process.php", 
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
    
    $("#resetFormBtn").click(function(){
 
        $.ajax({
            url: "profileDetails-Get-Process.php", 
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

    $("#updateDetailsBtn").click(function(event){
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
            url: "profileDetails-Update-Process.php", 
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
                        url: "profileDetails-Get-Process.php", 
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

                    $('html, body').animate({
                        scrollTop: $("#proDetailsCard").offset().top
                    });
                    
                    $("#proDetailsEditCard").hide();
                    $("#msgboxContainer").show();
                    $("#proDetailsMsgboxContainer").hide();

                    $("#msgboxContainer").html('<div class="alert alert-success" role="alert">Profile Details Updated!</div>');

                    setTimeout(function() {
                        $("#msgboxContainer").fadeOut();
                    }, 5000);

                    
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
        
        $("#pwEditCard").show();
        $("#proDetailsEditCard").hide();
        $("#proPWMsgboxContainer").hide();

        $('html, body').animate({
            scrollTop: $("#pwEditCard").offset().top
        });
    
    })

    $("#cancelUpdatePwBtn").click(function(){
        
        $("#pwEditCard").hide();
        $("#proPWMsgboxContainer").hide();

        $('html, body').animate({
            scrollTop: $("#proDetailsCard").offset().top
        });
    
    })

    $("#updatePwBtn").click(function(event){
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
            url: "profilePassword-Update-Process.php", 
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
                    }, 5000);

                    
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
            url: "profilePhoto-Update-Process.php", 
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
                 

                if (msg=="proPicUpdated") {
                    $("#msgboxContainer").html('<div class="alert alert-success" role="alert">Profile Photo Updated!</div>');

                    $("#profilePic").attr("src", imageUrl);
                    $("#profile").attr("src", imageUrl);

                    $('#propicUpl').val('');

                    setTimeout(function() {
                        $("#msgboxContainer").fadeOut();
                    }, 5000);
                    
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
        }});

    });

    
    

})