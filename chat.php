<!DOCTYPE html>
<?
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');?>
<html ng-app="fosapp">
    <script src="js/angular.min.js"></script>
    <script type="text/javascript">
        <!--
            <?php  

            if (isset($_SESSION['user_name']))
                echo 'var x = true;';
            else
                echo 'var x = false;'; ?>

            if (!x)
                window.location='./index.php';
            console.log(x);

            window.onload = init;
            function init()
            {
                var userID = -1;
                <?php  
                    if (isset($_SESSION['user_id']))
                        echo 'userID = "' . $_SESSION['user_id'] . '";';
                ?>

                populateConversations(userID);

                // var currentConversationId = "conv_2";

                // loadCovoById(currentConversationId);
            }
        -->
    </script>
    <head>
        <meta charset="UTF-8">
        <title>Chatit</title>
        <link rel="stylesheet" type="text/css" href="./css/normalize.css">
        <link rel="stylesheet" type="text/css" href="./css/style.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">        
        <script type="text/javascript" src="./js/chat.js"></script>
    </head>
    <body>
        <br/>
        <p align="center">
            Hey, <big><b id="user_full_name"> <?php echo $_SESSION['user_full_name']; ?>  </b></big>
            <button type="button" class="btn btn-primary" onclick="window.location='./index.php?logout=true'">LOG OUT</button>

       </p>
        <div class="ui">
            <div class="left-menu">
                <form action="#" class="search">
                    <input placeholder="Search..." type="search" name="" id="search_box" onfocus="toBlur()" onblur="toNormal()" onKeyPress="search()" onKeyUp="search()">
                </form>
                <menu class="list-friends" id="convo_list">
                </menu>
            </div>
            <div class="chat">
                <div class="top">
                    <div class="avatar"  >
                        <img class="images" src="./img/dp3.jpg" style = "margin-top: -70px;">
                    </div>
                    <div class="info" >
                        <div id="currentName" class="name" style = "margin-top: 25px;">Dwotm8
                        </div>
                            <a href="" onclick="prompt('Enter email id')";> <img src='./img/ic_email_black_24dp_2x.png' style = "margin-left: 380px; margin-top: -35px;"  /> </a>
                    </div>
                    <i class="fa fa-star"></i>
                </div>
                <ul class="messages" id="mess"></ul>
                <div class="write-form">
                    <textarea placeholder="Type your message" name="e" id="texxt"  rows="2"></textarea>
                    <i class="fa fa-picture-o"> </i> &nbsp; &nbsp; &nbsp;
                    <i class="fa fa-file-image-o"> </i>
                    <span id="send_button" class="send" >Send</span>
                </div>
            </div>
        </div>
    </body>
</html>
