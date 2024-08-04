const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, subject, text) => {
  const msg = {
    to,
    from: 'no-reply@charityplatform.com',
    subject,
    text,
  };
  return sgMail.send(msg);
};

module.exports = { sendEmail };
