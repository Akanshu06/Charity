document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password
    })
    .then(response => {
        console.log('Registration successful:', response.data);
        window.location.href = 'login.html'; // Redirect to login page after registration
    })
    .catch(error => console.error('Error registering:', error));
});
