const Button = (props) => {
    const {name} = props;
    return (
        <div>
            <a href="#" className={"button " + props.className}>
                <div className="inner">{name}</div>
            </a>
        </div>
    )
}

export default  Button;