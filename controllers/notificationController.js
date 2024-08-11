const nodemailer = require('nodemailer');

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Controller to handle donation confirmation email
const sendDonationConfirmation = async (req, res) => {
  try {
    const { email, donationDetails } = req.body;

    // Email options
    const mailOptions = {
      from: '"Charity Donation" akanshu06@gmail.com',
      to: email,
      subject: 'Donation Confirmation',
      text: `Thank you for your donation of ${donationDetails.amount} to charity ID ${donationDetails.charity}.`,
      html: `<p>Thank you for your donation of <strong>${donationDetails.amount}</strong> to charity ID <strong>${donationDetails.charity}</strong>.</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Donation confirmation email sent successfully' });
  } catch (error) {
    console.error('Error sending donation confirmation email:', error);
    res.status(500).json({ error: 'Failed to send donation confirmation email' });
  }
};

module.exports = { sendDonationConfirmation };
