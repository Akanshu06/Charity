const emailService = require('../sevices/emailService');

const sendDonationConfirmation = async (req, res) => {
  const { userEmail, charityName, amount } = req.body;
  try {
    await emailService.sendEmail(userEmail, 'Donation Confirmation', `Thank you for donating ${amount} to ${charityName}`);
    res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const sendImpactReport = async (req, res) => {
  const { userEmail, charityName, impactReport } = req.body;
  try {
    await emailService.sendEmail(userEmail, `Impact Report from ${charityName}`, impactReport);
    res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { sendDonationConfirmation, sendImpactReport };
