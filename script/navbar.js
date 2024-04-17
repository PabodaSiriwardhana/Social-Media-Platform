$(document).ready(function(){

    WindowWidthforNavbar()

    $(window).resize(function() {
        WindowWidthforNavbar();
    });

    function WindowWidthforNavbar() {

        var windowWidth = $(window).width();

        if(windowWidth>768){
            $("#footer-navbar").hide();
            $("#header-middle").show();
        }
        else{
            $("#footer-navbar").show();
            $("#header-middle").hide();
        }
    }


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


    if (window.location.href.indexOf('http://localhost/pabz/wall.php') !== -1) {
        $('#navbarWallbtn').css({
            'border-bottom': "3px solid white",
            'background-color': 'rgba(116, 185, 255,0.5)'
        });
        $('#footerWallbtn').css({
            'border-bottom': "3px solid white",
            'background-color': 'rgba(116, 185, 255,0.5)'
        });
    }


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
    
    $("#footerWallbtn").click(function(){
        $(location).attr('href','http://localhost/pabz/wall.php')
    });

})

    