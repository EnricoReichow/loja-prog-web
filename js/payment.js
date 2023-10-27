const paymentMethodSelect = document.getElementById('opcoes-pagamento');
const paymentDetails = document.getElementById('payment-details');
const pagarButton = document.getElementById('pagar-button');

paymentMethodSelect.addEventListener('change', () => {
    const selectedMethod = paymentMethodSelect.value;
    paymentDetails.innerHTML = ''; // Limpa os detalhes anteriores

    if (selectedMethod === 'Credito') {
        // Adiciona campos para pagamento com cartão de crédito
        const h4 = document.createElement('h4');
        h4.textContent = 'Método: Crédito';

        const cardNumberInput = createInput('text', 'Número do Cartão');
        const expirationDateInput = createInput('date', 'Data de Vencimento');
        const cardHolderInput = createInput('text', 'Nome do Titular do Cartão');
        const cvvInput = createInput('text', 'CVV');

        paymentDetails.appendChild(h4);
        addInputContainer(paymentDetails, cardNumberInput);
        addInputContainer(paymentDetails, expirationDateInput);
        addInputContainer(paymentDetails, cardHolderInput);
        addInputContainer(paymentDetails, cvvInput);
    } else if (selectedMethod === 'Debito') {
        // Adiciona campos para pagamento com cartão de débito
        const h4 = document.createElement('h4');
        h4.textContent = 'Método: Débito';

        const cardNumberInput = createInput('text', 'Número do Cartão');
        const expirationDateInput = createInput('date', 'Data de Vencimento');
        const cardHolderInput = createInput('text', 'Nome do Titular do Cartão');
        const cvvInput = createInput('text', 'CVV');

        paymentDetails.appendChild(h4);
        addInputContainer(paymentDetails, cardNumberInput);
        addInputContainer(paymentDetails, expirationDateInput);
        addInputContainer(paymentDetails, cardHolderInput);
        addInputContainer(paymentDetails, cvvInput);
    } else if (selectedMethod === 'Pix') {
        // Adiciona nome do método Pix
        const h4 = document.createElement('h4');
        h4.textContent = 'Método: Pix';

        // Adiciona imagem para pagamento com Pix
        const pixImage = document.createElement('img');
        const imagePath = '../../img/qrcode.png';
        pixImage.src = imagePath;
        pixImage.width = 400;
        pixImage.height = 400;

        paymentDetails.appendChild(h4);
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
    pagarButton.removeAttribute('disabled'); // Habilita o botão para todos os métodos
}