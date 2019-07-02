import React from 'react';
import styled from 'styled-components';
import Counter from './components/Counter';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  incrementCounter = () => {
    const currentCounter = this.state.counter;
    this.setState({
      counter: currentCounter + 1
    });
  };

  render() {
    return (
      <div className="App">
        <Header>
          <HeaderLink>
            Hjem
          </HeaderLink>
          <HeaderLink>
            Redux
          </HeaderLink>
        </Header>
        <ContentContainer>
          <Counter setCounter={this.incrementCounter} counter={this.state.counter}/>
        </ContentContainer>
      </div>
    );
  }
}

export default App;

const Header = styled.header`
  width: 100%;
  background-color: gray;
  display: flex;
  justify-content: center;
`;

const HeaderLink = styled.a`
  padding: 1rem;
  font-size: 24px;
  font-weight: 300;
  text-decoration: none;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;