import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import styled from 'styled-components';

import Button from "../button/button";
import mjolnir from "../../resources/img/mjolnir.png";
// import Spinner from '../spinner/spinner.js';
// import ErrorMessage from '../errorMessage/ErrorMessage';
import setContent from '../../utils/setContent';

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
    const {loading, error, getCharacter, clearError, process, setProcess} = useMarvelService(); // Деструтуризируем результат функции сервис

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 30000);

        return () => {
            clearInterval(timerId)
        }
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => { // Функция получения данных с сервера
        clearError(); // Перед каждым запросом сбрасываем ошибку, если она есть, так как она не дает прогружаться контенту

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // Получаем случайное id для формирования обьекта персонажа
        getCharacter(id) // Метод получение данных персонажа по id
            .then(onCharLoaded) // Вызываем метод для записи обьекта персонажа с сервера в обьект state
            .then(() => setProcess('confirmed'))
    }

    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <Wrapper>
            {/* loading ? <Spinner/> : <View char={char}/> /* Если состояние загрузки ТРУ загрузится вернет Спиннер, ФОЛС - компонент  View */}

            {/* {errorMessage /* Если не null отобразит компонент } */}
            {/* {spinner /* Если не null отобразит компонент } */}
            {/* {content /* Если не null отобразит компонент } */}

            {setContent(process, View, char)}
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
const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
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