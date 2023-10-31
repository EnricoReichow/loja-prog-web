window.onload = async function () {
    var resultado = await fetch("../../php/getProducts.php", {
        method: "GET"
    });

    var dados = await resultado.json();
    console.log(resultado)

    for (var i = 0; i < dados.length; i++) {

        var template =
            `<div class="product-content">
            <img src="../../img/${dados[i].id}.png" alt="raquete-de-tennis-vermelha" id="img-1">
            <div class="product-info">
                <h4 class="product-name" id="price-item-1">${dados[i].productName}</h4>
                <h4 class="price" id="add-item-1">R$${parseFloat(dados[i].price).toFixed(2)}</h4>
            </div>
        </div>`;

        document.querySelector(".main-grid").innerHTML += template;
    }
}

document.getElementById("add-new-product").addEventListener("click", function (event) {
    event.preventDefault();
});

function updateProductList(products) {
    const mainGrid = document.querySelector(".main-grid");
    mainGrid.innerHTML = "";

    if (products.length === 0) {
        mainGrid.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        const template = `
            <div class="product-content">
                <img src="../../img/${product.id}.png" alt="${product.productName}" id="img-${i}">
                <div class="product-info">
                    <h4 class="product-name" id="price-item-${i}">${product.productName}</h4>
                    <h4 class="price" id="add-item-${i}">R$${parseFloat(product.price).toFixed(2)}</h4>
                </div>
            </div>`;

        mainGrid.innerHTML += template;
    }
}

async function addNewProduct() {
    var arquivo = document.getElementById('input-container');
    var dados = new FormData(arquivo);

    fetch('../../php/addNewProduct.php', {
        method: "POST",
        body: dados
    });

    alert("Produto cadastrado com sucesso!")
    window.location.reload(true);
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search_product");
    searchInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            searchProducts(searchInput.value);
        }
    });
});

async function searchProducts(searchTerm) {
    try {
        const resultado = await fetch(`../../php/searchProducts.php?term=${searchTerm}`, {
            method: "GET"
        });

        if (resultado.ok) {
            const dados = await resultado.json();
            updateProductList(dados);
        } else {
            console.error('Erro na solicitação GET:', resultado.status);
        }
    } catch (error) {
        console.error('Erro na solicitação GET:', error);
    }
}

