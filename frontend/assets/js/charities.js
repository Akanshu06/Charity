document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await axios.get('http://localhost:3000/charity');
        const charitiesContainer = document.getElementById('charities-list');
        response.data.charities.forEach(charity => {
            const div = document.createElement('div');
            div.innerHTML = `
                <a href='register.html'>
                    <h2>${charity.name}</h2>
                    <p>${charity.category}</p>
                    Click here to Donate
                </a>`;
            charitiesContainer.appendChild(div);
        });
    } catch (error) {
        console.error(error);
        alert('Failed to load charities');
    }
});

// Register a new charity
document.getElementById('charity-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const mission = document.getElementById('mission').value;
    const goal = document.getElementById('goal').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value
    const location = document.getElementById('location').value

    try {
        const response = await axios.post('http://localhost:3000/charity/create', { name, mission, goal, category,location,description});
        alert('Charity registered successfully!');
        window.location.href = '.charities.html'
    } catch (error) {
        console.error(error);
        alert('Failed to register charity.');
    }
});

// Load and display list of approved charities
// async function loadCharities() {
//     try {
//         const response = await axios.get('http://localhost:3000/charity');
//         const charitiesList = document.getElementById('charities-list');
//         charitiesList.innerHTML = '';  // Clear previous list
//         const charities = response.data.charities;
//         console.log(charities);

//         charities.forEach(charity => {
//             const charityElement = document.createElement('div');
//             charityElement.innerHTML = `
//                 <a href='donate.html'>
//                     <h2>${charity.name}</h2>
//                     <p>${charity.category}</p>
//                 </a>
//             `;
//             charitiesList.appendChild(charityElement);
//         });
//     } catch (error) {
//         console.error(error);
//         alert('Failed to load charities.');
//     }
// }

// Load charities on page load
//loadCharities();
