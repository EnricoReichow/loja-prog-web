<?php

    $productName = $_POST['new-product-name'];
    $productPrice = $_POST['new-product-price'];

    //$con = mysqli_connect('localhost:3306', 'root', 'Futebol300904', 'lojaprogweb');
    $con = mysqli_connect('localhost', 'root', '170805Gabi', 'lojaprogweb');

    $photo = $_FILES["new-product-image"];

    if ($photo["type"] == "image/png" || exif_imagetype($photo["tmp_name"]) == IMAGETYPE_PNG)
    {
        $query = "INSERT INTO products (productName, price) VALUES ('$productName', '$productPrice')";

        mysqli_query($con, $query);

        $id = mysqli_insert_id($con);
        $path = "../img/" . $id.".png";
        move_uploaded_file($photo["tmp_name"], $path);

        $message = "Upload Realizado com sucesso";
    }
    else
    {
        $message = "Somente é permitido imagem em png";
    }   

    $json = json_encode($message);
    echo $json;

    
?>