const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Middlewares
app.use(bodyParser.json());
app.use(methodOverride('_method', {methods: ['PATCH', 'DELETE', 'PUT', 'GET', 'POST']}));


// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Start the server
const PORT = process.env.PORT || 59728;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

