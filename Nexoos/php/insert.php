<?php

require_once('../conexao.php');
$conexao = conexaoMysql();

if(isset($_POST['razaosocial'])){

    $RazaoSocial = $_POST['razaosocial'];
    $cpnj = $_POST['cnpj'];
    $endereco = $_POST['endereco'];
    $telefone = $_POST['telefone'];
    $valorsolicitado = $_POST['valorSolicitado'];
    $parcelas = $_POST['parcelas'];
    $valorparcelas = $_POST['valorparcelas'];

    $sql = "INSERT INTO tbempresa (razaosocial, cnpj, endereco, telefone, valor, parcelas, valorparcela) VALUES ('$RazaoSocial', $cpnj, '$endereco', $telefone, $valorsolicitado, $parcelas, $valorparcelas)";

    if(mysqli_query($conexao, $sql))
        echo "TRUE";
     else 
        echo $sql;
    
}
