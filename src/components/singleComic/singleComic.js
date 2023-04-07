import styled from "styled-components";

import ComicImg from '../../resources/img/x-men.png'

const Comic = styled.div`
    display: flex;
    margin-top: 50px;

    div{
        max-width: 550px;
        margin-left: 50px;
        display: flex;
        flex-direction: column;
        row-gap: 25px;
    }

    h4{
        font-weight: 700;
        font-size: 22px;
        line-height: 29px;
    }

    p{
        font-size: 18px;
        line-height: 24px;
    }

    .price{
        color: #9F0013;
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        &:hover {
            color: #9F0013;
        }
    }

    a{
        margin-left: auto;
        font-weight: 700;
        font-size: 18px;
        cursor: pointer;
    }
`;


const SingleComic = () => {
    return (
        <Comic>
            <img src={ComicImg} alt="" />
            <div>
                <h4>X-Men: Days of Future Past</h4>
                <p>Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                <p><span>144</span> pages</p>
                <p>Language: <span>en-us</span></p>
                <span className='price'>9.99$</span>                                                                                                                                                                                                                                                                       
            </div>
            <a>Back to all</a>
        </Comic>
    )
}

export default SingleComic;