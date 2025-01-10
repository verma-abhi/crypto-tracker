const Crypto = require('../models/Crypto');

exports.getDeviation = async (req, res) => {
  const { coin } = req.query;

  try {
    const prices = await Crypto.find({ coin })
      .sort({ createdAt: -1 })
      .limit(100)
      .select('price -_id');

    if (prices.length === 0) return res.status(404).json({ message: 'No data found' });

    const priceArray = prices.map((p) => p.price);
    const mean = priceArray.reduce((a, b) => a + b, 0) / priceArray.length;

    const variance =
      priceArray.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / priceArray.length;

    const stdDeviation = Math.sqrt(variance);

    res.json({ deviation: stdDeviation.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
