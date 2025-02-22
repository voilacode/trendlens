# TrendLens: AI-Powered Social Media Pulse Analyzer  

## 🚀 Introduction  
**TrendLens** is an advanced AI-driven social media analytics platform built with **Node.js, Express, Tailwind CSS, and MySQL**. It allows users to **analyze real-time social media trends**, **perform sentiment analysis**, and **track engagement metrics** across different platforms. The platform also features **role-based access control** to manage user permissions.  

## 🎯 Features  
- **Real-Time Trend Analysis** – Monitor trending topics across multiple social media platforms.  
- **Sentiment Analysis** – Analyze public sentiment with AI-driven insights.  
- **Engagement Metrics** – Track engagement levels, hashtags, and popular content.  
- **Role-Based Access Control** – Different user roles with varying permissions.  
- **Responsive UI** – Built with **Tailwind CSS** for a sleek and adaptive design.  

## 🛠️ Tech Stack  
- **Backend:** Node.js, Express.js  
- **Frontend:** Tailwind CSS, Alpine.js  
- **Database:** MySQL  
- **Authentication & Roles:** Csurf, Express Session  

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  
```sh  
git clone https://github.com/yourusername/trendlens.git  
cd trendlens  
```

### 2️⃣ Setup Database Credentials  
```js  
const mysql = require('mysql2');  

const db = mysql  
  .createPool({  
    host: 'localhost',  
    user: 'username',  
    password: 'password',  
    database: 'databasename',  
  })  
  .promise();  

module.exports = db;  
```

### 3️⃣ Setup Database  
```sql  
-- Create the 'users' table  
CREATE TABLE users (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    username VARCHAR(255) NOT NULL,  
    email VARCHAR(255) NOT NULL UNIQUE,  
    password VARCHAR(255) NOT NULL,  
    role ENUM('user', 'admin') DEFAULT 'user',  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
);

-- Create the 'sentiment_data' table  
CREATE TABLE sentiment_data (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    platform VARCHAR(255) NOT NULL,  
    keyword VARCHAR(255) NOT NULL,  
    sentiment ENUM('positive', 'neutral', 'negative') NOT NULL,  
    sentiment_score DECIMAL(5,2) NOT NULL,  
    content TEXT NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

-- Create the 'social_media_data' table  
CREATE TABLE social_media_data (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    platform VARCHAR(255) NOT NULL,  
    content TEXT NOT NULL,  
    sentiment_score DECIMAL(5,2) NOT NULL,  
    hashtags TEXT,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);  
```

### 4️⃣ Start the Server  
Navigate to the backend folder and run:  
```sh  
node server.js  
```

### 5️⃣ Start the Frontend  
```sh  
npm install  
npm start  
```
