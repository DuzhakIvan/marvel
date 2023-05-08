import { useHttp } from "../hooks/htttp.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp(); // Вытаскиваем сущности {loading, request, error, clearError} из хука (функции)

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // База адресса запроса (для сохранения принципа dont repeat your self)
    const _apiKey='apikey=b5fd0bed3b38fddcc8ec498949b311c0'; // Наш ключ запроса (для сохранения принципа dont repeat your self)
    const _baseOffset = 210; // Базовая переменная количества загрузки персонажей

    // Формируем методы запросы к API

    const getAllCharacters = async (offset = _baseOffset) => { // Получение данных персонажей, передаем количество нужных персонажей, по умолчанию _baseOfsset
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`); // Используем метод с адрессом на баззу данных всех персонажей
        return res.data.results.map(_transformCharacter); // Переберет каждый элемент из массива и трансформирует и запишет в новый обьект 
    }

    const getCharacter = async (id) => { // Получение одного персонажа по id /v1/public/characters/{characterId}
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`); // Используем метод с адрессом на баззу данных одного персонажа по id
        return _transformCharacter(res.data.results[0]); // Возвращаем уже трансформированный обьект
    }

    // Создаем метод трансформации данных

    const _transformCharacter = (char) => { // в аргумент передадим путь нужным данным в обьекте
        return {
            id: char.id, // Айди важный параметр для работы, передаем потом в качестве пропсов компонентам
            name: char.name, // Чтобы формировать обьект необходимо знать структуру полученных данных
            description: (char.description ? char.description : "No description for this hero("),
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
            comics: char.comics.items            
        }
    }

    // Будем возвращать сущности из этой функции
    return {loading, error, getAllCharacters, getCharacter, clearError}
}

export default useMarvelService;