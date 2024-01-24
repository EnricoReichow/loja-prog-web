<?php

$nomeProduto = $_POST['productName'];

$con = mysqli_connect("localhost:3306", "root", "Futebol300904", "lojaprogweb");
// $con = mysqli_connect('localhost', 'root', '170805Gabi', 'lojaprogweb');

echo $nomeProduto;

//DELETA PRODUTO PELO NOME, TODOS DE UMA VEZ, POIS O ESTOQUE SÓ DIMINUI QUANDO O CLIENTE COMPRA
$resultado = mysqli_query($con, "DELETE FROM products WHERE productName=('$nomeProduto')");

$json = json_encode($resultado);
echo $json;

?>

