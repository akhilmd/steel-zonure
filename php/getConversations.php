<?php
    require_once('msg_db_config.php');

    // $responseObj = new class
    // {
    //     public $length = "";
    //     public $conversations = new class
    //     {
    //         public $conv = "";
    //     };
    //     public $convs = "";
    // };

    $userId = null;

    if (isset($_POST["user_id"]))
    {
        $userId = $_POST["user_id"];
    }

    // echo $userId;


    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error)
        die("Connection failed: " . $conn->connect_error);
    $conn_log = new mysqli('localhost', 'root', 'akhil123', 'loginDB');
    if ($conn_log->connect_error)
        die("Connection failed: " . $conn_log->connect_error);

    $sql = "SELECT * FROM conversations WHERE part1_id = '" . $userId . "' or part2_id = '" . $userId . "';";

    $result = $conn->query($sql);

    echo '{"length":"' . $result->num_rows . '", ';

    $comma = ',';

    for ($i=0; $i < $result->num_rows; ++$i)
    {
        if ($i == ($result->num_rows -1))
            $comma = '';
        $arr = $result->fetch_object();
        $other_id = $arr->part1_id;

        if ($other_id === $userId)
            $other_id = $arr->part2_id;
        $sql_log = "SELECT user_full_name FROM users WHERE user_id = " . $other_id . ";";
        $result_log = $conn_log->query($sql_log);
        $arr->name = $result_log->fetch_object()->user_full_name;
        // print_r($arr);
        echo '"'.$i.'":'.json_encode($arr) . $comma;
    }


    echo '}';
    $conn->close();
?>