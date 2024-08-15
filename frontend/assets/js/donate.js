document.getElementById('donation-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
   // const email = document.getElementById('email').value;
   const urlParams = new URLSearchParams(window.location.search);
   const charityId = urlParams.get('charityId');


    if (charityId && amount >0) {
        donate(charityId, amount);
    } else {
        alert('Please fill out all fields correctly.');
    }
});

async function donate(charityId, amount) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/api/donations', 
        { charityId, amount }, 
        { headers: { 'Authorization': token } });

        const { order, donation } = response.data;

        const options = {
            key: "rzp_test_cSPyAWgKgZZ1AY", // Replace with your Razorpay key
            amount: order.amount, 
            currency: "INR",
            name: "Charity Donation",
            description: "Donation to Charity",
            order_id: order.id, 
            handler: async function (response) {
                const paymentResponse = await axios.post('http://localhost:3000/api/donations/verify', {
                    donationId: donation.id,
                    paymentId: response.razorpay_payment_id,
                    order_id: order.id,
                    signature: response.razorpay_signature,
                }, { headers: { 'Authorization': token }});

                alert(paymentResponse.data.message);
                await sendDonationConfirmation(donation.id);
                window.location.href = 'main.html';
            },
        };

        const rzp = new Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error(error);
        alert('Failed to initiate donation');
    }
}

async function sendDonationConfirmation(donationId) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/api/notifications/donation-confirmation', 
        { donationId }, 
        { headers: { 'Authorization': token } });

        if (response.status === 200) {
            alert('Donation confirmation email sent');
        } else {
            console.error('Failed to send confirmation email');
        }
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
}
