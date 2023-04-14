import styled from "styled-components";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import Button from "../button/button";

const BigWrapper = styled.div`
    padding: 25px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    background-color: #fff;

    p {
        font-size: 14px;
        margin-bottom: 10px;
    }

    h5 {
        font-weight: 700;
        font-size: 18px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    column-gap: 25px;
    margin-bottom: 15px;

    h4 {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 22px;
        margin-bottom: 35px;
    }

    img {
        width: 150px;
        height: 150px;
    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    row-gap: 10px;
    flex-direction: column;
`;

const List = styled.ul`
    display: flex;
    row-gap: 10px;
    flex-direction: column;
    padding: 10px 0 10px;

    li {
        padding: 4px 10px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        font-size: 14px;
    }
`;

class CharInfo extends Component {
    state = {
        // Формируем обьект с нулевыми значениями, для последующего его изменения, так как нам не надо хранить его предыдущие данные то создаем его вне конструктора
        char: null, // Пустой обьект персонажа куда запишем пришедшие данные с сервера
        loading: false, // Переменная для отслеживания состояния загрузки для спиннера
        error: false, // состояние ошибки
    };

    marvelService = new MarvelService(); // Создаем новый экземпляр ображения к серверу в виде метода

    componentDidMount() {
        this.updateChar();
    }

    // Срабатывает когда в компонент приходит новый пропс или state или update
    // 3 аргумента может принимать :предыдущие пропсы, предыдущие стейты
    // Нужно быть осторожныи чтобы не создать бесконечный цыкл
    componentDidUpdate(prevProps) {
        // Условие нужно, чтобы новый передаваемый пропс не равен предыдущему установленному пропсу - для избежания петли и если будет приходить одно и тоже айди
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    // Функция перезаписывания обьекта char, после получения его в аргумент  
    onCharLoaded = (char) => {
        this.setState({
            char, // В обьект state записываем данные из обьекта char
            loading: false, // Меняем значение состояния загрузки персонажей с сервера
        });
    };

    // Метод который устанавливает состояние загрузки для компонента, если true то прогружается spinner
    onCharLoading = () => {
        this.setState({
            loading: true,
        });
    };

    // Метод который устанавливает состояние ошибки для компонента
    onError = () => {
        this.setState({
            loading: false, // Связь с сервером установлена, поэтому меняем состояние loading
            error: true, // но там ошибка, поэтому устанавливаем состояние ошибки
        });
    };

    // Метод обновления обьекта state
    updateChar = () => {
        const { charId } = this.props; // Деструктуризируем переменную id из переданных по атрибутам props. 
        if (!charId) { // если ID undefined, то прерываем выполнение
            return;
        }

        this.onCharLoading(); // Так как мы пытаемся связаться с сервером, меняем состояние на loading, чтобы показать пользователю, что идет попытка связи

        this.marvelService // вызываем метод связи с сервером
            .getCharacter(charId) // запрашиваем данные по ID обьекта
            .then(this.onCharLoaded) // Полученные данные с сервера (promise) передаем в функцию 
            .catch(this.onError); // в случае ошибки вызываем функцию onError и передаем туда данные об ошибке

        // this.foo.bar = 0; // Специально обращаемся к несушествующему свойству для вызова ошибки
    };

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />; // Если обьект создан или состояние загрузки, или ошибки - игнорируем / равно <Sceleton/> компоненту
        const errorMessage = error ? <ErrorMessage/> : null; // если состояние error - равен компоненту <ErrorMessage/> / равен ничему
        const spinner = loading ? <Spinner /> : null; // если состояние загрузки - равен <Spinner/> / равен ничему
        const content = !(loading || error || !char) ? ( // если не (состояние загрузки / ошибка / обьект создан)
            <View char={char} />
        ) : null;

        return (
            <BigWrapper>
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </BigWrapper>
        );
    }
}

// Дополнительный компонент для разделения логики интерфейса и состояния
const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const content =
        comics.length === 0 ? ( // Если массив из комиксов пустой
            <li> Not found any comic about this hero!</li>
        ) : (
            comics
                .map((item, i) => {
                    return <li key={i}>{item.name}</li>;
                })
                .slice(0, 10)
        );

    return (
        <>
            <Wrapper>
                <img src={thumbnail} alt={name} />
                <div>
                    <h4>{name}</h4>
                    <ButtonsWrapper>
                        <Button
                            url={homepage}
                            className="button__main"
                            name="homepage"
                        />
                        <Button
                            url={wiki}
                            className="button__secondary"
                            name="wiki"
                        />
                    </ButtonsWrapper>
                </div>
            </Wrapper>
            <p>{description}</p>
            <h5>Comics:</h5>

            <List>{content}</List>
        </>
    );
};

export default CharInfo;
