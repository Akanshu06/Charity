document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await axios.post('http://localhost:3000/api/auth/register', {
            username,
            email,
            password
        });
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
    }
});
