const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const fetchCryptoData = require('./jobs/CryptoJob');
const cron = require('node-cron');

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api', require('./routes/api'));

cron.schedule('0 */2 * * *', fetchCryptoData);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));