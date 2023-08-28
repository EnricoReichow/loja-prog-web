const emailsNoBanco = ["enricobernzreichow@gmail.com", "gabriel.simini@gmail.com", "henrique@gmail.com"];
const senhasNoBanco = ["enrico123", "simini123", "henrique123"];

function verificarUsuarioExistente() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var confirmarSenha = document.getElementById('confirmarSenha').value;
    var msgErro = document.getElementById('mensagemErroRegistrar')
    var textoErro = "Email ou Usuário já cadastrado";
    var textoAprovado = "Cadastro Realizado!"
    var senhasNaoBatem = "As senhas não são iguais"

    if (emailsNoBanco.includes(email)) {

        msgErro.textContent = textoErro;

    } else if ((emailsNoBanco.includes(email) == false) && senha == confirmarSenha) {

        msgErro.textContent = textoAprovado;

        setTimeout(() => {
            window.location.assign("http://pt.stackoverflow.com");
        }, 2000);

    } else {

        msgErro.textContent = senhasNaoBatem;

    }

}