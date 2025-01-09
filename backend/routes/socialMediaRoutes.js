const express = require('express');
const { fetchTrendData } = require('../controllers/socialMediaController');
const router = express.Router();

router.get('/fetch-trend-data/:platform', async (req, res) => {
  const { platform } = req.params;
  const { keyword } = req.query;

  try {
    const data = await fetchTrendData(platform, keyword);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch trend data' });
  }
});

module.exports = router;
