import React, { useState, useEffect } from 'react';

const SentimentDisplay = ({ content }) => {
  const [sentimentData, setSentimentData] = useState(null);

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const response = await fetch('/api/sentiment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),  // Send content as JSON
        });
  
        const result = await response.json();
        console.log('Received Sentiment Data:', result);  // Log result for debugging
  
        setSentimentData(result);  // Set state with the returned sentiment data
      } catch (error) {
        console.error('Error fetching sentiment:', error);
      }
    };
  
    if (content) {
      fetchSentiment();  // Fetch sentiment when content changes
    }
  }, [content]);
  
  // Rendering sentiment data in JSX
  return (
    <div className="sentiment-result">
      {sentimentData ? (
        <div>
          <h3>Sentiment Analysis</h3>
          <p>Sentiment: {sentimentData.sentiment}</p>
          <p>Score: {sentimentData.score}</p>
        </div>
      ) : (
        <p>Analyzing sentiment...</p>
      )}
    </div>
  );
  

  // Check if sentiment data is available
  if (!sentimentData) return <div>Loading...</div>;

  // Destructure sentimentData to get sentiment and score
  const { sentiment, score } = sentimentData;

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Sentiment Analysis</h3>
      
      {/* Display Sentiment */}
      <p className="text-lg font-medium mb-2">
        <strong>Sentiment:</strong>
        <span
          className={`font-bold ${
            sentiment === 'positive'
              ? 'text-green-500'
              : sentiment === 'negative'
              ? 'text-red-500'
              : sentiment === 'neutral'
              ? 'text-gray-500'
              : sentiment === 'sad'
              ? 'text-blue-500'
              : sentiment === 'happy'
              ? 'text-yellow-500'
              : ''
          }`}
        >
          {sentiment}
        </span>
      </p>

      {/* Display Sentiment Score */}
      <p className="text-lg mb-2">
        <strong>Sentiment Score:</strong> {score}
      </p>
    </div>
  );
};

export default SentimentDisplay;
