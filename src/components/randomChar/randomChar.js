import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import styled from 'styled-components';

import Button from "../button/button";
import mjolnir from "../../resources/img/mjolnir.png";


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
        object-fit: cover;
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

class RandomChar extends Component {
    constructor(props) { // Создаем конструктор для запуска updateChar сразу при создании обьекта
        super(props);
        this.updateChar(); // вызываем updateChar() сразу при создании обьекта (ЛУЧШЕ ТАК НЕ ДЕЛАТЬ)
    }

    state = { // Формируем обьект с нулевыми значениями, для последующего его изменения, так как нам не надо хранить его предыдущие данные то создаем его вне конструктора
        char: {} // Пустой обьект персонажа куда запишем пришедшие данные с сервера
    }

    marvelService = new MarvelService(); // Создаем новый экземпляр ображения к серверу в виде метода

    onCharLoaded = (char) => {
        this.setState({char}); // В обьект state записываем данные из обьекта char
    }

    updateChar = () => { // Функция получения данных с сервера
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // Получаем случайное id для формирования обьекта персонажа

        this.marvelService
            .getCharacter(id) // Метод получение данных персонажа по id
            .then(this.onCharLoaded); // Вызываем метод для записи обьекта персонажа с сервера в обьект state
    }

  
   render () {

    const {char: {name, description, thumbnail, homepage, wiki}} = this.state;

    return (
        <Wrapper>
            <InfoBlock>
                <img src={thumbnail} alt="Random character" />
                <InfoWrapper>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <ButtonWrapper>
                        <Button url={homepage} className="button__main" name='homepage'/>
                        <Button url={wiki} className="button__secondary" name='wiki'/>
                    </ButtonWrapper>
                </InfoWrapper>
            </InfoBlock>
            <TryBlock>
                <p>Random character for today!<br/>
                   Do you want to get to know him better?
                </p>
                <br/>
                <p>Or choose another one</p>
                <Button className="button__main" name='try it'/>
                <img src={mjolnir} alt=""/>
            </TryBlock>
        </Wrapper>
    )
   }
}

export default RandomChar;