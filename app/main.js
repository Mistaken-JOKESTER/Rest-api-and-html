const loginLink = document.getElementById('loginLink')
const registerLink = document.getElementById('registerLink')
const login = document.getElementById('login')
const register = document.getElementById('register')
const dashboard = document.getElementById('dashboard')
const loginForm = document.getElementById('loginForm')
const loginFormBtn = document.getElementById('loginFormBtn')


loginLink.addEventListener('click', () => {
    dashboard.style.display='none'
    login.style.display='block'
})

registerLink.addEventListener('click', () => {
    dashboard.style.display='none'
    register.style.display='block'
})

loginFormBtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(loginForm.loginEmail.value)
    console.log(loginForm.loginPassword.value)
    axios.post('localhost:3000/login', {
        "email": "anki53724@1998",
        "password": "12344566"
    },{ crossdomain: true })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
})

