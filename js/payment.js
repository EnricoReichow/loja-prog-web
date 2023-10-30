const paymentMethodSelect = document.getElementById('opcoes-pagamento');
const paymentDetails = document.getElementById('payment-details');
const pagarButton = document.getElementById('pagar-button');

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
