import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../appBanner/appBanner";
import ComicsList from "../comicsList/comicsList";

function App() {
  return (
    <div className="app">
      <AppHeader/>
      <AppBanner/>
      <ComicsList/>
    </div>
  );
}

export default App;
