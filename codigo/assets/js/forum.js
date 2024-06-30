// Login 
import {create, auth} from "./crud.js"
import {auth, isMember} from "./crud.js"
const accessKey = 'BVuM7V7vvXmOBRbmvNLATyYagqcCZNh4_l0DyX0I3EY';
const user = auth()

const newQuestionForm = document.getElementById('newQuestionForm');
newQuestionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const questionTitle = document.getElementById('question-title').value;
    const questionContent = document.getElementById('question-content').value;
    console.log(`Nova pergunta: ${questionTitle} - ${questionContent}`);
   
    const informaçao = { 
        'title': questionTitle,
        'question': questionContent,
        'user': auth(),
        
    };
    create ('Question', informaçao) 
   
   
    document.getElementById('question-title').value = '';
    document.getElementById('question-content').value = '';
});


const forumContainer = document.getElementById('forum-container');

function addQuestion(title, content) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
    `;
    forumContainer.appendChild(questionDiv);
}

// Perguntas de exemplo
addQuestion('Como faço para me inscrever na Atlética?', 'Gostaria de saber quais os requisitos para me inscrever.');
addQuestion('Qual o calendário de eventos da Atlética?', 'Preciso saber quais os eventos que acontecerão este semestre.');

