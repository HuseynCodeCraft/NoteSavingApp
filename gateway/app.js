const express = require('express');
const bodyParser = require('body-parser');
const validMiddleware = require('./middlewares/validMiddleware.js');
const apiConfig = require('./apiConfig.js');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validMiddleware);

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/', authRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
  return res.json({ Project: 'https://github.dev/HuseynCodeCraft/NoteSavingApp' })
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${apiConfig.config.PORT || PORT}`);
});
