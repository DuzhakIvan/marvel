class MarvelService {
    // _ - значение свойства которое дает понять что его  не надо изменять
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // База адресса запроса (для сохранения принципа dont repeat your self)
    _apiKey='apikey=b5fd0bed3b38fddcc8ec498949b311c0'; // Наш ключ запроса (для сохранения принципа dont repeat your self)

    getResource =  async (url) => { // Ассинхронная функция запроса "ресурсов" по заданному url
        let res= await fetch(url); // В res записываем = запрос данных через fetch, ожидаем ответ await

        if (!res.ok) { // Если res.статус не в порядке
            throw new Error(`Could not fetch ${url}, status ${res.status}`); // Выводим сообщение
        }

        return await res.json(); // Преобразуем ответ от сервера в формат json
    }

    // Формируем методы запросы к API

    getAllCharacters = async () => { // Получение данных всех персонажей
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`); // Используем метод с адрессом на баззу данных всех персонажей
        return res.data.results.map(this._transformCharacter); // Переберет каждый элемент из массива и трансформирует и запишет в новый обьект 
    }

    getCharacter = async (id) => { // Получение одного персонажа по id /v1/public/characters/{characterId}
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`); // Используем метод с адрессом на баззу данных одного персонажа по id
        return this._transformCharacter(res.data.results[0]); // Возвращаем уже трансформированный обьект
    }

    // Создаем метод трансформации данных

    _transformCharacter = (char) => { // в аргумент передадим путь нужным данным в обьекте
        return {
            name: char.name, // Чтобы формировать обьект необходимо знать структуру полученных данных
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension, // картинка =  url + расширение
            /* Пример кгде хранится url
            "urls": [
                        {
                            "type": "detail",
                            "url": "http://marvel.com/characters/384/captain_flint?utm_campaign=apiRef&utm_source=b5fd0bed3b38fddcc8ec498949b311c0"
                        },
                        {
                            "type": "comiclink",
                            "url": "http://marvel.com/comics/characters/1011196/captain_flint?utm_campaign=apiRef&utm_source=b5fd0bed3b38fddcc8ec498949b311c0"
                        }
            */
            homepage: char.urls[0].url, // ссылка 
            wiki: char.urls[1].url, // ссылка
        }
    }
}

export default MarvelService;