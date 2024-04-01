$(document).ready(function(){

    
    $("#footer-navbar").hide();

    if($(window).width()>768){
        $("#footer-navbar").hide();
        $("#header-middle").show();
    }
    else{
        $("#footer-navbar").show();
        $("#header-middle").hide();
    }

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

                $("#profile").attr("src", imageUrl);
                
            }
    }});

     $(window).resize(function() {

        if($(window).width()>768){
            $("#footer-navbar").hide();
            $("#header-middle").show();
        }
        else{
            $("#footer-navbar").show();
            $("#header-middle").hide();
        }
      });

})

    