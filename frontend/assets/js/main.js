
// document.addEventListener('DOMContentLoaded', function() {
//     const browseButton = document.querySelector('.btn-primary');
//     browseButton.addEventListener('click', function() {
//         window.location.href = 'charities.html';
//     })

// Handle charity search and listing
document.getElementById('search-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const category = document.getElementById('category').value;
    const location = document.getElementById('location').value;
    
    try {
        const response = await axios.get('/charity', { params: { category, location } });
        const charitiesList = document.getElementById('charities-list');
        charitiesList.innerHTML = '';  // Clear previous results
        response.data.charities.forEach(charity => {
            const div = document.createElement('div');
            div.innerHTML = `<h2>${charity.name}</h2><p>${charity.description}</p><button onclick="donate(${charity.id}, ${charity.goal})">Donate</button>`;
            charitiesList.appendChild(div);
        });
    } catch (error) {
        console.error(error);
        alert('Failed to fetch charities');
    }
});

// Handle donation
async function donate(charityId, amount) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/donation', { charityId, amount }, {
            headers: { 'Authorization': token }
        });

        const { order, donation } = response.data;

        const options = {
            "key": "your_razorpay_key_id", // Enter the Key ID generated from the Dashboard
            "amount": order.amount, // Amount is in currency subunits
            "currency": "INR",
            "name": "Charity Donation",
            "description": "Donation to Charity",
            "order_id": order.id, // This is the order ID returned by Razorpay
            "handler": async function (response){
                const paymentResponse = await axios.post('/donation/verify', {
                    donationId: donation.id,
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                }, {
                    headers: { 'Authorization': token }
                });

                alert(paymentResponse.data.message);
            },
            "prefill": {
                "name": "Your Name",
                "email": "Your Email",
                "contact": "Your Contact Number"
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error(error);
        alert('Failed to initiate donation');
    }
}

