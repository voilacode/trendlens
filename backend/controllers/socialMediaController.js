const axios = require('axios');
const { analyzeSentiment } = require('./sentimentController'); // Import sentiment function

const fetchTrendData = async (platform, keyword) => {
  try {
    let trendData = {};

    if (platform === 'facebook') {
      // Fetch data from Facebook
      const response = await axios.get(
        'https://facebook-data-api2.p.rapidapi.com/graph/1606813996832361',
        {
          headers: {
            'x-rapidapi-host': 'facebook-data-api2.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Ensure RAPIDAPI_KEY is set
          },
        }
      );

      // Log the entire response to the terminal
      console.log('Raw API Response:', response.data);

      // Extract data
      const content = response.data?.message || 'No content available';
      const likes = response.data?.likes?.data?.length || 0; // Count the number of likes
      const comments = response.data?.comments?.data?.length || 0; // Count the number of comments

      // Sentiment analysis on the content
      const sentimentAnalysis = analyzeSentiment(content);

      trendData = {
        likes,
        comments,
        content,
        sentiment: sentimentAnalysis,
      };
    } else if (platform === 'instagram') {
      // Fetch data from Instagram
      const response = await axios.get(
        'https://instagram-scraper-api2.p.rapidapi.com/v1/highlight_info',
        {
          params: { highlight_id: '17907964880010937' },
          headers: {
            'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          },
        }
      );

      // Log the entire response to the terminal
      console.log('Raw API Response:', response.data);

      // Extract content from items (assuming the items contain post information)
      const items = response.data?.data?.items || [];
      let content = 'No caption available';
      let likes = 0;
      let comments = 0;

      // Check if items exist and extract the first item's data
      if (items.length > 0) {
        const firstItem = items[0]; // Assuming you want to analyze the first item
        content = firstItem?.caption || 'No caption available';
        likes = firstItem?.likes || 0;
        comments = firstItem?.comments || 0;
      }

      // Sentiment analysis on the content
      const sentimentAnalysis = analyzeSentiment(content);

      trendData = {
        likes,
        comments,
        content,
        sentiment: sentimentAnalysis,
      };
    } else if (platform === 'twitter') {
      // Fetch data from Twitter
      const response = await axios.get(
        'https://twitter-v23.p.rapidapi.com/v2/UserByScreenName/?username=elonmusk',
        {
          headers: {
            'x-rapidapi-host': 'twitter-v23.p.rapidapi.com',
            'x-rapidapi-key': 'd687a622damsh5e44c035209a582p1e5f6ejsn6e51308083e1', // Ensure correct API key
          },
        }
      );

      // Log the entire response to the terminal
      console.log('Raw API Response:', response.data);

      // Extract the tweet content from the response
      const tweets = response.data?.data?.user?.tweets || [];
      let content = 'No tweet available';
      let likes = 0;
      let comments = 0;

      if (tweets.length > 0) {
        const firstTweet = tweets[0]; // Assuming you want to analyze the first tweet
        content = firstTweet?.text || 'No tweet available';
        likes = firstTweet?.likeCount || 0;
        comments = firstTweet?.replyCount || 0;
      }

      // Sentiment analysis on the tweet content
      const sentimentAnalysis = analyzeSentiment(content);

      trendData = {
        likes,
        comments,
        content,
        sentiment: sentimentAnalysis,
      };
    } else {
      throw new Error('Platform not supported');
    }

    // Print the trend data in the terminal
    console.log('Processed Trend Data:', trendData);

    return trendData;
  } catch (error) {
    console.error('Error fetching trend data:', error.message);
    throw error;
  }
};

module.exports = { fetchTrendData };
