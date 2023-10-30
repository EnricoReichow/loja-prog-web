<?php

//$con = mysqli_connect("localhost:3306", "root", "Futebol300904", "lojaprogweb");
$con = mysqli_connect('localhost', 'root', '170805Gabi', 'lojaprogweb');

$resultado = mysqli_query($con, "SELECT c.idItemNoCarrinho, c.idProduct, p.productName, p.price FROM carrinhodecompras c INNER JOIN products p ON c.idProduct = p.id");
$dados = array();

while($registro = mysqli_fetch_assoc($resultado)) {
    array_push($dados, $registro);
}

$json = json_encode($dados);
echo $json;
?>