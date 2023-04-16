import styled from "styled-components";
import { Component } from "react";
import PropTypes from "prop-types";
import './charList.scss';

import MarvelService from '../../services/MarvelService';

import CharInfo from "../charInfo/charInfo";
import CharSearch from "../charSearch/charSearch";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const Wrapper = styled.div`
    margin-top: 44px;
    display: grid;
    grid-template-columns: 650px 425px;
    grid-template-rows: auto auto auto;
    gap: 30px 25px;
    align-items: start;
`;

const List = styled.div`
    display: grid;
    row-gap: 30px;
    column-gap: 25px;
    grid-template-columns: repeat(3, 200px);
`;


const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    grid-row: 1 / -1;
`;

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        selectedChar: null,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest(); // Формируем список персонажей при первом монтировании и последующих вызовах
        window.addEventListener("scroll", this.onScroll); // Ставим обработчик события при каждом монтировании
      }
     
      componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll); // убираем обработчик события при размонтировании (удалении компонента из DOM)
      }
     
      onScroll = () => { // Функция для отпработки события про скроле всей страницы (window)
        if (this.state.newItemLoading) return; // Если состоянии загрузки элемента (идет связь с сервером и добавляются новые элементы) возвращаем работу функции, чтобы не срабатывала много раз
        if (this.state.charEnded) // Если состояние (персонажи закончились) снимается слушатель события
          window.removeEventListener("scroll", this.onScroll); // обработчик события
     
        if (window.innerHeight + window.scrollY + 50 >= document.body.offsetHeight) { // Если высота видимого окна браузера + высота проскроленной страницы + отступ >= всей высоте тела документа
          this.onCharListLoading(); // Запускаем функцию которая переводит компонент в состояние загрузки
          this.onRequest(this.state.offset); // Вызываем функцию обновления запроса списка персонажей
        }
      };


    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);

        
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => { // В функцию передаем новых персонажей (масив)\
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) => ({ // Обновляем state (диструктуризируем charList из state)
            charList: [...charList, ...newCharList], // новое значение charList = старое значение + новые персонажи
            loading: false, // меняем состояние загрузки на false
            newItemLoading: false, // меняем состояние загрузки на false
            offset: offset + 9, // изменяем каждый следущий вызов персонажей на +9
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    itemRefs = []; // Создаем пустой массив для формирования ссылок на ДОМ элементы списка персонажей

    setRef = (ref) => { // Создаем метод создания массива ссылок, передаем в качестве аргумента ссылку ref
        this.itemRefs.push(ref); // пушим ссылку ref, ref создается во время монтирования компонента, поэтому при монтировании нового элемента ref будет перезаписываться, и чтобы сохранить все предыдущие ссылки, мы сохраняем его в массив
    }

    onFocus = (i)=> { // Создаем метод onFocus, аргумент уникальный id элемента(в данном случае индекс в массиве списка персонажей). Метод отвечает за изменение класса и установке фокуса 
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected')); // Перебираем каждый элемент массива ссылок ДОМ и убираем класс
        this.itemRefs[i].classList.add('char__item_selected'); // Добавляем к элементу[индекс] класс
        this.itemRefs[i].focus(); // Устанавливаем фокус на элемент[индекс]
    }

    renderItems(arr) {
            const items =  arr.map((item, i) => {
                let imgStyle = {'objectFit' : 'cover'};
                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    imgStyle = {'objectFit' : 'unset'};
                }
                

                return (
                    <li 
                        className="char__item"
                        key={item.id}
                        onClick={() => {
                            // Запускаем функции передаем айди и индекс массива
                            this.onCharSelected(item.id)
                            this.onFocus(i);
                        }}
                        // Создаем ref ссылку на элемент DOM
                        ref={this.setRef} 
                        // Доьавляем tabIndex чтобы работало переключение по ТАБ
                        tabIndex='0'
                        // Добавляем событие по кнопке, если пробел или ентер
                        onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                // Запускаем функции передаем айди и индекс массива
                                e.preventDefault();
                                this.onCharSelected(item.id);
                                this.onFocus(i);
                            }
                        }}>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                )
            });

        return (
            <List>
                {items}
            </List>
        )
    }



    render () {

        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <Wrapper>
                <ListWrapper>
                    <List>
                        {errorMessage}
                        {spinner}
                        {content}
                    </List>
                    <button 
                        className="button button__main button__long"
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => this.onRequest(offset)}>
                        <div className="inner">load more</div>
                    </button>
                </ListWrapper>
                <ErrorBoundary>
                    <CharInfo charId = {this.state.selectedChar}/>
                </ErrorBoundary>
                <CharSearch/>
            </Wrapper>
        )
    }
}


CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharList;