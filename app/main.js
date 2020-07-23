const loginLink = document.getElementById('loginLink')
const registerLink = document.getElementById('registerLink')
const login = document.getElementById('login')
const register = document.getElementById('register')
const dashboard = document.getElementById('dashboard')
const welcome = document.getElementById('welcome')
const logout = document.getElementById('logout')
const loginForm = document.getElementById('loginForm')
const registerForm = document.getElementById('registerForm')
const loginFormBtn = document.getElementById('loginFormBtn')
const registerFormBtn = document.getElementById('registerFormBtn')
const logoutBtn = document.getElementById('logoutBtn')
let str = ''

loginLink.addEventListener('click', () => {
    let token = window.localStorage.getItem('RESTapiToken')
    console.log(token)
    if(token){
        axios({
                method: 'post',
                url: 'http://localhost:3000/welcome',
                headers: {
                  auth: window.localStorage.getItem('RESTapiToken'),
                }
            })
            .then(function (response) {
                dashboard.style.display='none'
                console.log(response)
                str = `<h1>Hello, ${response.data.username} welcome to the site</h1>
                <h2>Your Email is ${response.data.email}</h2>`

                welcome.innerHTML = str
                welcome.style.display = 'block'
                logout.style.display = 'block'
            })
            .catch(function (error) {
                console.log(error);
            })
        } else {
            dashboard.style.display='none'
            login.style.display='block'
        }   
})

registerLink.addEventListener('click', () => {
    
        dashboard.style.display='none'
        register.style.display='block'
    
})

loginFormBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log(loginForm.loginEmail.value.toString())
    console.log(loginForm.loginPassword.value)
    
    axios.post('http://localhost:3000/login', {
        email: loginForm.loginEmail.value.toString(),
        password: loginForm.loginPassword.value
    })
    .then(function (response) {

        if(response.data.emsg){
            return alert(response.data.emsg)
        }
        str = `<h1>Hello, ${response.data.username} welcome to the site</h1>
                <h2>Your Email is ${response.data.email}</h2>`

        window.localStorage.setItem('RESTapiToken', response.data.token)
        welcome.innerHTML = str
        login.style.display = 'none'
        welcome.style.display = 'block'
        logout.style.display = 'block'
        console.log(response)
    })
    .catch(function (error) {
        return error
    })
})

registerFormBtn.addEventListener('click', (e) => {
    e.preventDefault()
    axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        data: {
            name : registerForm.registerName.value,
            email: registerForm.registerEmail.value,
            password: registerForm.registerPassword.value,
            confPassword: registerForm.registerCPassword.value
        }
    }).then(response => {
        console.log(response)
        if(response.data.emsg){
            return alert(response.data.emsg)
        }
        if(response.data.errors){
            return alert(response.data.message)
        }
        
        alert(response.data.message)
        window.location = './index.html'
    })
    .catch(e => {

    })
})

logoutBtn.addEventListener('click', ()=> {
    let token = window.localStorage.getItem('RESTapiToken')
    console.log(token)
    if(token){
        axios({
                method: 'post',
                url: 'http://localhost:3000/logout',
                headers: {
                  auth: window.localStorage.getItem('RESTapiToken'),
                }
            })
            .then(function (response) {
                alert(response.data.msg)
                window.localStorage.removeItem('RESTapiToken')
                window.location = './index.html'
            })
            .catch(function (error) {
                alert(error)
            })
        } else {
            window.location = './index.html'
        }
})
