import { auth, read } from "../js/crud.js"

const newsList = document.querySelector("article")
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


const news = await read("New")

news.forEach((item, index) => {
    const image = read('Image', item.id)
    const src = image.src
    newsList.innerHTML += `
    <div class="new-card">
    <img src="${src}" alt="">
    <div class="new-info">
    <time>${item.date}</time>
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
