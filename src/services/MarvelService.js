class MarvelService {
    // _ - значение свойства которое дает понять что его  не надо изменять
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // База адресса запроса (для сохранения принципа dont repeat your self)
    _apiKey='apikey=b5fd0bed3b38fddcc8ec498949b311c0"'; // Наш ключ запроса (для сохранения принципа dont repeat your self)

    getResource =  async (url) => { // Ассинхронная функция запроса "ресурсов" по заданному url
        let res= await fetch(url); // В res записываем = запрос данных через fetch, ожидаем ответ await

        if (!res.ok) { // Если res.статус не в порядке
            throw new Error(`Could not fetch ${url}, status ${res.status}`); // Выводим сообщение
        }

        return await res.json(); // Преобразуем ответ от сервера в формат json
    }

    // Формируем методы запросы к API

    getAllCharacters = () => { // Получение данных всех персонажей
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`); // Используем метод с адрессом на баззу данных всех персонажей
    }

    getCharacter = (id) => { // Получение одного персонажа по id /v1/public/characters/{characterId}
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`); // Используем метод с адрессом на баззу данных одного персонажа по id
    }
}

export default MarvelService;