const token = localStorage.getItem('token');
document.addEventListener('DOMContentLoaded', () => {

    
    axios.get('http://localhost:3000/api/profile/get', {
        headers: { 'Authorization': token }
    })
    .then(response => {
        const profileInfo = document.getElementById('profile-info');
        profileInfo.innerHTML = `<p>${response.data.username} - ${response.data.email}</p>`;
    })
    .catch(error => console.error('Error fetching profile:', error));

    document.getElementById('profile-update-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        axios.put('http://localhost:3000/api/profile', {
            username,
            email
        }, {
            headers: { 'Authorization': token }
        })
        .then(response => {
            console.log('Profile updated:', response.data);
        })
        .catch(error => console.error('Error updating profile:', error));
    });

    shoAllDonations()

});

async function shoAllDonations (){
    try {
        const donationsResponse = await axios.get('http://localhost:3000/api/donations', {
            headers: { 'Authorization': token }
        });
        const donationsList = document.getElementById('donations-list');
        donationsList.innerHTML = '';  // Clear previous list
        console.log(donationsResponse.data);
        
        donationsResponse.data.donations.forEach(donation => {
            const li = document.createElement('li');
            li.textContent = `Donation of ${donation.amount} to Charity ID ${donation.charityId}`;
            donationsList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        alert('Failed to load donation history');
    }
}