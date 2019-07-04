import React from 'react';
import styled from 'styled-components';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header>
            <HeaderLink>
              <Link to="/">
                Filmer
                </Link>
            </HeaderLink>
            <HeaderLink>
              <Link to={"/movies"}>
                Filmer
                </Link>
            </HeaderLink>
          </Header>
          <Route exact path="/" component={Movies}/>
          <Route path="/movies" component={Movies}/>
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
