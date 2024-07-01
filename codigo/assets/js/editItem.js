import { rules, read, update, convertImageToBase64 } from '../js/crud.js'

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
        if(element == 'pic') {
            const img = document.createElement('img');
            img.id = 'pic-pic';
            document.getElementById('input-list').appendChild(img);
        }
        if((element != rules[collectionName].id) || (itemId == null)) {
            const div = document.createElement('div');
            div.classList.add('form-group');

            const label = document.createElement('label');
            label.textContent = element;
            label.for = element;

            const input = document.createElement('input');
            input.type = element != 'pic' ? 'text': 'file';
            input.id = element;
            input.name = element;
            input.required = element != 'pic'? true : false;

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
            rules[collectionName].params.forEach(async element => {
                if(element == 'pic') {
                    const src = await read('Image', itemId);
                    document.getElementById('pic-pic').src = src.base64; 
                }
                else if(element != rules[collectionName].id) {
                    document.getElementById(element).value = item[element]; 
                }
            })
        })
}

async function saveForm(collectionName, itemId=null) {
    var data = {}
    rules[collectionName].params.forEach(async element => {
        if(element == 'pic') {
            var id = null
            if(itemId == null) {
                id = data[rules[collectionName].id]
            }
            else {
                id = itemId
            }

            var imageFile = document.getElementById('pic').files[0]
            var imageData = await convertImageToBase64(imageFile);
            update('Image', id, {'base64': imageData})
        }
        else if((element != rules[collectionName].id) || (itemId == null)) {
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
