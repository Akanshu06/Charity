document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mission = document.getElementById('mission').value;
    const goals = document.getElementById('goals').value;
    const projects = document.getElementById('projects').value;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post('http://localhost:3000/api/charities/register', {
            name,
            email,
            password,
            mission,
            goals,
            projects
        },{ headers: { Authorization: `Bearer ${token}`}});
        alert('Charity registered successfully!');
        // window.location.href = 'login.html';
    } catch (error) {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
    }
});
