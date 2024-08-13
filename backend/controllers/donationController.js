const Donation = require('../models/donation');
const Charity = require('../models/charity');
const Razorpay = require('razorpay');
require('dotenv').config();

exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.findAll();
    res.status(200).json({donations});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a donation and initiate payment
// In createDonation
exports.createDonation = async (req, res) => {
  const { amount, charityId } = req.body;
  try {
    const charity = await Charity.findByPk(charityId);
    if (!charity) return res.status(404).json({ error: 'Charity not found' });

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const donation = await Donation.create({
      amount,
      userId: req.userId.id,
      charityId,
      paymentStatus: 'created',
    });

    res.status(200).json({ order, donation });
  } catch (error) {
    console.error('Error in createDonation:', error); // Log error details
    res.status(500).json({ error: 'Failed to create donation' });
  }
};

// In verifyDonation
exports.verifyDonation = async (req, res) => {
  const { donationId, paymentId } = req.body;
  try {
    const donation = await Donation.findByPk(donationId);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });

    // Verify payment signature 
    const crypto = require('crypto');
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${donationId}|${paymentId}`)
      .digest('hex');
    console.log('Generated Signature:', generatedSignature);

    const signature = req.body.signature; 
    if (generatedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    donation.paymentStatus = 'completed';
    await donation.save();

    const charity = await Charity.findByPk(donation.charityId);
    charity.raised += donation.amount;
    await charity.save();

    res.status(200).json({ message: 'Donation successful' });
  } catch (error) {
    console.error('Error in verifyDonation:', error); // Log error details
    res.status(500).json({ error: 'Failed to verify donation' });
  }
};
