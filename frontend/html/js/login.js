document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email,
            password
        });
        localStorage.setItem('token', response.data.token);
        window.location.href = 'profile.html';
    } catch (error) {
        console.error('Login failed', error);
        alert('Login failed. Please try again.');
    }
});
