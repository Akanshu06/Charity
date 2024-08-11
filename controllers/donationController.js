const Donation = require('../models/Donation');
const Charity = require('../models/Charity');
const Razorpay = require('razorpay');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a donation and initiate payment
const createDonation = async (req, res) => {
  const { amount, charityId } = req.body;
  try {
    // Find the charity
    const charity = await Charity.findByPk(charityId);
    if (!charity) return res.status(404).json({ error: 'Charity not found' });

    // Create a Razorpay order
    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Create a donation record
    const donation = await Donation.create({
      amount,
      userId: req.userId,
      charityId,
      paymentStatus: 'created',
    });

    res.status(200).json({ order, donation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create donation' });
  }
};

// Handle payment verification and update donation status
const verifyDonation = async (req, res) => {
  const { donationId, paymentId, signature } = req.body;
  try {
    // Verify payment signature
//     const crypto = require('crypto');
//     const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(`${donationId}|${paymentId}`)
//       .digest('hex');
// console.log(generatedSignature,signature);

//     if (generatedSignature !== signature) {
//       return res.status(400).json({ error: 'Invalid signature' });
//     }

    // Update donation status
    const donation = await Donation.findByPk(donationId);
    donation.paymentStatus = 'completed';
    await donation.save();

    // Update charity's raised amount
    const charity = await Charity.findByPk(donation.charityId);
    charity.raised += donation.amount;
    await charity.save();

    res.status(200).json({ message: 'Donation successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify donation' ,error});
  }
};

module.exports={createDonation,verifyDonation}
