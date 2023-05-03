import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import styled from 'styled-components';

import Button from "../button/button";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from '../spinner/spinner.js';
import ErrorMessage from '../errorMessage/ErrorMessage';


const Wrapper = styled.div`
    display: flex;
`;

const InfoBlock = styled.div`
    display: flex;
    width: 50%;
    padding: 35px 35px 35px 40px;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);

    img {
        margin-right: 30px;
        width: 180px;
        height: 180px;
        object-fit: 'cover';
    }  
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;

    h2{
        text-transform: uppercase;
        font-size: 29px;
        margin-bottom: 10px;
    }

    p {
        font-size: 14px;
        margin-bottom: 18px;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    width: 232px;
`;

const TryBlock = styled.div`
    width: 50%;
    padding: 35px 35px 35px 40px;
    background-color: #232222;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
    position: relative;

    p{
        color: #FFFFFF;
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 20px;
    }

    img {
        position: absolute;
        bottom: 14px;
        right: -40px;
    }

    button {
        margin-top: 13px;
    }
`;

const RandomChar = () => {

    const [char, setChar] = useState({}); // Пустой обьект персонажа куда запишем пришедшие данные с сервера
    const [loading, setLoading] = useState(true); // Переменная для отслеживания состояния загрузки для спиннера
    const [error, setError] = useState(false); // состояние ошибки

    useEffect(() => {
        updateChar();
    }, []);

    const marvelService = new MarvelService(); // Создаем новый экземпляр ображения к серверу в виде метода

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const updateChar = () => { // Функция получения данных с сервера
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // Получаем случайное id для формирования обьекта персонажа
        onCharLoading(); // Когда обновляется случайный персонаж, перед запросом на сервер

        marvelService
            .getCharacter(id) // Метод получение данных персонажа по id
            .then(onCharLoaded) // Вызываем метод для записи обьекта персонажа с сервера в обьект state
            .catch(onError); 
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <Wrapper>
            {/*loading ? <Spinner/> : <View char={char}/> /* Если состояние загрузки ТРУ загрузится вернет Спиннер, ФОЛС - компонент  View */}

            {errorMessage /* Если не null отобразит компонент */}
            {spinner /* Если не null отобразит компонент */}
            {content /* Если не null отобразит компонент */}
            <TryBlock>
                <p>Random character for today!<br/>
                   Do you want to get to know him better?
                </p>
                <br/>
                <p>Or choose another one</p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt=""/>
            </TryBlock>
        </Wrapper>
    )
}

// Отдельный компонент
const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const style = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : {objectFit: 'cover'};

    return (
        <InfoBlock>
            <img src={thumbnail} alt="Random character" style={{style}} />
            <InfoWrapper>
                <h2>{name}</h2>
                <p>{description}</p>
                <ButtonWrapper>
                    <Button url={homepage} className="button__main" name='homepage'/>
                    <Button url={wiki} className="button__secondary" name='wiki'/>
                </ButtonWrapper>
            </InfoWrapper>
        </InfoBlock>
    )
}

export default RandomChar;