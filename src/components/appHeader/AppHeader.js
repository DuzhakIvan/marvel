import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';

const Header = styled.header`
    display: flex;
    justify-content: space-between;
`;

const MainText = styled.span`
    color: #9F0013;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    line-height: 37px;
`;

const Nav = styled.nav`
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;

    ul {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    a {
        font-size: 28px;
    }

    a:hover {
        color: #9F0013;
    }
`;

const Slesh = styled.li`
    margin: 0 8px 0 8px;
`;


const AppHeader = () => {
    return (
        <Header>
            <Title>
                <Link to='/'>
                    <MainText>Marvel</MainText> information portal
                </Link>
            </Title>
            <Nav>
                <ul>
                    {/* компонент Link - типа <a>
                        компонент NavLink - дополнительные атрибуты
                        атрибут to - типа href 
                        exact/end - точное совпадение по ссылкам to
                        activeStyle/  ({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})} - если есть совпадение по to 
                        */}
                    <li><NavLink end style={ ({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})}  to='/'>Characters</NavLink></li>
                    <Slesh>/</Slesh>
                    <li><NavLink style={ ({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})} to='/comics'>Comics</NavLink></li>
                </ul>
            </Nav>
        </Header>
    )
}

export default AppHeader;