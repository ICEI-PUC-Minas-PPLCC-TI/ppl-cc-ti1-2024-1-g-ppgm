import { read, update, remove } from '../js/crud.js'

const user_id = localStorage.getItem('token');
if(user_id === null) {
    window.location.href = 'login.html';
}
else {
    read("User", user_id)
        .then((data) => {
            document.getElementById('name').setAttribute('value', data['name'] ? data['name']: '');
            document.getElementById('email').setAttribute('value', data['email'] ? data['email']: '');
            document.getElementById('phone').setAttribute('value', data['phone'] ? data['phone']: '');
            document.getElementById('curso').setAttribute('value', data['curso'] ? data['curso']: '');
        })
}

document.getElementById('survey-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const curso = document.getElementById('curso').value;

    const new_data = {
        name: name,
        phone: phone,
        curso: curso,
    }

    try {
        update("User", user_id, new_data);
        alert("Perfil atualizado");
    }
    catch (error) {
        alert('Não foi possível atualizar o usuário.');
    }
});

document.getElementById("Deletar").addEventListener('click', () => {
    try {
        remove("User", user_id)
            .then(() => {
                localStorage.clear()
                window.location.href = 'cadastro.html';
            })
    } 
    catch (error) {
        alert('Não foi possível atualizar o usuário.');
    }
})
