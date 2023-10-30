<?php

//$con = mysqli_connect('localhost:3306', 'root', 'Futebol300904', 'lojaprogweb');
$con = mysqli_connect('localhost', 'root', '170805Gabi', 'lojaprogweb');

$query = "DELETE FROM carrinhodecompras";

if (mysqli_query($con, $query)) {
    $response = ['message' => 'Compra realizada com sucesso!!'];
} else {
    $response = ['message' => 'Erro ao efetuar o pagamento: ' . mysqli_error($con)];
}

echo json_encode($response);

?>