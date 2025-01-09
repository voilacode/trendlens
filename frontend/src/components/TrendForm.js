// TrendForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TrendForm = () => {
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [likes, setLikes] = useState(null);
  const [comments, setComments] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Fetch trend data from the selected platform
      const trendResponse = await axios.get(`${API_URL}/social-media/fetch-trend-data/${platform}`, {
        params: { keyword },
      });

      // Extract likes, comments, and content for sentiment analysis
      const { likes, comments, content } = trendResponse.data;
      setLikes(likes);
      setComments(comments);

      // Analyze sentiment for the fetched content
      const sentimentResponse = await axios.post(`${API_URL}/sentiment/analyze-sentiment`, { content });
      setSentiment(sentimentResponse.data.sentiment); // Assuming sentiment is returned as an object
    } catch (error) {
      console.error('Error fetching trend data or analyzing sentiment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">TrendLens</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="keyword" className="block text-lg font-medium text-gray-700">Keyword/Hashtag:</label>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            placeholder="e.g., #AI"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="platform" className="block text-lg font-medium text-gray-700">Platform:</label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
          >
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fetch Data
        </button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}

      {!loading && likes !== null && comments !== null && (
        <div className="mt-4">
          <p><strong>Likes:</strong> {likes}</p>
          <p><strong>Comments:</strong> {comments}</p>

          {sentiment && (
            <div className="mt-2">
              <p><strong>Sentiment Score:</strong> {sentiment.score}</p>
              <p><strong>Sentiment:</strong> {sentiment.sentiment}</p>
              <p><strong>Mood:</strong> {sentiment.mood}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendForm;