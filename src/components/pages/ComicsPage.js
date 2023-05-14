import AppBanner from "../appBanner/appBanner";
import ComicsList from "../comicsList/comicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const ComicsPage = () => {

    return (
        <>
            <AppBanner/>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>   
        </>
    )
}

export default ComicsPage;