<?php
function conexaoMysql(){
    //Desenvolvimento
    $host = "127.0.0.1";
    $user = "root";
    $password = "140110";
    $databese = "db_test";

    $connection = mysqli_connect($host, $user, $password, $databese);

    return $connection;
}
?>