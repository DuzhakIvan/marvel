import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/spinner";
// import {MainPage, ComicsPage, SingleComicPage} from '../pages'; // Когда указываешь просто папку, webPack пытается найти файл index.js автоматически

const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'))


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            {/* атрибут exact - говорим, что нужно точное сопадение пути
                                атрибут path - ссылка на страницу
                                компонент switch - нужен для переходов
                                компонент Router - где работают Route и Switch
                                компонент Route (BrowserRouter) - разделяет на страницы для переключения */}
                            <Route end path={'/'} element ={<MainPage/>} />
                            <Route end path="/comics" element ={<ComicsPage/>}/>
                            <Route end path="/comics/:id" element = {<SinglePage Component={SingleComicLayout} dataType='comic'/> }/>
                            <Route end path="/characters/:id" element = {<SinglePage Component={SingleCharacterLayout} dataType='characters'/> }/>
                            <Route path="*" element={<Page404/>} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}


export default App;
