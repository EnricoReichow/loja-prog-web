<?php

$con = mysqli_connect('localhost:3306', 'root', 'Futebol300904', 'lojaprogweb');

if (mysqli_connect_errno()) {
    die("Falha na conexão com o banco de dados: " . mysqli_connect_error());
}

// PEGA QUANTOS PRODUTOS DE NOME X TEM NA TABELA "carrinhodecompras"
$querySelect = "SELECT productName, COUNT(*) as quantity FROM carrinhodecompras GROUP BY productName";
$resultSelect = mysqli_query($con, $querySelect);

if (!$resultSelect) {
    $response = ['message' => 'Erro ao obter os produtos do carrinho: ' . mysqli_error($con)];
    echo json_encode($response);
    exit();
}

// LIMPA A TABELA "carrinhodecompras"
$queryCleanCart = "DELETE FROM carrinhodecompras";
$resultCleanCart = mysqli_query($con, $queryCleanCart);

if (!$resultCleanCart) {
    $response = ['message' => 'Erro ao limpar o carrinho: ' . mysqli_error($con)];
    echo json_encode($response);
    exit();
}

// EXCLUI OS PRODUTOS DA TABELA "products" DE ACORDO COM A QUANTIDADE
while ($row = mysqli_fetch_assoc($resultSelect)) {
    $productName = mysqli_real_escape_string($con, $row['productName']);
    $quantity = $row['quantity'];

    $queryDelete = "DELETE FROM products WHERE productName = '$productName' LIMIT $quantity";
    $resultDelete = mysqli_query($con, $queryDelete);

    if (!$resultDelete) {
        $response = ['message' => 'Erro ao excluir produtos do carrinho: ' . mysqli_error($con)];
        echo json_encode($response);
        exit();
    }
}

$response = ['message' => 'Compra realizada com sucesso!!'];
echo json_encode($response);

mysqli_close($con);

?>