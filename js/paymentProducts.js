const paymentMethodSelect = document.getElementById('opcoes-pagamento');
const paymentDetails = document.getElementById('payment-details');
const pagarButton = document.getElementById('pagar-button');

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

    function createInstallmentsSelect() {
        const installmentsLabel = document.createElement('label');
        installmentsLabel.textContent = 'Número de Parcelas:';
        const installmentsSelect = document.createElement('select');
        installmentsSelect.name = 'installments';
        installmentsSelect.id = 'installments-select';

        const options = [1, 2, 3];
        options.forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.text = `${option}x de R$${(total / option).toFixed(2)}`;
            installmentsSelect.appendChild(optionElement);
        });

        const paymentMethod = document.getElementById('payment-details');
        addInputContainer(paymentMethod, installmentsLabel);
        addInputContainer(paymentMethod, installmentsSelect);

        installmentsSelect.addEventListener('change', () => {
            const selectedInstallments = parseInt(installmentsSelect.value);
            const totalValue = (total / selectedInstallments).toFixed(2);
            const totalLabel = document.getElementById('total-price');
            totalLabel.textContent = `Total: ${selectedInstallments}x de R$${totalValue}`;
        });
    }

    paymentMethodSelect.addEventListener('change', () => {
        const selectedMethod = paymentMethodSelect.value;
        paymentDetails.innerHTML = '';

        if (selectedMethod === 'Credito') {
            const h4 = document.createElement('h4');
            h4.textContent = 'Método: Crédito';

            const cardNumberInput = createInput('text', 'Número do Cartão');
            const expirationDateInput = createInput('date', 'Data de Vencimento');
            const cardHolderInput = createInput('text', 'Nome do Titular do Cartão');
            const cvvInput = createInput('text', 'CVV');
            const addressInput = createInput('text', 'Endereço');
            const addressNumberInput = createInput('text', 'Número');
            const addressDescriptionInput = createInput('text', 'Informação importante (endereço)');

            paymentDetails.appendChild(h4);
            addInputContainer(paymentDetails, cardNumberInput);
            addInputContainer(paymentDetails, expirationDateInput);
            addInputContainer(paymentDetails, cardHolderInput);
            addInputContainer(paymentDetails, cvvInput);
            addInputContainer(paymentDetails, addressInput);
            addInputContainer(paymentDetails, addressNumberInput);
            addInputContainer(paymentDetails, addressDescriptionInput);

            createInstallmentsSelect();
        } else if (selectedMethod === 'Debito') {
            const h4 = document.createElement('h4');
            h4.textContent = 'Método: Débito';

            const cardNumberInput = createInput('text', 'Número do Cartão');
            const expirationDateInput = createInput('date', 'Data de Vencimento');
            const cardHolderInput = createInput('text', 'Nome do Titular do Cartão');
            const cvvInput = createInput('text', 'CVV');
            const addressInput = createInput('text', 'Endereço');
            const addressNumberInput = createInput('text', 'Número');
            const addressDescriptionInput = createInput('text', 'Informação importante (endereço)');

            paymentDetails.appendChild(h4);
            addInputContainer(paymentDetails, cardNumberInput);
            addInputContainer(paymentDetails, expirationDateInput);
            addInputContainer(paymentDetails, cardHolderInput);
            addInputContainer(paymentDetails, cvvInput);
            addInputContainer(paymentDetails, addressInput);
            addInputContainer(paymentDetails, addressNumberInput);
            addInputContainer(paymentDetails, addressDescriptionInput);
        } else if (selectedMethod === 'Pix') {
        const h4 = document.createElement('h4');
        h4.textContent = 'Método: Pix';

        const addressInput = createInput('text', 'Endereço');
        const addressNumberInput = createInput('text', 'Número');
        const addressDescriptionInput = createInput('text', 'Informação importante (endereço)')

        const pixImage = document.createElement('img');
        const imagePath = '../../img/qrcode.png';
        pixImage.src = imagePath;
        pixImage.width = 400;
        pixImage.height = 400;

        paymentDetails.appendChild(h4);
        addInputContainer(paymentDetails, addressInput);
        addInputContainer(paymentDetails, addressNumberInput);
        addInputContainer(paymentDetails, addressDescriptionInput);
        paymentDetails.appendChild(pixImage);
        pagarButton.textContent = "Feito"
        }

        updatePagarButton();
    });
};

function createInput(type, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    return input;
}

function addInputContainer(parent, inputElement) {
    const container = document.createElement('div');
    container.classList.add('input-container');
    container.appendChild(inputElement);
    parent.appendChild(container);
}

function updatePagarButton() {
    pagarButton.removeAttribute('disabled');
}

async function deleteAllItemsFromCart() {
    try {
        const response = await fetch('../../php/cleanCart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Erro na solicitação');
        }

        const data = await response.json();
        alert(data.message);

        window.location.assign("../products/index.html");
    } catch (error) {
        console.error('Erro:', error.message);
    }
}

document.getElementById('pagar-button').addEventListener('click', async () => {
    const selectedMethod = paymentMethodSelect.value;

    if (selectedMethod === 'Credito' || selectedMethod === 'Debito') {
        const cardNumber = document.querySelector('input[placeholder="Número do Cartão"]').value;
        const expirationDate = document.querySelector('input[placeholder="Data de Vencimento"]').value;
        const cardHolder = document.querySelector('input[placeholder="Nome do Titular do Cartão"]').value;
        const cvv = document.querySelector('input[placeholder="CVV"]').value;
        const address = document.querySelector('input[placeholder="Endereço"]').value;
        const addressNumber = document.querySelector('input[placeholder="Número"]').value;
        const addressDescription = document.querySelector('input[placeholder="Informação importante (endereço)"]').value;

        if (cardNumber === '' || expirationDate === '' || cardHolder === '' || cvv === '' || address === '' || addressNumber === '' || addressDescription === '') {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }

        if (!isValidDate(expirationDate)) {
            alert('A data de vencimento não é válida ou está no passado.');
            return;
        }

    } else if (selectedMethod === 'Pix') {
        const address = document.querySelector('input[placeholder="Endereço"]').value;
        const addressNumber = document.querySelector('input[placeholder="Número"]').value;
        const addressDescription = document.querySelector('input[placeholder="Informação importante (endereço)"]').value;

        if (address === '' || addressNumber === '' || addressDescription === '') {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }

    }

    await deleteAllItemsFromCart();
});

function isValidDate(dateString) {
    const today = new Date();
    const inputDate = new Date(dateString);
    return inputDate > today;
}
