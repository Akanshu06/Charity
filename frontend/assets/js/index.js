//const searchBar = document.getElementById('searchBar')
const token = localStorage.getItem('token');
document.addEventListener('DOMContentLoaded', async() => {
    const searchBar = document.getElementById('searchBar');
    const charitiesContainer = document.getElementById('charitiesContainer');

    // Sample data for charities, this would usually come from an API
    const response = await axios.get('http://localhost:3000/api/charities',{
        headers: { 'Authorization': token }
    })
    const charities = response.data.charities;
    console.log(charities);
    
    // Function to display charities
    function displayCharities(filteredCharities) {
        charitiesContainer.innerHTML = ''; // Clear previous results
        filteredCharities.forEach(charity => {
            const charityElement = document.createElement('div');
            const anchor = document.createElement('a');
            charityElement.textContent = `${charity.name} - ${charity.description} - ${charity.location}`;
            anchor.href='charities.html';
            anchor.textContent='Charities';
            charitiesContainer.appendChild(charityElement);
            charitiesContainer.appendChild(anchor)
        });
    }

    // Display all charities by default
    displayCharities(charities);

    // Function to filter charities based on search query
    function filterCharities(query) {
        return charities.filter(charity => {
            return (
                charity.name.toLowerCase().includes(query.toLowerCase()) ||
                charity.description.toLowerCase().includes(query.toLowerCase()) ||
                charity.location.toLowerCase().includes(query.toLowerCase())
            );
        });
    }

    // Event listener for keyup event
    searchBar.addEventListener('keyup', () => {
        const query = searchBar.value;
        const filteredCharities = filterCharities(query);
        displayCharities(filteredCharities);
    });
});
