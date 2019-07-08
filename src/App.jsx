import React from 'react';
import styled from 'styled-components';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Summary from './pages/Summary';
import Products from './pages/Products';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header>
            <HeaderLink>
              <Link to="/">
                Hjem
                </Link>
            </HeaderLink>
          </Header>
          <Route exact path="/" component={Products}/>
          <Route path="/summary" component={Summary}/>
        </div>
      </BrowserRouter>
    );
  }
  
};

export default App;

const Header = styled.header`
  width: 100%;
  background-color: gray;
  display: flex;
  justify-content: center;
  height: 80px;
`;

const HeaderLink = styled.div`
  padding: 1rem;
  font-size: 24px;
  font-weight: 300;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  > a {
    text-decoration: none;
    color: black;

    &:hover {
        text-decoration: underline;
        color: white;
    }
  }
`;
