import { rules, read, update } from '../js/crud.js'

document.addEventListener('DOMContentLoaded', function() {
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    const itemId = getQueryParam('id');
    const collectionName = getQueryParam('collection');

    if (itemId && collectionName) { 
        setInputs(collectionName);
        setValues(collectionName, itemId);

        document.getElementById('edit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            saveForm(collectionName, itemId);
        })
    }
    else {
        console.error('No ID or collection name found in the URL');
    }
})

function setInputs(collectionName) {
    rules[collectionName].params.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('form-group');

        const label = document.createElement('label');
        label.textContent = element;
        label.for = element;

        const input = document.createElement('input');
        input.type = "text";
        input.id = element;
        input.name = element;
        input.required = true;

        div.appendChild(label);
        div.appendChild(input);

        document.getElementById('input-list').appendChild(div);
    });
}

async function setValues(collectionName, itemId) {
    await read(collectionName, itemId)
        .then((item) => {
            document.getElementById('item-id').textContent = `ID: ${item[rules[collectionName].id]}`
            rules[collectionName].params.forEach(element => {
                document.getElementById(element).value = item[element]; 
            })
        })
}

async function saveForm(collectionName, itemId) {
    var data = {}
    rules[collectionName].params.forEach(element => {
        data[element] = document.getElementById(element).value;
    })

    await update(collectionName, itemId, data);
}
