import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';  // Import Bar and Pie charts
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the required components of Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const TrendDisplay = () => {
  const location = useLocation();
  const { likes, comments, sentiment } = location.state || {};

  // Prepare data for the Bar chart (Sentiment score)
  const barChartData = {
    labels: ['Sentiment Score'],
    datasets: [
      {
        label: 'Sentiment Score',
        data: [sentiment ? sentiment.score : 0],
        backgroundColor: sentiment && sentiment.score > 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)',
        borderColor: sentiment && sentiment.score > 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the Pie chart (Mood distribution)
  const pieChartData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Mood Distribution',
        data: [
          sentiment?.mood === 'positive' ? 100 : 0,
          sentiment?.mood === 'negative' ? 100 : 0,
          sentiment?.mood === 'neutral' ? 100 : 0,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sentiment Results</h2>
      
      {likes !== undefined && comments !== undefined && sentiment ? (
        <div>
          <p><strong>Likes:</strong> {likes}</p>
          <p><strong>Comments:</strong> {comments}</p>

          <div className="mt-4">
            <p><strong>Sentiment Score:</strong> {sentiment.score}</p>
            <p><strong>Sentiment:</strong> {sentiment.sentiment}</p>
            <p><strong>Mood:</strong> {sentiment.mood}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Sentiment Score Chart</h3>
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Mood Distribution</h3>
            <Pie data={pieChartData} options={{ responsive: true }} />
          </div>
        </div>
      ) : (
        <p>No sentiment data available.</p>
      )}
    </div>
  );
};

export default TrendDisplay;
