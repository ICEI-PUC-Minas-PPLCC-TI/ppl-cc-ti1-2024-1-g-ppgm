import { rules, read, update } from '../js/crud.js'

document.addEventListener('DOMContentLoaded', function() {
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    const itemId = getQueryParam('id');
    const collectionName = getQueryParam('collection');

    if (itemId && collectionName) { 
        setInputs(collectionName, itemId);
        setValues(collectionName, itemId);

        document.getElementById('edit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            saveForm(collectionName, itemId)
                .then(() => {
                    alert(`${itemId} foi atualizado.`);
                    window.location.href = 'board.html';
                })
        })
    }
    else if(collectionName) {
        setInputs(collectionName);

        document.getElementById('edit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            saveForm(collectionName, itemId)
                .then(() => {
                    alert(`Novo ${collectionName} adicionado.`);
                    window.location.href = 'board.html';
                })
        })
    }
    else {
        console.error('No ID or collection name found in the URL');
    }
})

function setInputs(collectionName, itemId=null) {
    rules[collectionName].params.forEach(element => {
        if((element != rules[collectionName].id) || (itemId == null)) {
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
        }
    });
}

async function setValues(collectionName, itemId) {
    await read(collectionName, itemId)
        .then((item) => {
            document.getElementById('item-id').textContent = `ID: ${item[rules[collectionName].id]}`
            rules[collectionName].params.forEach(element => {
                if(element != rules[collectionName].id) {
                    document.getElementById(element).value = item[element]; 
                }
            })
        })
}

async function saveForm(collectionName, itemId=null) {
    var data = {}
    rules[collectionName].params.forEach(element => {
        if((element != rules[collectionName].id) || (itemId == null)) {
            data[element] = document.getElementById(element).value;
        }
    })

    if(itemId == null) {
        itemId = data[rules[collectionName].id]
    }

    if(await update(collectionName, itemId, data)) {
        return true;
    }
    return false;
}
