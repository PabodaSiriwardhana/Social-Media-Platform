$(document).ready(function(){

    $("#upImg").hide();
    $("#publishBtn").hide();
    $("#removePhotoBtn").hide();

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

    $("#postUplImg").change(function(){
        readURL(this);
        $(this).hide();
        $("#upImgLbl").hide();
        $("#upImg").show();
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
            if ($('#postUplImg').val('')) {
                $("#publishBtn").show();
            }
            else{
                $("#publishBtn").hide();
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
        
        var form_data = new FormData();
        form_data.append("file",file_data);
        form_data.append("postTxt",postTxt);

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
                    $("#postMsgBox").html('<div class="alert alert-success" role="alert">Your post published on the wall !!</div>');
                }
                if(response=="empty"){
                    $("#postMsgBox").html('<div class="alert alert-warning" role="alert">Please add some content to your post before publishing!</div>');
                }
                if(response=="error"){
                    $("#postMsgBox").html('<div class="alert alert-danger" role="alert">Something went wrong. Try again!</div>');
                }

                
                $('#postUplImg').val('');
                $('#postTxtArea').val('');

                setTimeout(function() {
                    $("#postMsgBox").fadeOut();
                }, 5000);
                
        }});

    });

});