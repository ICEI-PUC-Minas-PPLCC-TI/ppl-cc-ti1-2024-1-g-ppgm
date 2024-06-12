import { read } from './crud.js';

document.addEventListener('DOMContentLoaded', async function() {
    await read("Sport")
        .then((sports) => {
            sports.forEach((sport, index) => {
                // passar valores pro html
                // use como base o editItem.js - setInputs ou setValues
                var card = createCard(sport, index + 1);
                document.querySelector('.eventos').appendChild(card);
            });
        });
});

function createCard(sport, imgIdx) {
    const card = document.createElement('div');
    card.classList.add('event-card');

    const eventName = document.createElement('strong');
    eventName.textContent = sport.name;

    const eventDate = document.createElement('p');
    eventDate.textContent = sport.date;

    const eventHour = document.createElement('p');
    eventHour.textContent = `${sport["start-time"]} as ${sport["end-time"]}`;

    const eventLocation = document.createElement('p');
    eventLocation.textContent = sport.local;

    const eventImg = document.createElement("img")
    eventImg.src = `../assets/images/modalidade${imgIdx}.jpg`

    card.appendChild(eventImg)
    card.appendChild(eventName);
    card.appendChild(eventDate);
    card.appendChild(eventHour);
    card.appendChild(eventLocation);

    return card;
}
