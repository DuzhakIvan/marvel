import styled from 'styled-components';
import Button from "../button/button";
import thor from "../../resources/img/thor.jpg";
import mjolnir from "../../resources/img/mjolnir.png";

const Wrapper = styled.div`
    display: flex;
`;

const InfoBlock = styled.div`
    display: flex;
    width: 50%;
    padding: 35px 35px 35px 40px;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);

    img {
        margin-right: 30px;
        width: 180px;
        height: 180px;
        object-fit: cover;
    }  
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;

    h2{
        text-transform: uppercase;
        font-size: 29px;
        margin-bottom: 10px;
    }

    p {
        font-size: 14px;
        margin-bottom: 18px;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TryBlock = styled.div`
    width: 50%;
    padding: 35px 35px 35px 40px;
    background-color: #232222;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
    position: relative;

    p{
        color: #FFFFFF;
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 20px;
    }

    img {
        position: absolute;
        bottom: 14px;
        right: -40px;
    }

    button {
        margin-top: 13px;
    }
`;

const RandomChar = () => {
    return (
        <Wrapper>
            <InfoBlock>
                <img src={thor} alt="" />
                <InfoWrapper>
                    <h2>thor</h2>
                    <p>As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</p>
                    <ButtonWrapper>
                        <Button className="button__main" name='homepage'/>
                        <Button className="button__secondary" name='wiki'/>
                    </ButtonWrapper>
                </InfoWrapper>
            </InfoBlock>
            <TryBlock>
                <p>Random character for today!<br/>
                   Do you want to get to know him better?
                </p>
                <br/>
                <p>Or choose another one</p>
                <Button className="button__main" name='try it'/>
                <img src={mjolnir} alt=""/>
            </TryBlock>
        </Wrapper>
    )
}

export default RandomChar;