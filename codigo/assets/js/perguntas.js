import { read, create } from "./crud.js";

const perguntasContainer = document.getElementById('perguntas-container');

async function loadQuestions() {
    const questions = await read("Question");
    const respostas = await read("Answer");
    if (questions) {
        for (const question of questions) {
            const rq = respostas.filter(item => item.id == question.id);
            addQuestion(question.title, question.question, question.id);
            await loadAnswers(rq, question.id);
        }
    } else {
        perguntasContainer.innerHTML = '<p>Não há perguntas disponíveis no momento.</p>';
    }
}

function addQuestion(title, content, questionId) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <div class="answers-container" data-question-id="${questionId}"></div>
        <form class="answer-form" data-question-id="${questionId}">
            <textarea name="answer" placeholder="Digite sua resposta aqui..." required></textarea>
            <button type="submit">Responder</button>
        </form>
    `;
    perguntasContainer.appendChild(questionDiv);

    const answerForm = questionDiv.querySelector('.answer-form');
    answerForm.addEventListener('submit', handleAnswerSubmit);
}

async function loadAnswers(answers, questionId) {
    const answersContainer = document.querySelector(`.answers-container[data-question-id="${questionId}"]`);
    console.log(answers)
    if (answers && answers.length > 0) {
        addAnswerHeader(answersContainer);
        for (const answer of answers) {
            addAnswer(answersContainer, answer.answer);
        }
    } else {
        answersContainer.innerHTML = '<p>Não há respostas disponíveis no momento.</p>';
    }
}

function addAnswerHeader(container) {
    const headerDiv = document.createElement('div');
    headerDiv.className = 'answer-header';
    headerDiv.innerHTML = '<p>Resposta:</p>';
    container.appendChild(headerDiv);
}

function addAnswer(container, content) {
    const answerDiv = document.createElement('div');
    answerDiv.className = 'answer';
    answerDiv.innerHTML = `<p>${content}</p>`;
    container.appendChild(answerDiv);
}

async function handleAnswerSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const questionId = form.getAttribute('data-question-id');
    const answer = form.elements['answer'].value;

    const answerData = {
        'title': questionId, 
        'answer': answer
    };

    await create('Answer', answerData);

    form.reset();
    alert('Resposta enviada com sucesso!');

    const answersContainer = document.querySelector(`.answers-container[data-question-id="${questionId}"]`);
    
    if (!answersContainer.querySelector('.answer-header')) {
        addAnswerHeader(answersContainer);
    }

    addAnswer(answersContainer, answer);
}

document.addEventListener('DOMContentLoaded', loadQuestions);
