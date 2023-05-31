import {useState, useCallback} from 'react';

// Данный хук позволяет делать запросы и получать нужные данные
export const useHttp = () => { // use - говорит, что это хук. http - обычно называют сущности которые работают с запросами
// вынесем сюда повторяющиеся сущности из CharList

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState('waiting'); // создаем дополнительное состояние для принципа конечного автомата, само состояние импортируем

// так как это связть с сервером тут должен происходить запрос

    const request = useCallback( // Используем callback hook, потому что будем помещать эту функцию внутри приложения и дочерних компонентах. 
                    async (  // Так же из за запросов на сервер будет async
                           url, // url для запроса
                           method = 'GET', // аргумент метод, по умолчанию GET
                           body = null, // body - по умолчинаю null
                           headers = {'Content-Type': 'application/json'} // заголовок по умолчанию
                          ) => { 

                                setLoading(true); // Перед отправкой запроса ставим статус загрузки
                                setProcess('loading'); // Переключаем состояние FMS
                                try { // делаем попытку запроса на сервер
                                    const response = await fetch(url, {method, body, headers}); // создаем переменную, куда записываем ответ от сервера с заданным аргуменами адресса и обьектом настроек

                                    if (!response.ok) { // Проверка на ответ от сервера
                                        throw new Error(`Could not fetch ${url}, status: ${response.status}`); // Если выкинете ошибку, то переместит в блок catch
                                    }

                                    const data = await response.json(); // записываем в переменную ответ от сервера конвертировав его из json
                                    setLoading(false); // Меняем статус загрузки
                                    // setProcess('confirmed'); // Переключаем состояние FMS - из-за ассинхронсти когда (связь с сервером), установку данного состояния необходимо перенести в момент когда данные загружены (charInfo.js), если оставить - будет ошибка
                                    return data; // Функция вернет данные полученные от сервера
                                } catch(e) { // Блок ошибки
                                    setLoading(false); // Статус загрузки завершился (ошибкой)
                                    setError(e.message); // Меняем состояние ошибки и он будет равен не null, а текст ошибки
                                    setProcess('error'); // Переключаем состояние FMS
                                    throw e; // Выкидываем ошибку
                                }                         

    }, []) 

    // Функция чистки от ошибок (сброса)
    const clearError = useCallback(()=> {
        setError(null);
        setProcess('loading'); // Переключаем состояние FMS
    }, []); // Если с сервера прийдет ошибка (например нет нужного обьекта по айди), то эта функция позволит скинуть ошибку

    return {loading, request, error, clearError, process, setProcess}
}