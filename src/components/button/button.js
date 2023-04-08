const Button = (props) => {
    const {name, url} = props;
    return (
        <div>
            <a href={url} className={"button " + props.className}>
                <div className="inner">{name}</div>
            </a>
        </div>
    )
}

export default  Button;