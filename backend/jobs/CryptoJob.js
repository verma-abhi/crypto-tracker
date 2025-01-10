const axios = require('axios');
const Crypto = require('../models/Crypto');

const fetchCryptoData = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true'
    );

    const data = response.data;
    const coins = ['bitcoin', 'ethereum', 'matic-network'];
  
    coins.forEach(async (coin) => {
      await Crypto.create({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      });
    });
    
    console.log('Crypto data saved to database');
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};

module.exports = fetchCryptoData;
