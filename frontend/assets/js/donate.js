document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await axios.get('http://localhost:3000/charity');
        const charitySelect = document.getElementById('charity-select');
        response.data.charities.forEach(charity => {
            const option = document.createElement('option');
            option.value = charity.id;
            option.textContent = charity.name;
            charitySelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        alert('Failed to load charities');
    }
});

document.getElementById('donate-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const charityId = document.getElementById('charity-select').value;
console.log(amount,charityId);

    if (charityId && amount > 0) {
        donate(charityId, amount);
    } else {
        alert('Please select a charity and enter a valid amount.');
    }
});

async function donate(charityId, amount) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/donation', { charityId, amount }, {
            headers: { 'Authorization': token }
        });

        const { order, donation } = response.data;

        const options = {
            "key": "rzp_test_cSPyAWgKgZZ1AY", 
            "amount": order.amount, 
            "currency": "INR",
            "name": "Charity Donation",
            "description": "Donation to Charity",
            "order_id": order.id, 
            "handler": async function (response){
                const paymentResponse = await axios.post('http://localhost:3000/donation/verify', {
                    donationId: donation.id,
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                }, {
                    headers: { 'Authorization': token }
                });

                alert(paymentResponse.data.message);
                window.location.href='main.html';
            },
            "prefill": {
                "name": "Your Name",
                "email": "youremail@example.com",
                "contact": "1234567890"
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error(error);
        alert('Failed to initiate donation');
    }
}
