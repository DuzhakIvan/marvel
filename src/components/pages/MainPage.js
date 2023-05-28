import { Helmet } from "react-helmet"; // Компонент

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources//img/vision.png";
import RandomChar from "../randomChar/randomChar";
import CharList from "../charList/charList";

const MainPage = () => {

    // прописываем нужные мета теги, которые нам нужны
    // прописываем нужный title
    return (
        <>
            <Helmet>
                <meta name="description" content="Marvel information portal"/> 
                <title>Marvel information</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <ErrorBoundary>
                <CharList/>
            </ErrorBoundary>
            <img className="bg-decoration" src={decoration} alt='vision'/>
        </>
    )
}

export default MainPage;