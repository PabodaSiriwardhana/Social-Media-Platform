$(document).ready(function(){

    // Get the value of a specific cookie by its name
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

    // Usage example
    const profileId = getCookie('pabz-profileId');
    console.log(profileId);

    
    $("#footer-navbar").hide();

    if($(window).width()>768){
        $("#footer-navbar").hide();
        $("#header-middle").show();
    }
    else{
        $("#footer-navbar").show();
        $("#header-middle").hide();
    }


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

    $("#myProfilebtn").click(function(){
        $(location).attr('href','http://localhost/pabz/profile.php')
    });
    
    function removeCookie(cookieName, options) {
        options = options || {};
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + (options.path || '/');
    }
    
    $("#logOutProfileModalbtn").click(function(){
        removeCookie('pabz-profileId', { path: '/' });
        $(location).attr('href','http://localhost/pabz/home.php')
    });
    
    $("#navbarWallbtn").click(function(){
        $(location).attr('href','http://localhost/pabz/wall.php')
    });

})

    