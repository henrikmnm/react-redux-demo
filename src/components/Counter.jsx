import React from 'react';
import styled from 'styled-components';

const Counter = ({counter, setCounter}) => {
    return (
        <Container>
            <Title>Min teller:</Title>
            <CounterContainer>{counter}</CounterContainer>
            <Button onClick={setCounter}>Klikk meg!</Button>
        </Container>
    );
};

export default Counter;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    margin-top: 5rem;
`;

const Title = styled.h2`
    font-size: 32px;
    color: black;
    padding: 2rem;
`;

const CounterContainer = styled.div`
    display: flex;
    font-size: 24px;
    color: red;
`;

const Button = styled.button`
    background-color: green;
    border: 1px solid black;
    border-radius: 3px;
`;