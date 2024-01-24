<?php
$idProduto = $_POST['idProduto'];
$nomeProduto = $_POST['productName'];

$con = mysqli_connect('localhost', 'root', 'Futebol300904', 'lojaprogweb');
// $con = mysqli_connect('localhost', 'root', '170805Gabi', 'lojaprogweb');

//ADICIONEI O CAMPO "productName" - ESTOQUE
$query = "INSERT INTO carrinhodecompras (idProduct, productName) VALUES ('$idProduto', '$nomeProduto')";

if (mysqli_query($con, $query)) {
    echo "Produto adicionado ao carrinho com sucesso!";
} else {
    echo "Erro ao adicionar o produto ao carrinho: " . mysqli_error($con);
}

//OBS: NÃO FIZ A PARTE DE RETIRAR O NUMERO DE PRODUTOS E ADICIONAR NO CARRINHO POR CONTA DA FK "idProduct"

mysqli_close($con);
?>