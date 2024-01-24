<?php

    $con = mysqli_connect("localhost:3306", "root", "Futebol300904", "lojaprogweb");

    // Consulta para obter todos os produtos
    $query = "SELECT * FROM products";
    $resultado = mysqli_query($con, $query);

    $dados = array();

    while($registro = mysqli_fetch_assoc($resultado)){
        array_push($dados, $registro);
    }

    //ESTOQUE
    //LOGICA FEITA PARA COLOCAR O NUMERO DISPONIVEIS DE PRODUTOS AO LADO DO NOME
    $queryCount = "SELECT productName, COUNT(*) as quantidade FROM products GROUP BY productName";
    $resultadoCount = mysqli_query($con, $queryCount);

    $dadosCount = array();

    while($registroCount = mysqli_fetch_assoc($resultadoCount)){
        $dadosCount[$registroCount['productName']] = $registroCount['quantidade'];
    }

    foreach ($dados as &$produto) {
        $produto['quantidade'] = isset($dadosCount[$produto['productName']]) ? $dadosCount[$produto['productName']] : 0;
    }
    //FIM LOGICA ESTOQUE

    $json = json_encode($dados);
    echo $json;

?>