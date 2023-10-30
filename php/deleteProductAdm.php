<?php

$idProduto = $_POST['id'];

$con = mysqli_connect("localhost:3306", "root", "Futebol300904", "lojaprogweb");
// $con = mysqli_connect('localhost', 'root', '170805Gabi', 'lojaprogweb');

echo $idProduto;

$resultado = mysqli_query($con, "DELETE FROM products WHERE id=('$idProduto')");

$json = json_encode($resultado);
echo $json;

?>

