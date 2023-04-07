import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../appBanner/appBanner";
import ComicsList from "../comicsList/comicsList";
import RandomChar from "../randomChar/randomChar";
import CharList from "../charList/charList";
import decoration from "../../resources//img/vision.png"
import SingleChar from "../singleChar/singleChar";
import SingleComic from "../singleComic/singleComic";


function App() {
  return (
    <div className="app">
        <AppHeader/>
        <main>
          <RandomChar/>
          <CharList/>
        </main>
    </div>
  );
}

export default App;
