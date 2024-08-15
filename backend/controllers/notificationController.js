const { sendEmail } = require('../services/emailService');
const Donation = require('../models/donation');
const User = require('../models/user');

exports.sendDonationConfirmation = async (req, res) => {
  const { donationId } = req.body;

  try {
    const donation = await Donation.findByPk(donationId);
    const user = await User.findByPk(donation.userId);

    if (!user || !donation) {
      return res.status(404).json({ message: 'User or Donation not found' });
    }

    await sendEmail(
      user.email,
      'Donation Confirmation',
      `Thank you for your donation of $${donation.amount}!`,
      `<p>Thank you for your donation of $${donation.amount}!</p>`
    );

    res.status(200).json({ message: 'Donation confirmation email sent' });
  } catch (error) {
    console.error('Error sending donation confirmation:', error);
    res.status(500).json({ message: 'Failed to send confirmation email' });
  }
};
