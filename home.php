<!doctype html>
<html lang="en">
  <head>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!-- CSS FILE-->
    <link id="styleFile" rel="stylesheet" href="css/home.css">

    <title id="pageTitle">HOME | SIGNIN</title>
    <link rel="icon" href="logo/pabz-favicon-color.png" type="image/png">

  </head>

  <body>

    <!-- SIGNIN SECTION START-->
    <div class="row" id="signin">

        <div class="col-0 col-sm-1 col-md-2 col-lg-3"></div>

        <div class="col-12 col-sm-10 col-md-8 col-lg-6 wrapper " id="main">

            <div class="logosignin">
              <img src="logo/logo-no-background.png" alt="PABZ Logo">
            </div>

            <div id="signinMsgBox"></div>

            <div class="signinform-wrapper">

                  <form class="form form-signin">

                    <div class="form-field">
                      <label class="user" for="signinEmail"><span class="hidden">E-mail</span></label>
                      <input id="signinEmail" type="email" class="form-input" placeholder="E-mail" name="email"   required>
                    </div>

                    <div class="form-field">
                      <label class="lock" for="signinPassword"><span class="hidden">Password</span></label>
                      <input id="signinPassword" type="password" class="form-input" placeholder="Password" name="password" required>
                    </div>

                    <div class="form-field">
                      <input type="submit" id="signinBtn" value="Sign in">
                    </div>

                  </form>

                  <div class="signup-link">
                    <p id="goSignup">Don't have an account? SignUp</p>
                  </div>

            </div>

        </div>

        <div class="col-0 col-sm-1 col-md-2 col-lg-3"></div>
    </div>
    <!-- signin SECTION END-->




    <!-- SIGNUP SECTION START-->
    <div class="row hidden" id="signup">

        <div class="col-0 col-sm-1 col-md-2 col-lg-3"></div>

        <div class="col-12 col-sm-10 col-md-8 col-lg-6 wrapper" id="main">

            <div class="logoSignup">
              <img src="logo/logo-no-background.png" alt="PABZ Logo">
            </div>


            <div id="signupMsgBox"></div>

            <div class="signupform-wrapper">
          
                <form class="form form-signup" id="form">

                    <div class="form-name-fields">
                      <input id="firstName" type="text" class="form-nameInput" placeholder="First Name" name="firstName"  required>

                      <input id="surname" type="text" class="form-nameInput" placeholder="Surname" name="surname" required>
                    </div>

                    <div class="form-field">
                      <input id="birthday" type="text" onfocus="(this.type='date')" onblur="(this.type='text')" class="form-input" placeholder="Birthday" name="birthday" required>
                    </div>

                    <div class="form-gender-fields">

                        <div class="radio maleRadio">
                          <input id="maleRadio" type="radio" class="formRadio" value="Male" name="gender" required>
                          <label for="maleRadio">Male</label>
                        </div>

                        <div class="radio femaleRadio">
                          <input id="femaleRadio" type="radio" class="formRadio" value="Female" name="gender" required>
                          <label for="femaleRadio">Female</label>
                        </div>

                    </div>
      
                    <div class="form-field">
                      <input id="email" type="email" class="form-input" placeholder="E-mail" name="email" required>
                    </div>
      
                    <div class="form-field">
                      <input id="password" type="password" class="form-input" placeholder="Password" name="password" required>
                    </div>
      
                    <div class="form-field">
                      <input id="cPassword" type="password" class="form-input" placeholder="Confirm Password" name="cPassword" required>
                    </div>
      
                    <div class="form-field">
                      <input id="signupBtn" type="submit" value="Sign Up">
                    </div>

                </form>

                <div class="signin-link">
                  <p id="goSignin">Already have an account? SignIn</p>
                </div>

            </div>

        </div>

        <div class="col-0 col-sm-1 col-md-2 col-lg-3"></div>

    </div>
    <!-- SIGNUP SECTION ENDT-->


    <!-- SCRIPT FILES-->
    <script src="script/jquery-3.7.1.min.js"></script>
    <script src="script/signup.js"></script>
    <script src="script/signin.js"></script>
  </body>
  
    <!--Bootstrap SCRIPT-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

  
</html>
