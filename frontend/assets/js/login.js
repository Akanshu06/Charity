
// Handling login
document.addEventListener('DOMContentLoaded', function() {
    // Handling login
    document.getElementById('login-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            window.location.href = 'admin.html';
        } catch (error) {
            console.error(error);
            alert('Login failed!');
        }
    });
});
