import React from 'react';
import { REQ } from '../utils/requestStatus';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMovies, resetSelectedMovies, selectMovie, deselectMovie } from '../store/actions';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: ""
        };
    }
    
    handleSearchInput = (event) => {
        if (event.target.value !== "") {
            this.setState({
                searchString: event.target.value
            });
        }
    }

    static contextTypes = {
        router: PropTypes.object
    }

    render() {
        const {
            fetchMovies, 
            availableProducts, 
            selectMovie, 
            deselectMovie, 
            selectedProducts
        } = this.props;
        
        console.log(selectedProducts);

        return(
            <Container onKeyPress={(event) => event.charCode === 13 && fetchMovies(this.state.searchString)}>
                <h1>FILMER</h1>
                <TitleAndButtonWrapper>
                    <SearchField type="text" name="movie-search" value={this.state.searchString} onChange={(event) => this.handleSearchInput(event)}/>
                    <SearchButton onClick={() => fetchMovies(this.state.searchString)}>
                        Søk etter filmer
                    </SearchButton>
                </TitleAndButtonWrapper>
                <MoviesContainer>
                    {
                        availableProducts.status === REQ.SUCCESS && 
                        availableProducts.movies.map(movie => 
                        <MovieCard key={movie.imdbID} onClick={() => selectMovie(movie)}>
                            <h2>{movie.Title}</h2>
                            <p>{movie.Year}</p>
                            <MoviePoster url={movie.Poster}/>
                        </MovieCard>)
                    }
                </MoviesContainer>
                <SummaryWrapper>
                    {selectedProducts.movies.map(movie => <MovieCardInSummary key={movie.imdbID} onClick={() => deselectMovie(movie)}>
                        <h3>{movie.Title}</h3>
                        <p>{movie.Year}</p>
                        <MoviePosterInSummary url={movie.Poster}/>
                    </MovieCardInSummary>)}
                </SummaryWrapper>
                <OrderButton onClick={() => this.props.history.push("/summary")}>
                    Bestill
                </OrderButton>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        availableProducts: state.availableMovies,
        selectedProducts: state.selectedMovies
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovies: (searchString) => dispatch(fetchMovies(searchString)),
        selectMovie: (movie) => dispatch(selectMovie(movie)),
        deselectMovie: (movie) => dispatch(deselectMovie(movie)),
        resetSelectedMovies: () => dispatch(resetSelectedMovies())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);

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