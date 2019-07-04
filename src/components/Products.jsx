import React from 'react';
import { REQ } from '../utils/requestStatus';
import styled from 'styled-components';


class Products extends React.Component {
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
            availableProducts.products = data.data.Search.filter(movie => "movie" === movie.Type);
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
        return(
            <Container onKeyPress={(event) => event.charCode === 13 && this.onSearch()}>
                <h1>FILMER</h1>
                <TitleAndButtonWrapper>
                    <SearchField type="text" name="movie-search" value={this.state.searchString} onChange={this.handleSearchInput}/>
                    <SearchButton onClick={this.onSearch}>
                        Søk etter filmer
                    </SearchButton>
                </TitleAndButtonWrapper>
                <MoviesContainer>
                    {
                        this.state.availableProducts.status === REQ.SUCCESS && 
                        this.state.availableProducts.products.map(movie => 
                        <MovieCard key={movie.imdbID} onClick={() => this.handleMovieClick(movie)}>
                            <h2>{movie.Title}</h2>
                            <p>{movie.Year}</p>
                            <MoviePoster url={movie.Poster}/>
                        </MovieCard>)
                    }
                </MoviesContainer>
                <SummaryWrapper>
                    {this.state.selectedProducts.map(movie => <MovieCardInSummary key={movie.imdbID} onClick={() => this.handleSummaryMovieClick(movie)}>
                        <h3>{movie.Title}</h3>
                        <p>{movie.Year}</p>
                        <MoviePosterInSummary url={movie.Poster}/>
                    </MovieCardInSummary>)}
                </SummaryWrapper>
                <OrderButton onClick={() => this.props.onOrderClick(this.state.selectedProducts)}>
                    Bestill
                </OrderButton>
            </Container>
        )
    }
}

export default Products;

const Container = styled.div`
    width: 100%
    display: flex;
    flex-direction: column;
    align-items: center;
    appear: 1s ease;
`;

const TitleAndButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    > input {
        margin-right: 2rem;
    }
`;

const MoviesContainer = styled.div`
    margin-top: 4rem;
    display: flex;
    align-items: center;
    border: 1px solid white;
    padding: 2rem;
    flex-wrap: wrap;
`;

const SearchField = styled.input`
    border: 1px solid black;
    background-color: #94a0b3;
    color: black;
    padding: 1rem 2rem;
    font-size: 24px;
`;

const SearchButton = styled.button`
    border: 1px solid green;
    padding: 1rem;
    font-size: 24px;
`;

const MovieCard = styled.div`
    padding: 3rem;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 15%;
    max-height: 300px;
    margin: 1rem;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    cursor: pointer;
`;

const MoviePoster = styled.div.attrs(props => ({
    url: props.url
}))`
    background-image: url(${props => props.url});
    background-size: cover;
    width: 150px;
    height: 300px;
    background-position: 50% 50%;
`;

const SummaryWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 30%;
    align-items: center;
    position: absolute;
    top: 90px;
    right: 20px;
    z-index: 1;
    background-color: rgba(0,0,0,1);
`;

const MovieCardInSummary = styled.div`
    padding: 1rem;
    border: 1px solid white;
    font-weight: 300;
    display: flex;
    color: white;
    flex-direction: column;
    align-items: center;
    max-width: 15%;
    max-height: 300px;
    margin: 1rem;
    cursor: pointer;
`;

const MoviePosterInSummary = styled.div.attrs(props => ({
    url: props.url
}))`
    background-image: url(${props => props.url});
    background-size: cover;
    width: 75px;
    height: 150px;
    background-position: 50% 50%;
`;

const OrderButton = styled.button`
    padding: 1rem;
    background-color: yellow;
    color: black;
    font-size: 24px;
    cursor: pointer;
    transition: all .2s ease;
    &:hover {
        background-color: grey;
        color: white;
        transition: all .2s ease;
    }

    margin-bottom: 4rem;
`;