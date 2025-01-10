const Crypto = require('../models/Crypto');

exports.getStats = async (req, res) => {
  const { coin } = req.query;

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ createdAt: -1 });
    if (!latestData) return res.status(404).json({ message: 'Coin not found' });

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      change24h: latestData.change24h,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
