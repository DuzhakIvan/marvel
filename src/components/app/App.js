import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage} from '../pages'; // Когда указываешь просто папку, webPack пытается найти файл index.js автоматически
import SingleChar from "../singleChar/singleChar";
import SingleComic from "../singleComic/singleComic";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        {/* атрибут exact - говорим, что нужно точное сопадение пути
                            атрибут path - ссылка на страницу
                            компонент switch - нужен для переходов
                            компонент Router - где работают Route и Switch
                            компонент Route (BrowserRouter) - разделяет на страницы для переключения */}
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                           <ComicsPage/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}


export default App;
