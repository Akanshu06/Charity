async function loadCharities() {
    try {
        const response = await axios.get('http://localhost:3000/api/charities');
        const charityList = document.getElementById('charityList');
        charityList.innerHTML = response.data.map(charity => `
            <div>
                <h3>${charity.name}</h3>
                <p>${charity.mission}</p>
                <a href="charity-detail.html?id=${charity.id}">View Details</a>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading charities', error);
    }
}

document.getElementById('search').addEventListener('input', function () {
    const query = this.value;
    // Implement search logic
});

loadCharities();
