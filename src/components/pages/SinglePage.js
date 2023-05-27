import { useParams } from 'react-router-dom';
// Хук useParams возвращает объект пар ключ/значение динамических параметров из текущего URL-адреса, которые были сопоставлены <Route path>. 
// Дочерние маршруты наследуют все параметры родительских маршрутов.
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/appBanner';

// Компонент SinglePage через props передается Component - компонент с версткой (SingleCharacterLayout или SingleComicLayout) и тип dataType (comics или characters)
// dataType нам нужен для определения какой id передается комиксов или персонажей 
const SinglePage = ({Component, dataType}) => { 
    const {id} = useParams(); //Хук useParams возвращает объект пар ключ/значение динамических параметров из текущего URL-адреса - в нашем случае id
    const [data, setData] = useState(null); // Создаем состояние с данными с сервера, изначально null
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService(); // Дуструтуризируем состояния и функции из VarvelService

    useEffect(() => { // При каждом изменении значения URL адресса обновляем состояние data
        updateData()
    }, [id])

    const updateData = () => { // функция обновления data
        clearError(); // сбрасываем ошибку связи с сервером

        switch (dataType) { // В зависимости от dataType делаем запрос id по комиксам или персонажам 
            case 'comic': 
                getComic(id).then(onDataLoaded); // записываем comics data из сервера в состояние data
                break;
            case 'characters':
                getCharacter(id).then(onDataLoaded); // записываем comics data из сервера в состояние data
        }
    }

    const onDataLoaded = (data) => { // функция записи data в состояние data
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage/> : null; // errorMessage равно если есть состояние ошибки, то компонент ErrorMessage, нет ошибки - ничего
    const spinner = loading ? <Spinner/> : null; // spinner равен если есть состояние загрузки, то компонент Spinner, нет загрузки - ничего
    const content = !(loading || error || !data) ? <Component data={data}/> : null; // Контент равен если не стостояние загрузки или состояние ошибки и (не не) есть дата, то равен Компоненту с пропсом дата, нет - ничего

    // Функциональный компонент возвращает данную структуру
    return ( 
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;