import { read } from '../js/crud.js'

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    try {
        const data = await read("User", email);
        if (password === data['password']) {
            console.log("Login Successful");
            localStorage.setItem('token', email);
            localStorage.setItem('function', data['function']);
            window.location.href = 'telahome.html';
        }
        else alert('Usuário ou senha incorretos');

    } catch (error) {
        alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
});
