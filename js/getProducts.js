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
            <div class="product-card">
                <div class="product-add-cart">
                    <button class="add-btn" name="idProduto" id="add-item-1" onclick="adicionarAoCarrinho(${dados[i].id})">Adicionar ao Carrinho</button>
                </div>
            </div>
        </div>`;

        document.querySelector(".main-grid").innerHTML += template;
    }
}

function updateProductList(products) {
    const mainGrid = document.querySelector(".main-grid");
    mainGrid.innerHTML = "";

    products.forEach((product) => {
        const template = `
        <div class="product-content">
          <img src="../../img/${product.id}.png" alt="${product.productName}" id="img-${product.id}">
          <div class="product-info">
            <h4 class="product-name" id="price-item-${product.id}">${product.productName}</h4>
            <h4 class="price" id="add-item-${product.id}">R$${parseFloat(product.price).toFixed(2)}</h4>
          </div>
          <div class="product-card">
            <div class="product-add-cart">
              <button class="add-btn" name="idProduto" id="add-item-${product.id}" onclick="adicionarAoCarrinho(${product.id})">Adicionar ao Carrinho</button>
            </div>
          </div>
        </div>`;
        mainGrid.innerHTML += template;
    });
}


async function adicionarAoCarrinho(idProduto) {
    const data = new FormData();
    data.append('idProduto', idProduto);

    try {
        const resultado = await fetch("../../php/adicionarAoCarrinho.php", {
            method: "POST",
            body: data,
        });

        if (resultado.ok) {
            alert("Produto adicionado ao carrinho com sucesso!");
        } else {
            console.error('Erro na solicitação POST:', resultado.status);
        }
    } catch (error) {
        console.error('Erro na solicitação POST:', error);
    }
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

