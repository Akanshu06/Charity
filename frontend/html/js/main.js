
function getAuthToken() {
    return localStorage.getItem('token');
}

// function to handle API errors
function handleApiError(error) {
    console.error('API Error:', error);
    alert('An error occurred. Please try again.');
}

// function to redirect to a specific URL
function redirectTo(url) {
    window.location.href = url;
}

// function to format dates (just as a placeholder)
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// display a loading spinner (placeholder)
function showLoading() {
    
    console.log('Loading...');
}

