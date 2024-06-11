import { auth, read } from "../js/crud.js"

const newsList = document.querySelector(".eventos")
const botoes = document.querySelector(".botoes")

function loadHeader() {
    let isAuthenticated = auth()
    
    botoes.innerHTML = !isAuthenticated ? `
    <a href="login.html">Fazer login</a>
    <a href="cadastro.html">Cadastre-se</a>
    ` : `
    <a href="perfil.html">Perfil</a>
    <a class="deslogar" href="#">Logout</a>
    `
}

window.addEventListener("load", loadHeader)


const news = await read("Events")
console.log(news);

news.forEach(item => {
    newsList.innerHTML += `
    <div class="event-card">
    <img src="../assets/images/fundo.jpg" alt="">
    <div class="event-info">
    <strong>${item.title}</strong>
    <p>${item.description}</p>
    </div>
    </div>
    `
})

const logoutBtn = document.querySelector(".deslogar")

logoutBtn.onclick = () => {
    localStorage.clear()
    loadHeader()
}