const { Donation, Charity, User } = require('../models');
const paymentService = require('../sevices/paymentService');

const makeDonation = async (req, res) => {
  const { charityId, amount } = req.body;
  const userId = req.user.id;
  try {
    const charity = await Charity.findByPk(charityId);
    if (!charity) return res.status(404).json({ error: 'Charity not found' });

    // Process payment through paymentService
    await paymentService.processPayment(amount);

    const donation = await Donation.create({ amount, UserId: userId, CharityId: charityId });
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getDonationHistory = async (req, res) => {
  const userId = req.user.id;
  try {
    const donations = await Donation.findAll({ where: { UserId: userId }, include: [Charity] });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { makeDonation, getDonationHistory };
