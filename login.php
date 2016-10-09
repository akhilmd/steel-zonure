<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <script type="text/javascript" src="./js/login_script.js"></script>

    <title>Chatit</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/login_style.css" rel="stylesheet">

    <!-- Custom Fonts -->

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>

    <!-- Navigation -->
    <div class="navbar navbar-default navbar-fixed-top transparent">
        <div class="container">
            <div class="navbar-header">
                <span class="logo-text navbar-brand">Chatit</span>
            </div>
            <center>
                <div class="navbar" id="navbar-main">
                    <form class="navbar-form navbar-right" method="post" action="index.php" name="loginform">
                        <div class="form-group">
                            <input id="login_input_username" type="text" class="form-control" name="user_name" placeholder="Username" required>
                        </div>
                        <div class="form-group">
                            <input id="login_input_password" type="password" class="form-control" name="user_password" autocomplete="off" placeholder="Password" required>
                        </div>
                        <button type="submit" name="login" class="btn btn-custom">Sign In</button>
                        <button type="button" class="btn btn-custom" id="register_button">Register</button>
                    </form>
                </div>
            </center>
        </div>
    </div>
    <!-- Header -->
    <header id="top" class="header data-section">
        <div id="section1" class="section active" style="opacity: 0;">
            <div class="img-content">
                <img id="img1" src="./img/chat1.png" style="height: auto; width: 85%; overflow-y: hidden;">
            </div>
            <div class="text-content" id="rk1" >
                <span class="right-text">1Intuitive Chat Experience.</span>
            </div>
        </div>
        <div id="section2" class="section" style="opacity: 0;">
            <div class="img-content">
                <img id="img2" src="./img/chat1.png" style="height: auto; width: 85%; overflow-y: hidden;">
            </div>
            <div class="text-content" id="rk2" >
                <span class="right-text">2Lightning Fast Message Delivery.</span>
            </div>
        </div>
        <div id="section3" class="section" style="opacity: 0;">
            <div class="img-content">
                <img id="img3" src="./img/chat1.png" style="height: auto; width: 85%; overflow-y: hidden;">
            </div>
            <div class="text-content" id="rk3" >
                <span class="right-text">3Send Text, Pictures, Videos and lots more!</span>
            </div>
        </div>
        <div id="section4" class="section" style="opacity: 0;">
            <div class="img-content">
                <img id="img4" src="./img/chat1.png" style="height: auto; width: 85%; overflow-y: hidden;">
            </div>
            <div class="text-content" id="rk4" >
                <span class="right-text">4Send Personalized Canvas Drawings</span>
            </div>
        </div>
        <div id="section5" class="section" style="opacity: 0;">
            <div class="img-content">
                <img id="img5" src="./img/chat1.png" style="height: auto; width: 85%; overflow-y: hidden;">
            </div>
            <div class="text-content" id="rk5" >
                <span class="right-text">5Stay Connected Always.</span>
            </div>
        </div>
        <div id="section6" class="section" style="opacity: 0;">
            <div class="" id="img6" style="">
                <span style="color: white; font-family: sspr; letter-spacing: 0.75px; text-transform: uppercase; font-size: 300%;">Register</span>
                <form method="post" action="index.php">
                    <!-- the user name input field uses a HTML5 pattern check -->
                    <div class="form-group">
                        <input id="login_input_username" class="login_input form-control" type="text" pattern="[a-zA-Z0-9]{2,64}" name="user_name" required placeholder="Username" />
                    </div>

                    <div class="form-group">
                        <input id="login_input_userfullname" class="login_input form-control" type="text" pattern="[a-zA-Z ]{2,128}" name="user_full_name" required placeholder="Full Name" />
                    </div>
                    <div class="form-group">
                        <input id="login_input_email" class="login_input form-control" type="email" name="user_email" required placeholder="e-mail" />
                    </div>
                    <div class="form-group">
                        <input id="login_input_password_new" class="login_input form-control" type="password" name="user_password_new" pattern=".{6,}" required autocomplete="off" placeholder="Password" />
                    </div>
                    <div class="form-group">
                        <input id="login_input_password_repeat" class="login_input form-control" type="password" name="user_password_repeat" pattern=".{6,}" required autocomplete="off" placeholder="Repeat Password" />
                    </div>

                    <button name="register" type="submit" class="btn btn-custom" style="float: right;">Register</button>
                    <button type="button" class="btn btn-custom" style="float: right;" id="cancel_r">Cancel</button>
                </form>
            </div>
        </div>
    </header>

    <!-- Bootstrap Core JavaScript -->
    <!-- <script src="js/bootstrap.min.js"></script> -->
</body>

</html>
