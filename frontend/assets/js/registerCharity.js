document.getElementById('charity-register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    // Gather form data
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const website = document.getElementById('website').value;
    const location = e.target.location.value;
    const mission = document.getElementById('mission').value;
    const goals = document.getElementById('goals').value;
    const projects = document.getElementById('projects').value;
    const raised = parseInt(document.getElementById('raised').value, 10) || 0; // Parse raised value

    // Log data to console for debugging
    console.log(name, location);

    // Send data to server
    axios.post('http://localhost:3000/api/charities', {
        name,
        description,
        website,
        location,
        mission,
        goals,
        projects,
        raised
    }, {
        headers: { 'Authorization': token }
    })
    .then(response => {
        console.log('Charity registered successfully:', response.data);
        window.location.href = 'charities.html'; // Redirect to charity profile page
    })
    .catch(error => {
        console.error('Error registering charity:', error);
        alert('Failed to register charity. Please try again.'); // Inform the user of the error
    });
});
