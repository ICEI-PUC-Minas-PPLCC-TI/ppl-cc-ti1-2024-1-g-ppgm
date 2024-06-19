import { read } from '../js/crud.js'

document.addEventListener('DOMContentLoaded', async function() {
    await read("Question")
        .then((questions) => {
            const cardContainer = document.getElementById('card-container');

            questions.forEach(question => {
                var card = createForumCard(question);
                cardContainer.appendChild(card);
            });
        })
})

function createForumCard(_info) {
    const card = document.createElement('div');
    card.classList.add('card');

    const question = document.createElement('p');
    question.classList.add('question');
    question.textContent = _info.question;
    card.appendChild(question);

    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = _info.user + ' * ' + _info.date;
    card.appendChild(description);

    return card;
}
