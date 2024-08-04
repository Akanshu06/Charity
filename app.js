const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const charityRoutes = require('./routes/charityRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const { sequelize } = require('./models');

app.use(cors());

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/charities', charityRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);

const startServer = async () => {
  try {
    await sequelize.sync({ force: true }); // Use { force: false } in production
    app.listen(process.env.PORT || 3000, () => console.log('Server running on port 3000'));
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

startServer();
