import { Helmet } from 'react-helmet';
import './singleCharacterLayout.scss'
// Здесь формируем струтуру страницы персонажа (Component)
// Мы будем передавать этот компонент в качестве пропсов в SinglePage

const SingleCharacterLayout = ({data}) => { // в качестве props передаем данные с сервера, данные берутся по id из строки браузера
    const {name, description, thumbnail} = data;

    return (
        <div className='single-comic'>
            <Helmet>
                <meta name="description" content={`Character ${name} `}/> 
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className='single-comic__char-img'/>
            <div className='single-comic__info'>
                <h2 className='single-comic__name'>{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterLayout;