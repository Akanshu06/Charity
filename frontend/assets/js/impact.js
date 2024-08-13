document.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/api/impact')
    .then(response => {
        const impactReport = document.getElementById('impact-report');
        impactReport.innerHTML = `<p>${response.data.message}</p>`;
    })
    .catch(error => console.error('Error fetching impact report:', error));
});
