import styled from "styled-components";

import thor from '../../resources/img/thor.jpg'

const Char = styled.div`
    margin-top: 50px;
    display: flex;
    
    img{
        width: 293px;
        height: 293px;
    }

    div{
        margin-left: 50px;
        max-width: 550px;
    }

    h3{
        text-transform: uppercase;
        font-weight: 700;
        font-size: 22px;
        margin-bottom: 25px;
    }

    p{
        font-size: 18px;
        line-height: 21px;
    }

`;

const SingleChar = () => {
    return (
        <Char>
            <img src={thor} alt="" />
            <div>
                <h3>loki</h3>
                <p>In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.</p>
            </div>
        </Char>
    )
}

export default SingleChar;