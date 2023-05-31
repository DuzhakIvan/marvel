import Spinner from "../components/spinner/spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";

// Напишем общую функцию
const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting':
            return <Skeleton/>;
            break;
        case "loading": 
            return <Spinner/>;
            break;
        case 'confirmed':
            return <Component data={data} />;
            break;
        case 'error':
            return <ErrorMessage/>;
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;