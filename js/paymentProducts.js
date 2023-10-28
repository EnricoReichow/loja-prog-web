window.onload = async function () {
    var resultado = await fetch("../../php/getCart.php", {
        method: "GET"
    });

    var dados = await resultado.json();
    var total = 0;
    console.log(resultado);

    for (var i = 0; i < dados.length; i++) {
        var template =
        `<div class="cart-item">
            <img src="../../img/${dados[i].idProduct}.png" alt="" id="img-product">
            <h3 id="name-item-${i + 1}">${dados[i].productName}</h3>
            <h4 id="price-item-${i + 1}">R$${parseFloat(dados[i].price).toFixed(2)}</h4>
        </div>`;

        document.querySelector(".itens-list").innerHTML += template;
        
        total += parseFloat(dados[i].price);

    }

    document.getElementById("total-price").textContent = "Total: R$" + total.toFixed(2);
}