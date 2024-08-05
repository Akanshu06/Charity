async function loadProfile() {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });
        document.getElementById('profileInfo').innerText = JSON.stringify(response.data, null, 2);
    } catch (error) {
        console.error('Error loading profile', error);
    }
}

document.getElementById('viewDonationHistory').addEventListener('click', async function () {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:3000/api/donations', {
            headers: { Authorization: `Bearer ${token}` }
        });
        document.getElementById('donationHistory').innerText = JSON.stringify(response.data, null, 2);
    } catch (error) {
        console.error('Error loading donation history', error);
    }
});

loadProfile();
