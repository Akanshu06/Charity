
document.addEventListener('DOMContentLoaded', () => {
    const signinBtn = document.getElementById('signinBtn'); 
    const loginBtn = document.getElementById('loginBtn');
    const donateBtn = document.getElementById('donateBtn');
    const charitiesBtn = document.getElementById('charitiesBtn');
    const content = document.getElementById('content');


    signinBtn.addEventListener('click', () => {
        content.innerHTML = `
         <h2>Login</h2>
            <form id="signinForm">
                <label for="name">Name:</label>
                <input type="name" id="name" name="name" required><br><br>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br><br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required><br><br>
                <button type="submit">Signin</button>
            </form>
        `;
        document.getElementById('signinForm').addEventListener('submit', async(event) => {
            event.preventDefault();
            const username = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            try {
                const response = await axios.post('http://localhost:3000/api/auth/signin', {
                    username,
                    email,
                    password
                });
                alert('Signin successful!');
            } catch (error) {
                alert('signin failed!');
            }
        });

    });


    loginBtn.addEventListener('click', () => {
        content.innerHTML = `
            <h2>Login</h2>
            <form id="loginForm">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <button type="submit">Login</button>
            </form>
        `;
        document.getElementById('loginForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await axios.post('http://localhost:3000/api/auth/login', {
                    email,
                    password
                });
                alert('Login successful!');
            } catch (error) {
                alert('Login failed!');
            }
        });
    });

    donateBtn.addEventListener('click', () => {
        content.innerHTML = `
            <h2>Donate</h2>
            <form id="donationForm">
                <label for="amount">Donation Amount:</label>
                <input type="number" id="amount" name="amount" required>
                <button type="submit">Donate</button>
            </form>
        `;
        document.getElementById('donationForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const amount = document.getElementById('amount').value;

            try {
                const response = await axios.post('http://localhost:3000/api/donations', {
                    amount
                });
                alert('Donation successful!');
            } catch (error) {
                alert('Donation failed!');
            }
        });
    });

    charitiesBtn.addEventListener('click', async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/charities');
            const charities = response.data;
            content.innerHTML = `
                <h2>Charities</h2>
                <ul>
                    ${charities.map(charity => `<li>${charity.name}</li>`).join('')}
                </ul>
            `;
        } catch (error) {
            content.innerHTML = '<h2>Error</h2><p>Failed to load charities.</p>';
        }
    });
});
