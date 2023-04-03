import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App'; // Устанавливаем новый путь для App.js
import './style/style.scss' // Импортируем основные стили

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

