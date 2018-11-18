CREATE DATABASE IF NOT EXISTS loginDB;
CREATE DATABASE IF NOT EXISTS messageDB;

USE loginDB;
DROP TABLE IF EXISTS users;
CREATE TABLE users
(
    user_full_name     VARCHAR(128),
    user_id            INT PRIMARY KEY AUTO_INCREMENT,
    user_name          VARCHAR(128),
    user_email         VARCHAR(128),
    user_password_hash VARCHAR(768),
    salt               VARCHAR(64)
);

USE messageDB;
DROP TABLE IF EXISTS conversations;
CREATE TABLE conversations
(
    part1_id     VARCHAR(128),
    part2_id     VARCHAR(128),
    conv_id      INT PRIMARY KEY AUTO_INCREMENT
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages
(
    conv_id     VARCHAR(128),
    to_id       VARCHAR(128),
    msg         VARCHAR(1024)
);
