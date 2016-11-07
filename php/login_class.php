<?php
class Login
{
    private $db_connection = null;
    public $errors = array();
    public $messages = array();
    public function __construct()
    {
        session_start();
        if (isset($_GET["logout"]))
        {
            $this->doLogout();
        }
        elseif (isset($_POST["login"]))
        {
            $this->dologinWithPostData();
        }
    }
    private function dologinWithPostData()
    {
        if (empty($_POST['user_name']))
        {
            $this->errors[] = "Username field was empty.";
        }
        elseif (empty($_POST['user_password']))
        {
            $this->errors[] = "Password field was empty.";
        }
        elseif (!empty($_POST['user_name']) && !empty($_POST['user_password']))
        {
            $this->db_connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

            if (!$this->db_connection->set_charset("utf8"))
            {
                $this->errors[] = $this->db_connection->error;
            }

            if (!$this->db_connection->connect_errno)
            {
                $user_name = $this->db_connection->real_escape_string($_POST['user_name']);
                $sql = "SELECT user_full_name,user_id, user_name, user_email, user_password_hash, salt
                        FROM users
                        WHERE user_name = '" . $user_name . "' OR user_email = '" . $user_name . "';";
                $result_of_login_check = $this->db_connection->query($sql);

                if ($result_of_login_check->num_rows == 1)
                {
                    $result_row = $result_of_login_check->fetch_object();

                    $salt = hex2bin($result_row->salt);

                    if ( strcmp($result_row->user_password_hash, hash('sha512', $_POST['user_password'] . $salt)) == 0)
                    {
                        $_SESSION['user_id'] = $result_row->user_id;
                        $_SESSION['user_full_name'] = $result_row->user_full_name;
                        $_SESSION['user_name'] = $result_row->user_name;
                        $_SESSION['user_email'] = $result_row->user_email;
                        $_SESSION['user_login_status'] = 1;
                    }
                    else
                    {
                        $this->errors[] = "Wrong password. Try again.";
                    }
                }
                else
                {
                    $this->errors[] = "This user does not exist.";
                }
            }
            else
            {
                $this->errors[] = "Database connection problem.";
            }
        }
    }

    public function doLogout()
    {
        $_SESSION = array();
        session_destroy();
        $this->messages[] = "You have been logged out.";
    }

    public function isUserLoggedIn()
    {
        if (isset($_SESSION['user_login_status']) AND $_SESSION['user_login_status'] == 1)
        {
            return true;
        }
        return false;
    }
}
?>