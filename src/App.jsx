import React from 'react';
import styled from 'styled-components';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header>
          <HeaderLink>
            <Link to="/">
              Hjem
              </Link>
          </HeaderLink>
          <HeaderLink>
            <Link to={"/products"}>
              Redux
              </Link>
          </HeaderLink>
        </Header>
        <Route exact path="/" component={Home}/>
        <Route path="/products" component={Products}/>
      </div>
    </BrowserRouter>
  );
};

export default App;

const Header = styled.header`
  width: 100%;
  background-color: gray;
  display: flex;
  justify-content: center;
`;

const HeaderLink = styled.div`
  padding: 1rem;
  font-size: 24px;
  font-weight: 300;
  text-decoration: none;
  cursor: pointer;
`;
