import React from 'react';
import styled from 'styled-components';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }
    render() {
        return (
            <Container>
                Heeey!
            </Container>
        )
    }

}

export default Home;

const Container = styled.div`
    display: flex;
    width: 100%;
    background-color: cyan;
`;