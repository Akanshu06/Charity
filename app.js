require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const charityRoutes = require('./routes/charityRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

app.use(cors({
  origin: '*', 
  methods: ['POST', 'GET', 'PUT', 'DELETE']
}));

app.use(express.json());


app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/auth', authRoutes);
app.use('/charity', charityRoutes);
app.use('/donation', donationRoutes);
app.use('/admin', adminRoutes);
app.use('/profile', profileRoutes);  

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
