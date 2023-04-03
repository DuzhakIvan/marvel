import styled from 'styled-components';
import ComicsListItem from "../comicsListItem/comicsListItem"
import Button from '../button/button';

const Wrapper = styled.div`
    margin-top: 45px;
`;

const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, 225px);
    justify-content: space-between;
    row-gap: 55px;
` ;

const ComicsList = () => {
    return (
        <Wrapper>
            <List>
                <ComicsListItem/>
                <ComicsListItem/>
                <ComicsListItem/>
                <ComicsListItem/>
                <ComicsListItem/>
                <ComicsListItem/>
                <ComicsListItem/>
                <ComicsListItem/>
            </List>
            <Button/>
        </Wrapper>
    )
}

export default ComicsList;