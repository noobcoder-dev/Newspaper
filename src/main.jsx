// src/main.js (or main.jsx if you're using JSX extension)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure styles are imported correctly
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);
