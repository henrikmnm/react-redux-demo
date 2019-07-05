import React from 'react';
import styled from 'styled-components';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Summary from './components/Summary';
import {REQ} from './utils/requestStatus';
import Products from './components/Products';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedProducts: [],
        availableProducts: {
            products: [],
            status: REQ.INIT
        },
        searchString: ""
      };
    }

    handleSearchInput = (event) => {
      this.setState({
          searchString: event.target.value
      });
  };

  onSearch = () => {
      const {availableProducts} = this.state; 
      availableProducts.status = REQ.PENDING;
      this.setState({
          availableProducts
      });
      window.fetch(`http://localhost:3030/search/${this.state.searchString}`, {
          method: 'GET',
          credentials: 'omit',
          headers: {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json',
          }
      })
      .then(response => response.json())
      .then(data => {
          availableProducts.products = data.data.Search;
          availableProducts.status = REQ.SUCCESS;
          this.setState({
              availableProducts
          });
      })
      .catch(err => {
          availableProducts.status = REQ.ERROR;
          console.log(err);
          this.setState({
              availableProducts
          });
      });
  };

  handleMovieClick = (movie) => {
    const currentSelectedMovies = this.state.selectedProducts;
    if (currentSelectedMovies.indexOf(movie) === -1) {
        currentSelectedMovies.push(movie);
        this.setState({
            selectedProducts: currentSelectedMovies
        });
    }
};

handleSummaryMovieClick = (movieInSummary) => {
    const currentSelectedMovies = this.state.selectedProducts;
    const indexOfSelectedMovie = currentSelectedMovies.indexOf(movieInSummary);
    currentSelectedMovies.splice(indexOfSelectedMovie, 1);
    this.setState({
        selectedProducts: currentSelectedMovies
    });
};


  render() {

    const propsToMoviesComp = {
      selectedProducts: this.state.selectedProducts,
      availableProducts: this.state.availableProducts,
      searchString: this.state.searchString,
      onSearch: this.onSearch,
      handleSearchInput: (event) => this.handleSearchInput(event),
      handleMovieClick: this.handleMovieClick,
      handleSummaryMovieClick: this.handleSummaryMovieClick
    };

    const propsToSummary = {
      selectedProducts: this.state.selectedProducts
    };

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
          <Route exact path="/" render={(routerProps) => <Products {...routerProps} {...propsToMoviesComp}/>}/>
          <Route path="/summary" render={(routerProps) => <Summary {...routerProps} {...propsToSummary}/>}/>
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
