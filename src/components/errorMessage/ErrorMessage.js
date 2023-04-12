const ErrorMessage = () => {
    // В пути указывается так потому что используем статичные файлы из папки public
    return (
        <img style={{gridColumn: "1/4", display: "block", width: "250px", height: "250px", objectFit: 'contain', margin: " 0 auto", alignSelf: 'center'}}
             src={process.env.PUBLIC_URL + '/error.gif'} 
             alt="Error"/>
    )
}

export default ErrorMessage;