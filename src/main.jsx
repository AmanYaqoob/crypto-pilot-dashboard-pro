
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Add Google Fonts for typography
const linkElement1 = document.createElement('link');
linkElement1.rel = 'stylesheet';
linkElement1.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
document.head.appendChild(linkElement1);

const linkElement2 = document.createElement('link');
linkElement2.rel = 'stylesheet';
linkElement2.href = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&display=swap';
document.head.appendChild(linkElement2);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
