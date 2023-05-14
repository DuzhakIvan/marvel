import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import {useState, useEffect} from 'react';

import AppBanner from "../appBanner/appBanner";
import useMarvelService from '../../services/MarvelService'; 
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";



const Comic = styled.div`
    display: flex;
    margin-top: 50px;

    div{
        max-width: 550px;
        margin-left: 50px;
        display: flex;
        flex-direction: column;
        row-gap: 25px;
    }

    h4{
        font-weight: 700;
        font-size: 22px;
        line-height: 29px;
    }

    p{
        font-size: 18px;
        line-height: 24px;
    }

    .price{
        color: #9F0013;
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        &:hover {
            color: #9F0013;
        }
    }

    a{
        margin-left: auto;
        font-weight: 700;
        font-size: 18px;
        cursor: pointer;
    }
`;


const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect( () => {
        updateComic();
    }, [comicId]);

     const updateComic = () => {
        clearError();
        getComic(comicId) 
            .then(onComicLoaded)
    };

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    const errorMessage = error ? <ErrorMessage/> : null; 
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ?  <View comic={comic} /> : null;

    console.log(content)
    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pages, thumbnail, language, price} = comic;

    return (
        <Comic>
            <img src={thumbnail} alt={title} />
            <div>
                <h4>{title}</h4>
                <p>{description}</p>
                <p><span>{pages}</span> pages</p>
                <p>Language: <span>{language}</span></p>
                <span className='price'>{price}</span>                                                                                                                                                                                                                                                                       
            </div>
            <Link to='/comics'>Back to all</Link>
        </Comic>
    )
}

export default SingleComicPage;