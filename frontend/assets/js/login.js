document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
    })
    .then(response => {
        localStorage.setItem('token', response.data.token);
        console.log('Login successful:', response.data);
        window.location.href = 'index.html'; // Redirect to index page after login
    })
    .catch(error => console.error('Error logging in:', error));
});
