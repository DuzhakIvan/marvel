import styled from 'styled-components';
import comicsImg from '../../resources/img/x-men.png'

const Item = styled.div`
    transition: 0.3s transform;

    &:hover {
        transform: translateY(-5px);
    }
`

const Link = styled.a`
    transition: 0.3s transform;
`;

const Img = styled.img`
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
    width: 225px;
    height: 345px;
`;

const Name = styled.h2`
    margin-top: 10px;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
`;

const Price = styled.span`
    margin-top: 5px;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;  
`;

const ComicsListItem = () => {
    return (
        <Item>
            <Link href="#">
                <Img src={comicsImg} alt="" />
                <Name>comics name</Name>
                <Price className="comics-price">price</Price>
            </Link>
        </Item>
    )
}

export default ComicsListItem;