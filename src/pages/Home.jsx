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
                <img src={require('../assets/luna.jpg')}/>
            </Container>
        )
    }

}

export default Home;

const Container = styled.div`
    display: flex;
    width: 100%;
`;

const Image = styled.div`
    background-image: url(../../public/luna.jpg);
    background-position: 50% 50%;
    background-size: cover;
    height: 500px;
`;