document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu_button_style");
    const menu = document.getElementById("menu");
    const fecharMenuButton = document.getElementById("fechar_menu");

    menuButton.addEventListener("click", function () {
        menu.style.right = "0"; // Mostra o menu deslizando da direita para a esquerda
    });

    fecharMenuButton.addEventListener("click", function () {
        menu.style.right = "-300px"; // Oculta o menu deslizando da esquerda para a direita
    });
});
