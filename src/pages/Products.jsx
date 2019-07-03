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

    render() {
        return(
            <Container>
                <h1>FILMER</h1>
                <SearchField type="text" name="movie-search" value={this.state.searchString} onChange={this.handleSearchInput}/>
                <SearchButton onClick={this.onSearch}>
                    Søk etter filmer
                </SearchButton>
                <MoviesContainer>
                    {
                        this.state.availableProducts.status === REQ.SUCCESS && 
                        this.state.availableProducts.products.map((movie, index) => <MovieCard key={index}>
                            <h2>{movie.Title}</h2>
                            <p>{movie.Year}</p>
                            <MoviePoster src={movie.Poster} alt={`movie poster for ${movie.Title}`}/>
                        </MovieCard>)
                    }
                </MoviesContainer>
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
    font-size: 16px;
`;

const SearchButton = styled.button`
    border: 1px solid green;
    padding: 1rem;
    font-size: 24px;
    margin-top: 4rem;
`;

const MovieCard = styled.div`
    padding: 3rem;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 15%;
    margin: 1rem;
`;

const MoviePoster = styled.img`
    max-width: 300px;
`;