import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources//img/vision.png";
import RandomChar from "../randomChar/randomChar";
import CharList from "../charList/charList";

const MainPage = () => {

    return (
        <>
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