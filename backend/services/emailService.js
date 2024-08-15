const nodemailer = require('nodemailer');
require('dotenv').config();

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or your SMTP service
  auth: {
    user: process.env.EMAIL_USER, // Your email id
    pass: process.env.EMAIL_PASS, // Your password
  },
});

// Send email function
const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to, // receiver email address
    subject, // Subject line
    text, // plain text body
    html, // html body
  };

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
