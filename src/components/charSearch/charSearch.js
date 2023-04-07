import styled from "styled-components";
import Button from "../button/button";

const Form = styled.form`
    background-color: #FFF;
    display: block;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    padding: 25px 25px 0;

    label{
        font-weight: 700;
        font-size: 18px;
    }

    input{
        width: 250px;
        height: 38px;
        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border: none;
        padding: 10px;
    }

    .search__error{
        font-size: 18px;
        color: #9F0013;
        font-weight: 700;
        display: ${props => props.status=='error' ? "block" : "none"};
        margin-bottom: 25px;
    }

    .search__sucсess{
        display: ${props =>props.status=='success' ? "flex" : "none"};
        justify-content: space-between;
        margin-bottom: 25px;
        align-items: center;

        p{
            color: #03710E;
            font-size: 18px;
            font-weight: 700;
        }
    }

    .search__empty{
        display: ${props => props.status=='empty' ? "flex" : "none"};
        font-size: 18px;
        color: #9F0013;
        font-weight: 700;
        margin-bottom: 25px;
    }
`;

const InputWrapper = styled.div`
    margin: 15px 0 25px;
    display: flex;
    justify-content: space-between;
`;

const CharSearch = () => {
    return (
        <Form status="empty">
            <label>Or find a character by name:</label>
            <InputWrapper>
                <input type="text" placeholder="Enter name" />
                <Button className='button__main' name='find'/>
            </InputWrapper>
            <p className='search__error'>The character was not found. Check the name and try again</p>
            <div className='search__sucсess'>
                <p>There is! Visit $name page?</p>
                <Button className='button__secondary' name='to page'/>
            </div>
            <p className='search__empty'>This field is required</p>
        </Form>
    )
}

export default CharSearch;