document.getElementById('donation-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const urlParams = new URLSearchParams(window.location.search);
    const charityId = urlParams.get('charityId');

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
        const response = await axios.post('http://localhost:3000/api/donations', { charityId, amount }, {
            headers: { 'Authorization': token }
        });

        const { order, donation } = response.data;
        console.log('order',response.data);
        

        const options = {
            "key": "rzp_test_cSPyAWgKgZZ1AY", 
            "amount": order.amount, 
            "currency": "INR",
            "name": "Charity Donation",
            "description": "Donation to Charity",
            "order_id": order.id, 
            "handler": async function (response){
                const paymentResponse = await axios.post('http://localhost:3000/api/donations/verify', {
                    donationId: donation.id,
                    paymentId: response.razorpay_payment_id,
                    //signature: response.razorpay_signature,
                }, {
                    headers: { 'Authorization': token }
                });

                alert(paymentResponse.data.message);
                window.location.href='main.html';
            },
           
        };

        const rzp = new Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error(error);
        alert('Failed to initiate donation');
    }
}
