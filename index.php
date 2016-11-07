<?php
    header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
    header("Pragma: no-cache"); // HTTP 1.0.
    header("Expires: 0"); // Proxies.
    require_once("php/db_config.php");

    require_once("php/login_class.php");
    require_once("php/registration_class.php");

    $login = new Login();
    $registration = new Registration();

    if ($login->isUserLoggedIn() == true)
    {
        include("chat.php");
    }
    else
    {
        include("login.php");
        foreach ($login->errors as $key => $value)
        {
            echo "<script>alert('" . $value . "');</script>";
        }
    }
?>