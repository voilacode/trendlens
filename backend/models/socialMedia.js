const db = require('../config/db');

const storeSocialMediaData = async (platform, content, sentimentScore, hashtags) => {
  try {
    const [result] = await db.execute(
      `INSERT INTO social_media_data (platform, content, sentiment_score, hashtags) VALUES (?, ?, ?, ?)`,
      [platform, content, sentimentScore, hashtags]
    );
    return result;
  } catch (err) {
    console.error('Error storing social media data:', err);
    throw err;
  }
};

module.exports = {
  storeSocialMediaData
};
