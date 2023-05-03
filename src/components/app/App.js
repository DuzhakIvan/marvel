import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../appBanner/appBanner";
import ComicsList from "../comicsList/comicsList";
import RandomChar from "../randomChar/randomChar";
import CharList from "../charList/charList";
import decoration from "../../resources//img/vision.png";
import SingleChar from "../singleChar/singleChar";
import SingleComic from "../singleComic/singleComic";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const App = () => {

    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <ErrorBoundary>
                    <CharList />
                </ErrorBoundary>
            </main>
        </div>
    );
}


export default App;
