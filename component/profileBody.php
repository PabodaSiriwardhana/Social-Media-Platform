<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/profileBody.css">
</head>
<body>

    <div id="loadingSpinner">
        <div class="spinner-border text-primary" role="status">
        </div>
        <div>
            <h2>Loading...</h2>
        </div>
    </div>

    <div class="profile-body">

        <div class="col-0 col-sm-0 col-md-1 col-lg-2 col-xl-3"></div>

        <div class="mb-5 col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6">

            <!-- PROFILE DETAILS -->
            <div class="card mb-4 " id="proDetailsCard">

                <div class="card-body">

                    <div class="main-pro-details mb-4">
                        <div class="pro-pic-container mb-0 mt-5">
                            
                            <img id="profilePic" alt="Profile Photo" >

                            <div class="propicuplbtn-container">

                                <label for="propicUpl" id="uplProPicBtn"  class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left" title="Upload A New Profile Photo"><i class="bi bi-camera"></i></label>

                            </div>

                        </div>

                        <input type="file" accept="image/*" id="propicUpl" name="propicUpl" style="visibility:hidden;">

                        <div class="pro-name-container mb-1">
                            <h2 id="profileName"></h2>
                        </div>
                        <div class="pro-email-container mb-5">
                            <h5 id="profileEmail"></h5>
                        </div>
                    </div>

                    <div class="mb-2" id="msgboxContainer"></div>

                    <div class="settingsBtn-container mb-4">
                            
                        <div class="btn-group">
                            
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true" >
                                Profile Settings<i class="bi bi-gear"></i>
                            </button>

                            <ul class="dropdown-menu  dropdown-menu-end">

                                <li class="mb-2"><button id="editDetailsBtn" type="button" class="btn btn-secondary"><p>Edit Details</p><i class="bi bi-pencil"></i></button></li>

                                <li><button id="editPwBtn" type="button" class="btn btn-secondary"><p>Change Password</p><i class="bi bi-pencil"></i></button></li>

                            </ul>
                        </div>
                    </div> 

                    <div class="pro-details-container">
                        <div class="detail-container">
                            <h4 class="prolbl1">First Name</h4>
                            <h4 class="prolbl2">:</h4>
                            <h4 class="proDetail" id="profileFname"></h4>
                        </div>

                        <div class="detail-container">
                            <h4 class="prolbl1">Surname</h4>
                            <h4 class="prolbl2">:</h4>
                            <h4 class="proDetail" id="profileSname"></h4>
                        </div>
                        
                        <div class="detail-container">
                            <h4 class="prolbl1">Birthday</h4>
                            <h4 class="prolbl2">:</h4>
                            <h4 class="proDetail" id="profileBday"></h4>
                        </div>
                        
                        <div class="detail-container mb-2">
                            <h4 class="prolbl1">Gender</h4>
                            <h4 class="prolbl2">:</h4>
                            <h4 class="proDetail" id="profileGender"></h4>
                        </div> 

                    </div>

                </div>
            
            </div>

            <!-- PROFILE PHOTO CHANGE -->
            <div class="card mb-5" id="propicEditCard">

                <div class="card-body mb-5">

                    <h3 class="mt-2 mb-4">Update Your Profile Photo</h3>

                    <div class="mb-2" id="propicMsgboxContainer"></div>

                    <img id="upImg" class="mb-4" src="#"  alt="your image" />

                    <div class="updateBtn-container mb-3">
                        <button id="updatePropicBtn" type="button" class="btn btn-primary btn-lg">Update Profile Photo<i class="bi bi-check2-circle"></i></button>
                    </div> 

                    <div class="cancelUpdateBtn mb-3">
                        <button id="cancelUpdatePropicBtn" type="button" class="btn btn-secondary">Cancel<i class="bi bi-x-circle"></i></button>
                    </div>

                </div>

            </div>

            <!-- PROFILE DETAILS EDIT -->
            <div class="card mb-5" id="proDetailsEditCard">

                <div class="card-body mb-5">

                    <h3 class="mt-2 mb-4">Update Your Details</h3>

                    <div class="mb-2" id="proDetailsMsgboxContainer"></div>

                    <form class="form" id="newDetailsForm">
                        <div class="mb-3 formSec">
                            <label for="newFName" class="form-label">First Name</label>
                            <input type="text" class="form-control" id="newFName" placeholder="Enter Your First Name" required>
                        </div>
                        <div class="mb-3 formSec">
                            <label for="newSurame" class="form-label">Surname</label>
                            <input type="text" class="form-control" id="newSurame" placeholder="Enter Your Surname" required>
                        </div>
                        <div class="mb-4 formSec">
                            <label for="newBday" class="form-label">Birthday</label>
                            <input id="newBday" type="text" onfocus="(this.type='date')" onblur="(this.type='text')" class="form-control" placeholder="Enter Your Birthday"  required>
                        </div>
                        <div class="mb-2 radiobtns">
                            <div class="radio maleRadio">
                                <input id="maleRadio" type="radio" class="formRadio" value="Male" name="newGender" required>
                                <label for="maleRadio">Male</label>
                            </div>

                            <div class="radio femaleRadio">
                                <input id="femaleRadio" type="radio" class="formRadio" value="Female" name="newGender" required>
                                <label for="femaleRadio">Female</label>
                            </div>
                        </div>
                        <div class="mb-5 formSec">
                            <label for="newEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="newEmail" placeholder="Enter Your E-mail" required>
                        </div> 

                    </form>

                    <div class="updateBtn-container mb-3">
                        <button id="updateDetailsBtn" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#updateProDetailsModal">Update Details<i class="bi bi-check2-circle"></i></button>
                    </div>
                    
                    <div class="cancelResetUpdateBtn-container mb-3">
                        <button id="resetDetailsFormBtn" type="button" class="btn btn-secondary">Reset<i class="bi bi-arrow-counterclockwise"></i></button>

                        <button id="cancelUpdatedetailsBtn" type="button" class="btn btn-secondary">Cancel<i class="bi bi-x-circle"></i></button>
                    </div>
                </div>

            </div>

            <!-- PASSWORD CHANGE -->
            <div class="card mb-5" id="pwEditCard">

                <div class="card-body mb-5">

                    <form class="form" id="newPasswordForm">

                        <h3 class="mt-2 mb-4">Update Your Password</h3>

                        <div class="mb-2" id="proPWMsgboxContainer"></div>

                        <div class="mb-3 formSec">
                            <label for="oldPw" class="form-label">Old Password</label>
                            <input type="password" class="form-control" id="oldPw" placeholder="Enter Your Old Password" required>
                        </div>

                        <div class="mb-3 formSec">
                            <label for="newPw" class="form-label">New Password</label>
                            <input type="password" class="form-control" id="newPw" placeholder="Enter Your New Password" required>
                        </div>

                        <div class="mb-5 formSec">
                            <label for="cNewPw" class="form-label">Confirm New Password</label>
                            <input type="password" class="form-control" id="cNewPw" placeholder="Confirm Your New Password" required>
                        </div>

                        

                    </form>

                    <div class="updateBtn-container mb-3">
                        <button id="updatePwBtn" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#updateProPWModal">Update Password<i class="bi bi-check2-circle"></i></button>
                    </div>

                    <div class="cancelResetUpdateBtn-container mb-3">
                        <button id="resetPWFormBtn" type="button" class="btn btn-secondary">Reset<i class="bi bi-arrow-counterclockwise"></i></button>

                        <button id="cancelUpdatePwBtn" type="button" class="btn btn-secondary">Cancel<i class="bi bi-x-circle"></i></button>
                    </div>

                </div>

            </div>


        </div>

        <div class="col-0 col-sm-0 col-md-1 col-lg-2 col-xl-3"></div>

    </div>

</body>
</html>