const axios = require('axios');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// Function to analyze sentiment and return score, sentiment, and mood
const analyzeSentiment = (content) => {
  try {
    const result = sentiment.analyze(content); // Analyzing sentiment for the content
    const score = result.score;

    let sentimentType = 'neutral';
    if (score > 0) {
      sentimentType = 'positive';
    } else if (score < 0) {
      sentimentType = 'negative';
    }

    let mood = 'neutral';
    if (score > 2) {
      mood = 'happy';
    } else if (score < -2) {
      mood = 'sad';
    }

    return {
      score: score,
      sentiment: sentimentType,
      mood: mood,
    };
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};

module.exports = { analyzeSentiment };
