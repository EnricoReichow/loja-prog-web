window.onload = async function () {
    var resultado = await fetch("../../php/getProducts.php", {
        method: "GET"
    });

    var dados = await resultado.json();
    var total = 0;
    console.log(resultado);

    const produtosUnicos = {};

    for (var i = 0; i < dados.length; i++) {
        const produto = dados[i];

        //LOGICA FEITA PARA O ESTOQUE, DE FORMA QUE SÓ TENHA UM CARD POR NOME DE PRODUTO
        if (!produtosUnicos[produto.productName]) {
            produtosUnicos[produto.productName] = true;

            var template =
                `<div class="product-content">
            <img src="../../img/${dados[i].id}.png" alt="raquete-de-tennis-vermelha" id="img-1">
            <div class="product-info">
                <h4 class="product-name" id="price-item-1">${dados[i].productName} (x${dados[i].quantidade})</h4>
                <h4 class="price" id="add-item-1">R$${parseFloat(dados[i].price).toFixed(2)}</h4>
            </div>
            <div class="product-card">
                <div class="product-add-cart">
                <button class="add-btn" name="idProduto" id="add-item-1" onclick="deleteProduct('${dados[i].productName}')">Remover</button>
                </div>
            </div>
        </div>`;

            document.querySelector(".main-grid").innerHTML += template;

        }
    }
}

function updateProductList(products) {
    const mainGrid = document.querySelector(".main-grid");
    mainGrid.innerHTML = "";

    if (products.length === 0) {
        mainGrid.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    const produtosUnicos = {};

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        //LOGICA FEITA PARA O ESTOQUE, DE FORMA QUE SÓ TENHA UM CARD POR NOME DE PRODUTO
        if (!produtosUnicos[product.productName]) {
            produtosUnicos[product.productName] = true;

            const template = `
            <div class="product-content">
                <img src="../../img/${product.id}.png" alt="${product.productName}" id="img-${i}">
                <div class="product-info">
                    <h4 class="product-name" id="price-item-${i}">${product.productName} (x${product.quantidade})</h4>
                    <h4 class="price" id="add-item-${i}">R$${parseFloat(product.price).toFixed(2)}</h4>
                </div>
                <div class="product-card">
                    <div class="product-add-cart">
                    <button class="add-btn" name="idProduto" id="add-item-1" onclick="deleteProduct('${product.productName}')">Remover</button>
                    </div>
                </div>
            </div>`;

            mainGrid.innerHTML += template;
        }
    }
}

async function deleteProduct(productName) {
   
    console.log(productName);

    const data = new FormData();
    data.append('productName', productName);

    try {
        const resultado = await fetch("../../php/deleteProductAdm.php", {
            method: "POST",
            body: data,
        });

        if (resultado.ok) {
            alert("Produto removido do carrinho com sucesso!");
            window.location.reload(true);
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