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
      url: "signup-process.php", 
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
          if(response=="goSigninPg"){
              $("#pageTitle").html('HOME | SIGNIN');
              $("#signup").addClass("hidden");
              $("#signin").removeClass("hidden");
              $("#signinEmail").attr("value",email);
              $("#signinMsgBox").html('<div class="alert alert-success" role="alert">Account created Successfully!!</div>');
          }
          if(response=="empty"){
              $("#signupMsgBox").html('<div class="alert alert-warning" role="alert">All the details are required!</div>');
          }
          if(response=="6chars"){
              $("#signupMsgBox").html('<div class="alert alert-warning" role="alert">Password should contain atleast 6 characters!</div>');
          }
          if(response=="pwMatch"){
              $("#signupMsgBox").html('<div class="alert alert-danger" role="alert">Password and Confirm Password does not match!</div>');
          }
          if(response=="exist"){
              $("#signupMsgBox").html('<div class="alert alert-danger" role="alert">Already exist an account with this email!</div>');
          }
          if(response=="error"){
              $("#signupMsgBox").html('<div class="alert alert-danger" role="alert">Error creating your account! Please try again.</div>');
          }
        
      }});

    });

  });
