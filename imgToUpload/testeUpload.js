var btn = document.getElementById('sub-btn');
var people = document.getElementById('people');
var closeBtn = document.getElementById('close-button');

document.addEventListener('DOMContentLoaded', function () {
    btn.addEventListener('click', () => {
        btn.textContent = "INSCRITO";
        btn.style.backgroundColor = 'green';
        btn.style.color = 'white';
        btn.style.border = 'none';
        people.textContent = "Vagas: 3/190";
        closeBtn.style.visibility = 'visible';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    closeBtn.addEventListener('click', () => {
        btn.textContent = "INSCREVER-SE";
        btn.style.backgroundColor = ''; 
        btn.style.color = ''; 
        btn.style.border = '';
        people.textContent = "Vagas: 2/190";
        closeBtn.style.visibility = 'hidden';
    });
});