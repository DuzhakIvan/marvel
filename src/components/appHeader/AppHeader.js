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
                <a>
                    <MainText>Marvel</MainText> information portal
                </a>
            </Title>
            <Nav>
                <ul>
                    <li><a>Characters</a></li>
                    <Slesh>/</Slesh>
                    <li><a>Comics</a></li>
                </ul>
            </Nav>
        </Header>
    )
}

export default AppHeader;