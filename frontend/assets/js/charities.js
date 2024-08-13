document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/api/charities', {
        headers: { 'Authorization': token }
    })
        .then(response => {
            const charityList = document.getElementById('charity-list');
            const charities = response.data.charities || [];

            charities.forEach(charity => {       
                const charityDiv = document.createElement('div');
                charityDiv.classList.add('charity-item');
                // Create content
                const charityName = document.createElement('p');
                charityName.textContent = `${charity.name} - ${charity.description}`;
                // Create 'Register' link
                const registerLink = document.createElement('a');
                registerLink.href = `donate.html?charityId=${charity.id}`; // Include charity ID in URL
                registerLink.textContent = 'Donate';
                // Append content to container
                charityDiv.appendChild(charityName);
                charityDiv.appendChild(registerLink);
                // Append container to list
                charityList.appendChild(charityDiv);
            });
        })
        .catch(error => console.error('Error fetching charities:', error));
});
