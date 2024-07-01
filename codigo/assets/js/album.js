import {auth, isMember} from "./crud.js"
const accessKey = 'BVuM7V7vvXmOBRbmvNLATyYagqcCZNh4_l0DyX0I3EY';
const user = auth()

if(user == null) {window.location.href = 'login.html'}

function loadHeader() {
    let isAuthenticated = auth()
    if(isAuthenticated){
        document.getElementById("deslogar").style.display="block"
    }else{
        document.getElementById("deslogar").style.display="none"
    }
    const botoes=document.getElementById("botoes")
    botoes.innerHTML = !isAuthenticated ? `
    <a href="login.html">Fazer login</a>
    <a href="cadastro.html">Cadastre-se</a>
    ` : `
    <a href="perfil.html">Perfil</a>
    <a class="deslogar" href="#">Logout</a>
    `
}

if(!isMember()) {
    const board = document.getElementById("board").style.display="none"
}else{
    const board = document.getElementById("board").style.display="block"
}

document.getElementById("deslogar").addEventListener("click", ()=>{
    localStorage.clear()
    window.location.href = 'login.html'
})

window.addEventListener("load", loadHeader)

async function fetchImages(query, containerId) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const imagesContainer = document.getElementById(containerId);
    imagesContainer.innerHTML = '';

    data.results.forEach(image => {
        const imgElement = document.createElement('div');
        imgElement.classList.add('image-item');
        imgElement.innerHTML = `<img src="${image.urls.small}" alt="${image.alt_description}">`;
        imagesContainer.appendChild(imgElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchImages('sports', 'sports-images');
    fetchImages('party', 'party-images');
});

