<?php
    require_once('message_class.php');
    $key_t = msg_get_queue($_POST['conv_id'] . $_POST['to_id']);
    $msg = NULL;
    if (msg_receive ($key_t, 1, $msg_type, 65536, $msg, true, 0, $msg_error))
    {
        echo $msg->getText();
    }
    else
    {
        echo "Received ".$msg_error." fetching message\n";
    }
?>