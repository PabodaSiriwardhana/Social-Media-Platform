$(document).ready(function(){

  $("#goSignup").click(function(){

    $('#signinEmail').val('');
    $('#signinPassword').val('');

    $('#signinMsgBox').hide();
    $('#signupMsgBox').hide();

    $("#signin").addClass("hidden");
    $("#signup").removeClass("hidden");
    $("#pageTitle").html('HOME | SIGNUP');

  })

  if ($('#accDeletenMsgBox').html !=="") {
    setTimeout(function() {
      $('#accDeletenMsgBox').fadeOut();
    }, 3000);
  }

  $('#signinMsgBox').hide();

    $("#signinBtn").click(function(event){
      event.preventDefault();

      var email = $('#signinEmail').val();
      var password  = $('#signinPassword').val();

      $.ajax({
        url: "backEnd/signin-process.php", 
        type: "POST",
        data: {
            'email':email, 
            'password':password,},
        
        success: function(response){
            console.log(response);
            if(response=="goWall"){
              window.location.href = "http://localhost/pabz/wall.php";
          }
            if(response=="empty"){
                $("#signinMsgBox").html('<div class="alert alert-warning" role="alert">Both E-mail and Password are required!</div>');
                $("#signinMsgBox").show();
            }
            if(response=="pwIncorrect"){
                $("#signinMsgBox").html('<div class="alert alert-danger" role="alert">Password is incorrect!</div>');
                $("#signinMsgBox").show();
            }
            if(response=="exist"){
                $("#signinMsgBox").html('<div class="alert alert-danger" role="alert">Account not found!</div>');
                $("#signinMsgBox").show();
            }
        
      }});
    });

  });
