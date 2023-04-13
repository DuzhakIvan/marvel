import styled from "styled-components";
import { Component } from "react";
import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import './charList.scss';
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
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
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
            <li 
                className='char__item' 
                key={item.id}
                onClick={() => this.onCharSelected(item.id)}>
                <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                <div className='char__name'>{item.name}</div>
            </li>
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
                <ErrorBoundary>
                    <CharInfo charId = {this.state.selectedChar}/>
                </ErrorBoundary>
                <CharSearch/>
            </Wrapper>
        )
    }
}

export default CharList;