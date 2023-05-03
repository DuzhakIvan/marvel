import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./charList.scss";

import MarvelService from "../../services/MarvelService";

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

const CharList = (props) => {
    const [selectedChar, setChar] = useState(null);
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [offset, setOffset] = useState(1540);
    const [charEnded, setCharEnded] = useState(false);

    const [listener, setListener] = useState();

    const onCharSelected = (id) => {
        setChar(id);
    };

    const marvelService = new MarvelService();

    useEffect(() => {
        window.addEventListener("scroll",onScroll);
    }, []);

    useEffect(() => { 
        if (!newItemLoading && charEnded) {
            window.removeEventListener('scroll', onScroll);
        }

        if (newItemLoading && !charEnded) {
            onRequest(offset);
        }
    }, [newItemLoading]);

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
            .finally(() => setNewItemLoading(() => false))
    };

    const onCharListLoading = () => {
        setNewItemLoading(() => true)
    };

    const onScroll = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            setNewItemLoading(true);
        }
    }

    const onCharListLoaded = (newCharList) => {
        // В функцию передаем новых персонажей (масив)\
        setCharList((charList) => [...charList, ...newCharList]); // новое значение charList = старое значение + новые персонажи
        setLoading((loading) => false); // меняем состояние загрузки на false
        setOffset((offset) => offset + 9); // изменяем каждый следущий вызов персонажей на +9
        setCharEnded(newCharList.length < 9 ? true : false);
    };

    const onError = () => {
        setError(true);
        setLoading(false);
    };

    const itemRefs = useRef([]); // Создаем пустой массив для формирования ссылок на ДОМ элементы списка персонажей

    const onFocus = (i) => {
        // Создаем метод onFocus, аргумент уникальный id элемента(в данном случае индекс в массиве списка персонажей). Метод отвечает за изменение класса и установке фокуса
        itemRefs.current.forEach((item) =>
            item.classList.remove("char__item_selected")
        ); // Перебираем каждый элемент массива ссылок ДОМ и убираем класс
        itemRefs.current[i].classList.add("char__item_selected"); // Добавляем к элементу[индекс] класс
        itemRefs.current[i].focus(); // Устанавливаем фокус на элемент[индекс]
    };

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { objectFit: "cover" };
            if (
                item.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ) {
                imgStyle = { objectFit: "unset" };
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        // Запускаем функции передаем айди и индекс массива
                        onCharSelected(item.id);
                        onFocus(i);
                    }}
                    // Создаем ref ссылку на элемент DOM
                    ref={(el) => (itemRefs.current[i] = el)}
                    // Доьавляем tabIndex чтобы работало переключение по ТАБ
                    tabIndex="0"
                    // Добавляем событие по кнопке, если пробел или ентер
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            // Запускаем функции передаем айди и индекс массива
                            e.preventDefault();
                            onCharSelected(item.id);
                            onFocus(i);
                        }
                    }}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={imgStyle}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return <List>{items}</List>;
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
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
                    style={{ display: charEnded ? "none" : "block" }}
                    onClick={() => onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </ListWrapper>
            <ErrorBoundary>
                <CharInfo charId={selectedChar} />
            </ErrorBoundary>
            <CharSearch />
        </Wrapper>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharList;
