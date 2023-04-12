import styled from "styled-components";
import { Component } from "react";
import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import abyss from "../../resources/img/abyss.jpg";
import CharInfo from "../charInfo/charInfo";
import CharSearch from "../charSearch/charSearch";
import Button from "../button/button";

const Wrapper = styled.div`
    margin-top: 44px;
    display: grid;
    grid-template-columns: 650px 425px;
    grid-template-rows: auto auto auto;
    gap: 30px 25px;
    align-items: start;
`;

const List = styled.div`
    display: grid;
    row-gap: 30px;
    column-gap: 25px;
    grid-template-columns: repeat(3, 200px);
`;

const Item = styled.li`
    width: 200px;
    height: 318px;
    background-color: #232222;
    box-shadow: ${props => props.active ? '0 5px 20px #9F0013' : '5px 5px 10px rgba(0, 0, 0, .25)'};
    transform: ${props =>  props.active ? "translateY(-8px)" : 'translateY(0px)'};

    img{
        width: 200px;
        height: 200px;
        object-fit: cover;
    }

    div{
        padding: 15px;
        color: #FFF;
        font-size: 22px;
        font-weight: 700;
    }
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    grid-row: 1 / -1;
`;

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);

        
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    renderItems(arr) {
        const items = arr.map((item => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};  
        }

        return (
            <Item>
                <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                <div>{item.name}</div>
            </Item>
        )

        }));

        return (
            <List>
                {items}
            </List>
        )
    }



    render () {

        const {charList, loading, error} = this.state;
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <Wrapper>
                <ListWrapper>
                    <List>
                        {errorMessage}
                        {spinner}
                        {content}
                    </List>
                    <Button className='button__main' name="load more"/>
                </ListWrapper>
                <CharInfo/>
                <CharSearch/>
            </Wrapper>
        )
    }
}

export default CharList;