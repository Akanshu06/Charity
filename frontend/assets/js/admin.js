const token = localStorage.getItem('token');
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display users
    axios.get('http://localhost:3000/api/admin/users', {
        headers: { 'Authorization': token }
    })
    .then(response => {
        const userList = document.getElementById('user-list');
        const users = response.data.users || [];
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `<p>${user.username} - ${user.email}</p>`;
            // Add more actions if needed
            userList.appendChild(userDiv);
        });
    })
    .catch(error => console.error('Error fetching users:', error));

    // Fetch and display charities
    axios.get('http://localhost:3000/api/admin/charities', {
        headers: { 'Authorization': token }
    })
    .then(response => {
        const charityList = document.getElementById('charity-list');
        response.data.charities.forEach(charity => {
            const charityDiv = document.createElement('div');
            charityDiv.innerHTML = `
                <p>${charity.name} - ${charity.description} - Approved: ${charity.approved}</p>
                <button onclick="approveCharity('${charity.id}', true)">Approve</button>
                <button onclick="approveCharity('${charity.id}', false)">Reject</button>
                <button onclick="deleteCharity('${charity.id}')">Delete</button>
            `;
            charityList.appendChild(charityDiv);
        });
    })
    .catch(error => console.error('Error fetching charities:', error));
});

// Approve or reject a charity
function approveCharity(id, approve) {
    axios.put(`http://localhost:3000/api/admin/charity/${id}/approve`, { approved: approve }, {
        headers: { 'Authorization': token }
    })
    .then(response => {
        console.log('Charity status updated:', response.data);
        location.reload(); // Reload to reflect changes
    })
    .catch(error => console.error('Error updating charity status:', error));
}

// Delete a charity
function deleteCharity(id) {
    if (confirm('Are you sure you want to delete this charity?')) {
        axios.delete(`http://localhost:3000/api/admin/charity/${id}`, {
            headers: { 'Authorization': token }
        })
        .then(response => {
            console.log('Charity deleted:', response.data);
            location.reload(); // Reload to reflect changes
        })
        .catch(error => console.error('Error deleting charity:', error));
    }
}
