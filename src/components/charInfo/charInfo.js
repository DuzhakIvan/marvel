import styled from "styled-components";

import Button from "../button/button";
import abyss from "../../resources/img/abyss.jpg";

const BigWrapper = styled.div`
    padding: 25px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    background-color: #FFF;

    p{
        font-size: 14px;
        margin-bottom: 10px;
    }

    h5{
        font-weight: 700;
        font-size: 18px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    column-gap: 25px;
    margin-bottom: 15px;


    h4 {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 22px;
        margin-bottom: 35px;
    }

    img {
        width: 150px;
        height: 150px;
    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    row-gap: 10px;
    flex-direction: column;
`;

const List = styled.ul`
    display: flex;
    row-gap: 10px;
    flex-direction: column;
    padding: 10px 0 10px;

    li {
        padding: 4px 10px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        font-size: 14px;
    }
`;


const CharInfo = () => {
    return (
        <BigWrapper>
            <Wrapper>
                <img src={abyss} alt="" />
                <div>
                    <h4>loki</h4>
                    <ButtonsWrapper>
                        <Button className="button__main" name='homepage'/>
                        <Button className="button__secondary" name='wiki'/>
                    </ButtonsWrapper>    
                </div>
            </Wrapper>
            <p>In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.</p>
            <h5>Comics:</h5>    
            <List>
                <li>
                    All-Winners Squad: Band of Heroes (2011) #3
                </li>
                <li>
                    Alpha Flight (1983) #50
                </li>
                <li>
                    Amazing Spider-Man (1999) #503
                </li>
                <li>
                    Amazing Spider-Man (1999) #504
                </li>
                <li>
                    AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                </li>
                <li>
                    Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                </li>
                <li>
                    Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                </li>
                <li>
                    Vengeance (2011) #4
                </li>
                <li>
                    Avengers (1963) #1
                </li>
                <li>
                    Avengers (1996) #1
                </li>
            </List>
        </BigWrapper>
    )
}

export default CharInfo;