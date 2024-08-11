document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to view this page');
        window.location.href = 'index.html';
        return;
    }

    try {
        // Fetch user profile
        const response = await axios.get('http://localhost:3000/profile/get', {
            headers: { 'Authorization': token }
        });
        document.getElementById('username').value = response.data.user.username;
        document.getElementById('email').value = response.data.user.email;
    } catch (error) {
        console.error(error);
        alert('Failed to load profile');
    }

    // Fetch user donation history
    try {
        const donationsResponse = await axios.get('http://localhost:3000/profile/donations', {
            headers: { 'Authorization': token }
        });
        const donationsList = document.getElementById('donations-list');
        donationsList.innerHTML = '';  // Clear previous list
        donationsResponse.data.donations.forEach(donation => {
            const li = document.createElement('li');
            li.textContent = `Donation of ${donation.amount} to Charity ID ${donation.charityId}`;
            donationsList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        alert('Failed to load donation history');
    }
});

document.getElementById('profile-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    try {
        const response = await axios.put('http://localhost:3000/profile/put', { username, email }, {
            headers: { 'Authorization': localStorage.getItem('token') }
        });
        alert('Profile updated successfully!');
    } catch (error) {
        console.error(error);
        alert('Profile update failed!');
    }
});
