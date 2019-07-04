import React from 'react';
import styled from 'styled-components';
import Products from '../components/Products';
import Summary from '../components/Summary';

class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderClicked: false,
            orderedMovies: []
        };
    }

    onMovies

    render() {
        if (this.state.orderClicked) {
            return (
                <Summary movies={this.state.orderedMovies} onBack={() => this.setState({orderClicked: false})}/>
            );
        }

        return (
            <Container>
                <Products onOrderClick={(movies) => this.setState({orderClicked: true, orderedMovies: movies})}/>
            </Container>
        );
    }
}

export default Movies;

const Container = styled.div`
    width: 100%;
`;