import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App'; // Устанавливаем новый путь для App.js
import MarvelService from './services/MarvelService'; // Импортируем класс запросов сервера

import './style/style.scss' // Импортируем основные стили

const marvelService = new MarvelService(); // Создаем нового экземпляра класса запроса с сервера

// marvelService.getAllCharacters().then(res=> console.log(res)); // Вызываем метод получения обьекта всех персонажей и с помощью промиса выводим полученные данные в консоль
// marvelService.getCharacter(1011052).then(res=> console.log(res)); // Вызываем метод получения обьекта одного персонажа и с помощью промиса выводим полученные данные в консоль

marvelService.getAllCharacters().then(res=> res.data.results.forEach(item => console.log(item.name)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

