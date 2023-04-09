const ErrorMessage = () => {
    // В пути указывается так потому что используем статичные файлы из папки public
    return (
        <img style={{display: "block", width: "250px", height: "250px", objectFit: 'contain', margin: " 0 auto"}}
             src={process.env.PUBLIC_URL + '/error.gif'} 
             alt="Error"/>
    )
}

export default ErrorMessage;