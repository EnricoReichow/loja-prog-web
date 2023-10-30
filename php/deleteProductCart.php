<?php

$idItemNoCarrinho = $_POST['idItemNoCarrinho'];

//$con = mysqli_connect("localhost:3306", "root", "Futebol300904", "lojaprogweb");
$con = mysqli_connect('localhost', 'root', '170805Gabi', 'lojaprogweb');

$resultado = mysqli_query($con, "DELETE FROM carrinhodecompras WHERE idItemNoCarrinho=('$idItemNoCarrinho')");

$json = json_encode($resultado);
echo $json;

$idItemNoCarrinho = $_POST['idItemNoCarrinho'];

echo $idItemNoCarrinho;

$con = mysqli_connect("localhost:3306", "root", "Futebol300904", "lojaprogweb");

if (!$con) {
    die("Erro na conexão: " . mysqli_connect_error());
}

$sql = "DELETE FROM carrinhodecompras WHERE idItemNoCarrinho = '$idItemNoCarrinho'";

if (mysqli_query($con, $sql)) {
    echo "Registro excluído com sucesso.";
} else {
    echo "Erro na exclusão do registro: " . mysqli_error($con);
}

mysqli_close($con);

?>

