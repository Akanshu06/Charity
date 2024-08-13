const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./backend/config/database');
const bodyParser = require('body-parser');
const cors = require('cors');

// Config
const db = require('./backend/config/database');
const authRoutes = require('./backend/routes/authRoutes');
const charityRoutes = require('./backend/routes/charityRoutes');
const donationRoutes = require('./backend/routes/donationRoutes');
const profileRoutes = require('./backend/routes/profileRoutes');
const adminRoutes = require('./backend/routes/adminRoutes');
const notificationRoutes = require('./backend/routes/notificationRoutes');

// Middleware
app.use(cors());
app.use(cors({
  origin: '*', 
  methods: ['POST', 'GET', 'PUT', 'DELETE']
}));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/charities', charityRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);

// Connect to the database and start the server

sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  });