<?php
    require_once('msg_db_config.php');

    $convId = NULL;
    if (isset($_REQUEST['conv_id']))
    {
        $convId = $_REQUEST['conv_id'];
    }

    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    } 

    $sql = "SELECT * FROM messages WHERE conv_id = '" . $convId . "';";

    $result = $conn->query($sql);

    $sql = "SELECT * FROM conversations WHERE conv_id = '" . $convId . "';";

    $conv_res = $conn->query($sql);

    $hasEchoedCause = False;
    $isPart = True;

    echo "{";


    if ($conv_res->num_rows == 0 && !$hasEchoedCause)
    {
        echo '"cause":';
        echo '"No such Conversation.",';
        $hasEchoedCause = True;
    }
    else
    {
        $obj = $conv_res->fetch_object(); 
        if ($obj->part1_id == $_REQUEST['user_id'])
        {
            echo '"part":';
            echo '"' . $obj->part2_id . '",';
        }
        elseif ($obj->part2_id == $_REQUEST['user_id'])
        {
            echo '"part":';
            echo '"' . $obj->part1_id . '",';
        }
        elseif (!$hasEchoedCause)
        {
            echo '"cause":';
            echo '"Not part of this Conversation.",';
            $hasEchoedCause = True;
            $isPart = False;
        }

        if ($result->num_rows == 0 && !$hasEchoedCause)
        {
            echo '"cause":';
            echo '"No Messages in this Conversation.",';
            $hasEchoedCause = True;
        }

        for ($i=0; $i < $result->num_rows && $isPart; ++$i)
        { 
            // print_r($result->fetch_object());
            echo '"' . $i . '":' . json_encode($result->fetch_object()) . ",";
        }
    }
    if ($isPart)
        echo  '"length":"' . ($result->num_rows) . '"}';
    else
        echo  '"length":"0"}';

    // if ($result)
    // {
    // }
    // else
    // {
    //     echo "Error: " . $sql . "<br/>" . $conn->error . "<br/>";
    // }

    $conn->close();
?>