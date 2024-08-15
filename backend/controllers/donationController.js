const Donation = require('../models/donation');
const Charity = require('../models/charity');
const crypto = require('crypto');
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

exports.verifyDonation = async (req, res) => {
  const { donationId, paymentId, order_id, signature } = req.body;

  try {
    const donation = await Donation.findByPk(donationId);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    // Generate the expected signature based on Razorpay's guidelines
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${order_id}|${paymentId}`)
      .digest('hex');

    // Compare the generated signature with the one received from Razorpay
    if (generatedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Update donation status to 'completed' after successful verification
    donation.paymentStatus = 'completed';
    await donation.save();

    // Update the total amount raised by the charity
    const charity = await Charity.findByPk(donation.charityId);
    charity.raised += donation.amount;
    await charity.save();

    // Send a success response
    res.status(200).json({ message: 'Donation successful' });

  } catch (error) {
    console.error('Error in verifyDonation:', error);
    res.status(500).json({ error: 'Failed to verify donation' });
  }
};
