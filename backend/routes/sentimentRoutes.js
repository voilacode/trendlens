const express = require('express');
const { analyzeSentiment } = require('../controllers/sentimentController');
const router = express.Router();

router.post('/analyze-sentiment', (req, res) => {
  const { content } = req.body;

  try {
    const sentimentScore = analyzeSentiment(content);
    return res.json({ sentiment: sentimentScore });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to analyze sentiment' });
  }
});

module.exports = router;
