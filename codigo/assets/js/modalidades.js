import { read } from './crud.js'

document.addEventListener('DOMContentLoaded', async function() {
    await read("Sport")
        .then((sports) => {
            sports.forEach(sport => {
                // passar valores pro html
                // use como base o editItem.js - setInputs ou setValues
                var card = createCard(sport);
            });
        })
})

function createCard(sport) {
    const card = document.createElement('card');
    // card.classList.
}