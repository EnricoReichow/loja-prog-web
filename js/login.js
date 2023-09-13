const emailsNoBanco = ["enricobernzreichow@gmail.com", "gabriel.simini@gmail.com", "henrique@gmail.com"];
const senhasNoBanco = ["enrico123", "simini123", "henrique123"];

function verificarLogin() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var msgErro = document.getElementById('msgErro');
    const textoIncorreto = "Email ou senha incorretos";
    const textoSemUsuario = "Usuário não cadastrado!";

    var index = emailsNoBanco.indexOf(email);

    if (index !== -1) {

        if (senhasNoBanco[index] === senha) {

            window.location.assign("../main/index.html");

        } else {

            msgErro.textContent = textoIncorreto;

        }
    } else {
        
        msgErro.textContent = textoSemUsuario;

    }
}
