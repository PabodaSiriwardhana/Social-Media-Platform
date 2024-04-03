$(document).ready(function(){


    var postId =1;
    // var wallBody= "";

    // looping(postId);

    // function looping (postId){

    //     $.ajax({

    //         url: "backEnd/wallBody-Process.php", 
    //         type: "POST",
    //         data: {"postId" : postId},


    //         success: function(response){
    //             console.log(response);

    //             var response = JSON.parse(response);

    //             msg = response.message;
    //             postId = response.postId;

    //             if(msg=="gotPostDetails") {
    //                 looping(++postId);
    //             }
    //             if (msg=="noRow") {
    //                 lastPostId = postId;
    //                 console.log("lastPostId"+lastPostId);
    //                 foring(lastPostId);
    //             }

    //     }});

    // }

    // function foring(lastPostId) {

    //     for (let postId = 1; postId < lastPostId; postId++) {
                        
    //         $.ajax({
    //             url: "backEnd/wallBody-Process.php", 
    //             type: "POST",
    //             data: {"postId" : postId},
                
    //             success: function(response){
    //                 console.log(response);
        
    //                 var response = JSON.parse(response);
        
    //                 msg = response.message;
    //                 postId = response.postId;
    //                 if (response.text != null) {
    //                     posttxt = `<div class="postText mt-4">${response.text}</div>`;
    //                 }
    //                 else{
    //                     posttxt = "";
    //                 }
    //                 if (response.image != null) {
    //                     postimg =`<div class="postImagecontainer">
    //                             <img src="postImg/${response.image}" class="postImage mt-4">
    //                         </div>`;
    //                 }
    //                 else{
    //                     postimg="";
    //                 }
    //                 postdatetime = response.dateTime;
    //                 publisherfullName = response.fullName;
    //                 publisherpropic = response.profilePic;
        
    //                 wallBody +=
    //                 `<div class="card mb-5">

    //                     <div class="card-body post-container">
                  
    //                       <div class="post-header">
    //                           <div class="postPropicContainer">
    //                               <img src="profilePhotoImg/${publisherpropic}" class="publisherPropic"  alt="Profile Photo">
    //                           </div>
                  
    //                           <div class="postdetailsContainer">
    //                               <div class="publisherName">${publisherfullName}</div>
    //                               <div class="publishedDatetime">${postdatetime}</div>
    //                           </div>
    //                       </div>
                  
    //                       <div class="post-body">
    //                         ${posttxt}
    //                         ${postimg}
                              
    //                       </div>
                  
    //                     </div>
                        
    //                   </div>`

    //                   $("#wallbodyPosts").html(wallBody);
    //                   console.log(wallBody);
        
    //         }});
            
    //     }

        
        
    //     $("#wallbodyPosts").show();


        
    // }


    $.ajax({
        url: "backEnd/wallBody-Process.php", 
        type: "POST",
        data: {"postId" : postId},
        
        success: function(response){
            console.log(response);

            var response = JSON.parse(response);

            msg = response.message;
            postId = response.postId;
            posttxt = response.text;
            postimg = response.image;
            postdatetime = response.dateTime;
            publisherfullName = response.fullName;
            publisherpropic = response.profilePic;

            if (msg=="gotPostDetails") {
                
                $(".publisherPropic").attr("src", "profilePhotoImg/"+publisherpropic);
                $(".postImage").attr("src", "postImg/"+postimg);
                $(".publisherName").html(publisherfullName);
                $(".publishedDatetime").html(postdatetime);
                $(".postText").html(posttxt);
                
            }

    }});

});