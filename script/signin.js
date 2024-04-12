$(document).ready(function(){

  $("#goSignup").click(function(){

    $('#signinEmail').val('');
    $('#signinPassword').val('');

    $("#signin").addClass("hidden");
    $("#signup").removeClass("hidden");
    $("#pageTitle").html('HOME | SIGNUP');

})

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
            }
            if(response=="pwIncorrect"){
                $("#signinMsgBox").html('<div class="alert alert-danger" role="alert">The password that you have entered is incorrect!</div>');
            }
            if(response=="exist"){
                $("#signinMsgBox").html('<div class="alert alert-danger" role="alert">Account not found!</div>');
            }
        
      }});
    });

  });
