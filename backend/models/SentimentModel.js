const db = require('../config/db');  // Importing the db connection

// Function to store sentiment data directly using raw SQL queries
const storeSentimentData = (platform, keyword, sentiment, sentiment_score, content, callback) => {
  const query = `
    INSERT INTO sentiment_data (platform, keyword, sentiment, sentiment_score, content)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.query(query, [platform, keyword, sentiment, sentiment_score, content], (err, result) => {
    if (err) {
      console.error('Error storing sentiment data:', err);
      return callback(err);
    }
    console.log('Sentiment data stored with ID:', result.insertId);
    return callback(null, result.insertId);  // Returning inserted ID
  });
};

module.exports = { storeSentimentData };
