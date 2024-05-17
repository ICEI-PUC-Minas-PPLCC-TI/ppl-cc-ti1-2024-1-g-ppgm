import { create } from '../js/crud.js'

const formulario = document.querySelector("#registrationForm")

formulario.onsubmit = function(event) {
    event.preventDefault()
    const name = formulario.querySelector("#name").value
    const email = formulario.querySelector("#email").value
    const password = formulario.querySelector("#password").value

    const data = {
        name: name,
        password: password,
        email: email
    }

    create("User", data)
        .then(() => {
            window.location.href = 'login.html'
        })

}
