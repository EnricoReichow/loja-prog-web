<?php
$idProduto = $_POST['idProduto'];

//$con = mysqli_connect('localhost', 'root', 'Futebol300904', 'lojaprogweb');
$con = mysqli_connect('localhost', 'root', '170805Gabi', 'lojaprogweb');

$query = "INSERT INTO carrinhodecompras (idProduct) VALUES ('$idProduto')";

if (mysqli_query($con, $query)) {
    echo "Produto adicionado ao carrinho com sucesso!";
} else {
    echo "Erro ao adicionar o produto ao carrinho: " . mysqli_error($con);
}

mysqli_close($con);
?>