const userEmail = "marcos.souza@gmail.com";
const userPassword = "marquinhos123";

const admEmail = "admin@breakpoint.com";
const admPassword = "professorMeDa10";

function verificarLogin() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var msgErro = document.getElementById('msgErro');
    const textoIncorreto = "Email ou senha incorretos";

    if (email == userEmail && senha == userPassword) {

        window.location.assign("pages/products/index.html");

    } else if (email == admEmail && senha == admPassword) {

        window.location.assign("pages/admInsert/index.html");

    } else {
        msgErro.textContent = textoIncorreto
    }

    
}
