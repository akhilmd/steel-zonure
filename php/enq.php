<?php
    
    // add msg to db

    // if the user is online, enqueue the msg in the appropriate conv queue and when there is a request from the reciever, dequeue it

    require_once('msg_db_config.php');
    require_once('message_class.php');

    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    } 

    $sql = "INSERT INTO messages (conv_id, to_id, msg) VALUES ('".$_POST['conv_id']."', '".$_POST['to_id']."', '" . $_POST['msg']  ."')";

    if ($conn->query($sql) === TRUE)
    {
        $msg = new Message((string) $_POST['msg'],(string) $_POST['conv_id'],(string) $_POST['to_id']);

        $queue = msg_get_queue($_POST['conv_id'] . $_POST['to_id']);

        if (!msg_send ($queue, 1, $msg, true, true, $msg_err))
        {
            echo "false";//"Msg not sent because $msg_err\n";
        }
        else
        {
            echo "true";
        }
    }
    else
    {
        echo "false";//"Error: " . $sql . "<br/>" . $conn->error . "<br/>";
    }

    $conn->close();

    // print_r(msg_stat_queue($queue));
?>