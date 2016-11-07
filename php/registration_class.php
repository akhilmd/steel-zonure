<?php
class Registration
{
    private $db_connection = null;
    public $errors = array();
    public $messages = array();
    public function __construct()
    {
        if (isset($_POST["register"]))
        {
            $this->registerNewUser();
        }
    }
    private function registerNewUser()
    {
        if (empty($_POST['user_name']))
        {
            $this->errors[] = "Empty Username";
        }
        elseif (empty($_POST['user_password_new']) || empty($_POST['user_password_repeat']))
        {
            $this->errors[] = "Empty Password";
        }
        elseif ($_POST['user_password_new'] !== $_POST['user_password_repeat'])
        {
            $this->errors[] = "Password repeated incoorectly";
        }
        elseif (strlen($_POST['user_password_new']) < 6)
        {
            $this->errors[] = "Password must be at least 6 characters";
        }
        elseif (strlen($_POST['user_name']) > 64 || strlen($_POST['user_name']) < 2)
        {
            $this->errors[] = "Username can only range from 2 to 64 characters";
        }
        elseif (!preg_match('/^[a-z\d]{2,64}$/i', $_POST['user_name']))
        {
            $this->errors[] = "Username does not fit the name scheme: only a-Z and numbers are allowed, 2 to 64 characters";
        }
        elseif (empty($_POST['user_email']))
        {
            $this->errors[] = "Email cannot be empty";
        }
        elseif (strlen($_POST['user_email']) > 64)
        {
            $this->errors[] = "Email cannot be longer than 64 characters";
        }
        elseif (!filter_var($_POST['user_email'], FILTER_VALIDATE_EMAIL))
        {
            $this->errors[] = "Your email address is not in a valid email format";
        }
        elseif
            (
            !empty($_POST['user_name'])
            && strlen($_POST['user_name']) <= 64
            && strlen($_POST['user_name']) >= 2
            && preg_match('/^[a-z\d]{2,64}$/i', $_POST['user_name'])
            && !empty($_POST['user_email'])
            && strlen($_POST['user_email']) <= 64
            && filter_var($_POST['user_email'], FILTER_VALIDATE_EMAIL)
            && !empty($_POST['user_password_new'])
            && !empty($_POST['user_password_repeat'])
            && ($_POST['user_password_new'] === $_POST['user_password_repeat'])
            )
        {
            $this->db_connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
            if (!$this->db_connection->set_charset("utf8"))
            {
                $this->errors[] = $this->db_connection->error;
            }
            if (!$this->db_connection->connect_errno)
            {
                $user_name = $this->db_connection->real_escape_string(strip_tags($_POST['user_name'], ENT_QUOTES));
                $user_email = $this->db_connection->real_escape_string(strip_tags($_POST['user_email'], ENT_QUOTES));

                $user_password = $_POST['user_password_new'];

                $user_full_name = $_POST['user_full_name'];

                $salt = mcrypt_create_iv(15, MCRYPT_DEV_URANDOM);
                $user_password_hash = hash('sha512', $user_password . $salt);

                $sql = "SELECT * FROM users WHERE user_name = '" . $user_name . "' OR user_email = '" . $user_email . "';";


                $query_check_user_name = $this->db_connection->query($sql);

                if ($query_check_user_name->num_rows == 1)
                {
                    $this->errors[] = "Sorry, that username / email address is already taken.";
                }
                else
                {
                    $sql = "INSERT INTO users (user_name, user_password_hash, user_email, user_full_name, salt)
                            VALUES('" . $user_name . "', '" . $user_password_hash . "', '" . $user_email . "', '" . $user_full_name . "','" . bin2hex($salt) . "');";
                    $query_new_user_insert = $this->db_connection->query($sql);

                    // echo $sql;
                    if ($query_new_user_insert)
                    {
                        $this->messages[] = "Your account has been created successfully. You can now log in.";

                        // get all user_id s
                        // for each user_id check if there is a conversation for every other user_id
                        // if not then create a conversation.

                        $sql = "SELECT user_id FROM users WHERE user_name = '" . $user_name . "';";
                        $usr_res = $this->db_connection->query($sql);
                        $curr_uid = $usr_res->fetch_object()->user_id;

                        $sql = "SELECT user_id FROM users;";
                        $usr_res = $this->db_connection->query($sql);

                        $conv_conn =  new mysqli('localhost', 'root', 'akhil123', 'messageDB');

                        for ($i=0;$i<$usr_res->num_rows;++$i)
                        {
                            $uid = $usr_res->fetch_object()->user_id;
                            if ($uid == $curr_uid)
                                continue;
                            $sql_conv = "INSERT INTO conversations (part1_id, part2_id) VALUES (" . $uid . "," . $curr_uid . ");";
                            $conv_res = $conv_conn->query($sql_conv);
                        }

                        $conv_conn->close();
                    }
                    else
                    {
                        $this->errors[] = "Sorry, your registration failed. Please go back and try again.";
                    }



                }
            }
            else
            {
                $this->errors[] = "Sorry, no database connection.";
            }
        }
        else
        {
            $this->errors[] = "An unknown error occurred.";
        }
    }
}

?>