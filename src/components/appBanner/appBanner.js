import styled from 'styled-components';

import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';

const Banner = styled.div`
    display: flex;
    background-color: #232222;
    padding: 0 25px 0 45px;
`;

const Text = styled.div`
    color: #FFF;
    font-weight: 700;
    line-height: 28px;
    font-size: 24px;
    margin: 18px 83px;

`;

const Logo = styled.img`
    margin-left: auto;
`;

const AppBanner = () => {
    return (
        <Banner className="app__banner">
                <img src={avengers} alt="" />
                <Text className='app__baner-text'>New comics every week!<br/>
                 Stay tuned!</Text>
                <Logo src={avengersLogo} alt="" />
        </Banner>
    )
}

export default AppBanner;