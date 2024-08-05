async function loadCharity() {
    const params = new URLSearchParams(window.location.search);
    const charityId = params.get('id');
    
    try {
        const response = await axios.get(`http://localhost:3000/api/charities/${charityId}`);
        const charity = response.data;
        document.getElementById('charityName').innerText = charity.name;
        document.getElementById('charityMission').innerText = charity.mission;
        document.getElementById('charityProjects').innerHTML = charity.projects.map(project => `
            <div>
                <h4>${project.title}</h4>
                <p>${project.description}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading charity details', error);
    }
}

document.getElementById('donationForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const params = new URLSearchParams(window.location.search);
    const charityId = params.get('id');
    const amount = document.getElementById('amount').value;

    const token = localStorage.getItem('token');

    try {
        await axios.post('http://localhost:3000/api/donations', {
            charityId,
            amount
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        window.location.href = 'donation-success.html';
    } catch (error) {
        console.error('Donation failed', error);
        alert('Donation failed. Please try again.');
    }
});

loadCharity();
