document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await axios.get('http://localhost:3000/admin/charities');
        const charitiesList = document.getElementById('charities-list');
        response.data.charities.forEach(charity => {
            const div = document.createElement('div');
            div.innerHTML = `<h2>${charity.name}</h2><p>${charity.category}</p><button onclick="approveCharity(${charity.id})">Approve</button>`;
            charitiesList.appendChild(div);
        });
    } catch (error) {
        console.error(error);
        alert('Failed to load charities');
    }
});

async function approveCharity(charityId) {
    try {
        await axios.put(`http://localhost:3000/admin/charity/${charityId}/approve`);
        alert('Charity approved!');
        location.reload();
    } catch (error) {
        console.error(error);
        alert('Failed to approve charity');
    }
}
