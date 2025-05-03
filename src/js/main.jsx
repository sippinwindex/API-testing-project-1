// src/js/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import global styles first
import '../styles/index.css'; // <--- CORRECTED PATH (only one level up)

// Correct import path for Home component
import Home from './components/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home /> {/* Render the imported Home component */}
  </React.StrictMode>
);