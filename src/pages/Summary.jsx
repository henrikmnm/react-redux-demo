import React from 'react';
import styled from 'styled-components';

class Summary extends React.Component {

    componentDidMount() {
        if (this.props.selectedProducts.length === 0) {
            this.props.history.push("/");
        }
    }

    render() {
        return(
            <Container>
                <h1>Ordreoppsummering</h1>
                <OrderSummary>
                    {this.props.selectedProducts.map(movie => <OrderSummaryLine key={movie.imdbID}>
                        <Title>{movie.Title}</Title>
                        <Year>{movie.Year}</Year>
                    </OrderSummaryLine>)}
                </OrderSummary>
                <BackButton onClick={() => this.props.history.push("/")}>
                    Tilbake
                </BackButton>
            </Container>
        );
    }
}

export default Summary;

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    appear: 1s ease;
`;

const OrderSummary = styled.div`
    padding: 1rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    border: 1px solid black;
    margin: 4rem 0;
`;

const OrderSummaryLine = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const Title = styled.h2`
    font-size: 20px;
    margin-right: 2rem;
`;

const Year = styled.p`
    font-size: 20px;
`;

const BackButton = styled.button`
    padding: 1rem;
    background-color: black;
    color: white;
    transition: all .2s ease;

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    margin-bottom: 4rem;

`;