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

async function addNewProduct() {
    
}
