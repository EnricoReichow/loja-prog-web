window.onload = async function () {
    var resultado = await fetch("../../php/getCart.php", {
        method: "GET"
    });

    var dados = await resultado.json();
    var total = 0;

    for (var i = 0; i < dados.length; i++) {
        var template =
            `<div class="cart-item">
            <img src="../../img/${dados[i].idProduct}.png" alt="" id="img-product">
            <h3 id="name-item-${i + 1}">${dados[i].productName}</h3>
            <h4 id="price-item-${i + 1}">R$${parseFloat(dados[i].price).toFixed(2)}</h4>
            <button id="remove-btn" class="remove-btn" onclick="deleteProduct(${parseInt(dados[i].idItemNoCarrinho)})">Remover</button>
        </div>`;

        document.querySelector(".layout_itens").innerHTML += template;

        total += parseFloat(dados[i].price);

    }

    document.getElementById("total-price").textContent = "Total: R$" + total.toFixed(2);
}

async function deleteProduct(id) {

    const data = new FormData();
    data.append('idItemNoCarrinho', id);

    try {
        const resultado = await fetch("../../php/deleteProductCart.php", {
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