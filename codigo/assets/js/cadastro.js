// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo realiza o registro de novos usuários e login para aplicações com 
// backend baseado em API REST provida pelo JSONServer
// Os dados de usuário estão disponíveis na seguinte URL
// https://jsonserver.rommelpuc.repl.co/usuarios
//
// Para fazer o seu servidor, acesse o projeto do JSONServer no Replit, faça o 
// fork do projeto e altere o arquivo db.json para incluir os dados do seu projeto.
// URL Projeto JSONServer: https://replit.com/@rommelpuc/JSONServer
//
// Autor: Rommel Vieira Carneiro (rommelcarneiro@gmail.com)
// Data: 29/04/2024
//
// Código LoginApp  


// Página inicial de Login
const LOGIN_URL = "/codigo/pages/login.html"
const apiUrl = 'https://38377b75-92e6-40fd-b765-488a2f7b3ae7-00-16ch18n2g57t6.worf.replit.dev/usuarios';

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};

// Objeto para o usuário corrente
var usuarioCorrente = {};

// função para gerar códigos randômicos a serem utilizados como código de usuário
// Fonte: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


// Dados de usuários para serem utilizados como carga inicial
const dadosIniciais = {
    usuarios: [
        { "id": generateUUID (), "senha": "123", "nome": "Administrador do Sistema", "email": "admin@abc.com"},
        { "id": generateUUID (), "senha": "123", "nome": "Usuario Comum", "email": "user@abc.com"},
    ]
};

// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initLoginApp () {
    // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }

    // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            db_usuarios = data;
        })
        .catch(error => {
            console.error('Erro ao ler usuários via API JSONServer:', error);
            alert("Erro ao ler usuários");
        });
};

function addUser (nome, senha, email) {

    // Cria um objeto de usuario para o novo usuario 
    let newId = generateUUID ();
    let usuario = { "id": newId, "senha": senha, "nome": nome, "email": email };

    const usuarioJaExiste = db_usuarios.find(usuario => usuario.email === email)
    if(usuarioJaExiste) {
        alert("Usuario ja existe")
        return
    }

    // Envia dados do novo usuário para ser inserido no JSON Server
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
        .then(response => response.json())
        .then(data => {
            db_usuarios.push(data.usuario);
            alert("Usuário inserido com sucesso");
            window.location = LOGIN_URL
        })
        .catch(error => {
            console.error('Erro ao inserir usuário via API JSONServer:', error);
            alert("Erro ao inserir usuário");
        });
}

const formulario = document.querySelector("#registrationForm")

formulario.onsubmit = function(event) {
    event.preventDefault()
    const name = formulario.querySelector("#name").value
    const email = formulario.querySelector("#email").value
    const password = formulario.querySelector("#password").value

    addUser(name, password, email)

}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp ();