import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
// испозуем Link из react-router для создания маршрутизации по клику на ссылку для возврата на главную страницу

import './singleComicLayout.scss'

// Здесь формируем струтуру страницы персонажа (Component)
// Мы будем передавать этот компонент в качестве пропсов в SinglePage

const SingleComicLayout = ({data}) => {// в качестве props передаем данные с сервера, данные берутся по id из строки браузера
    const {title, description, pageCount, thumbnail, language, price} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta name="description" content={`${title} comics book`}/> 
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicLayout;