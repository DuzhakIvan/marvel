import { useState, useEffect, useRef } from "react";
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import "./comicsList.scss";
import useMarvelService from '../../services/MarvelService';


const ComicsList = (props) => {
    const [offset, setOffset] = useState(0);
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        window.addEventListener("scroll",onScroll);
    }, []);

    useEffect(()=> {
        if (newItemLoading && !loading && !charEnded) {
            onRequest(offset, true);
        }

        if(!charEnded) {
            window.addEventListener("scroll",onScroll);
        } 
    }, [newItemLoading])

    const onRequest = (offset, initial) => { // Добавляем дополнительный аргумент initial, чтобы знать первичная ли это загрузка
        initial ? setNewItemLoading(false) : setNewItemLoading(true) // И проверяем первая загрузка? 
        
        getAllComics(offset)
            .then(onComicsListLoaded)
            .finally(() => setNewItemLoading(() => false))
    }

    const onComicsListLoaded = (newComicsList) => {
        setComicsList((comicsList) => [...comicsList, ...newComicsList]);
        setOffset((offset) => offset + 8);
        setCharEnded(newComicsList.length < 8 ? true : false);
    }

    const onScroll = () => {
        if (window.innerHeight + window.pageYOffset + 50 >= document.body.offsetHeight) {
            setNewItemLoading(true);
            window.removeEventListener("scroll",onScroll);
        }
    }

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
                <li className='comics__item' key={i} id={item.id}>
                    <a href="#">
                        <img src={item.thumbnail} style={imgStyle} alt={item.title} />
                        <span className='comics__item__title'>{item.title}</span>
                        <span className="comics__item__price">{item.price}</span>
                    </a>
                </li>
            )
        })

        return <ul className='comics__list'>{items}</ul>
    } 
    console.log('render');

    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading  ? <Spinner /> : null;

    return (
        <div className='comics'>
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ display: charEnded ? "none" : "block" }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;