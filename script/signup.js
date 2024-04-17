$(document).ready(function(){

  
  $("#goSignin").click(function(){

    $('#firstName').val('');
    $('#surname').val('');
    $('#birthday').val('');
    $('input[type="radio"]');
    $('input:radio[name="gender"]').prop('checked', false);
    $('#email').val('');
    $('#password').val('');
    $('#cPassword').val('');

    $('#signupMsgBox').hide();
    $('#signinMsgBox').hide();

    $("#signup").addClass("hidden");
    $("#signin").removeClass("hidden");
    $("#pageTitle").html('HOME | SIGNIN');

  })

  $("#signupBtn").click(function(event){
    event.preventDefault();

    var firstName = $('#firstName').val();
    var surname = $('#surname').val();
    var birthday = $('#birthday').val();
    var myRadio = $('input[type="radio"]');
    var checkedValue = myRadio.filter(":checked").val();
    if ( checkedValue == undefined){
      var gender = "null";
    }
    else{
      var gender = checkedValue;
    };
    var email = $('#email').val();
    var password  = $('#password').val();
    var cPassword  = $('#cPassword').val();


    $.ajax({
      url: "backEnd/signup-process.php", 
      type: "POST",
      data: {
          'firstName':firstName, 
          'surname':surname, 
          'birthday':birthday, 
          'gender':gender, 
          'email':email, 
          'password':password,
          'cPassword':cPassword},
      
      success: function(response){
          console.log(response);

          var response = JSON.parse(response);

          msg = response.message;
          email = response.email;

          if (msg=="underAge") {
            $("#signupMsgBox").html('<div class="alert alert-danger" role="alert">Your age must be at least 16 years old!</div>');
          }
          if (msg=="invalidDate") {
            $("#signupMsgBox").html('<div class="alert alert-danger" role="alert">Please enter Birthday correctly!</div>');
          }
          if(msg=="goSigninPg"){
            $('#firstName').val('');
            $('#surname').val('');
            $('#birthday').val('');
            $('input[type="radio"]');
            $('input:radio[name="gender"]').prop('checked', false);
            $('#email').val('');
            $('#password').val('');
            $('#cPassword').val('');

            $("#pageTitle").html('HOME | SIGNIN');
            $("#signup").addClass("hidden");
            $("#signin").removeClass("hidden");
            $("#signinEmail").val(email);
            $("#signinMsgBox").html('<div class="alert alert-success" role="alert">Account created Successfully!!</div>');

            $("#signinMsgBox").show();

            setTimeout(function() {
              $("#signinMsgBox").fadeOut();
            }, 2000);
          }
          if(msg=="empty"){
            $("#signupMsgBox").html('<div class="alert alert-warning" role="alert">All the details are required!</div>');
            $("#signupMsgBox").show();
          }
          if(msg=="6chars"){
              $("#signupMsgBox").html('<div class="alert alert-warning" role="alert">Password should contain atleast 6 characters!</div>');
              $("#signupMsgBox").show();
          }
          if(msg=="pwMatch"){
              $("#signupMsgBox").html('<div class="alert alert-danger" role="alert">Password and Confirm Password does not match!</div>');
              $("#signupMsgBox").show();
          }
          if(msg=="exist"){
              $("#signupMsgBox").html('<div class="alert alert-danger" role="alert">Already exist an account with this email!</div>');
              $("#signupMsgBox").show();
          }
          if(msg=="error"){
              $("#signupMsgBox").html('<div class="alert alert-danger" role="alert">Error creating your account! Please try again.</div>');
              $("#signupMsgBox").show();
          }
        
      }});

    });

  });
