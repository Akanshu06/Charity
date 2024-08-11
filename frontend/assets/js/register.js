document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
        const response = await axios.post('http://localhost:3000/auth/register', { username, email, password });
        alert('Registration successful!');
        window.location.href = 'donate.html'
    } catch (error) {
        console.error(error);
        alert('Registration failed!');
    }
});