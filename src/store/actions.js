// Action Types
export const FETCH_MOVIES_INIT = Symbol('FETCH_MOVIES_INIT');
export const FETCH_MOVIES_SUCCESS = Symbol('FETCH_MOVIES_SUCCESS');
export const FETCH_MOVIES_ERROR = Symbol('FETCH_MOVIES_ERROR');
export const SELECT_MOVIE = Symbol('SELECT_MOVIE');
export const RESET_SELECTED_MOVIES = Symbol('RESET_SELECTED_MOVIES');
export const DESELECT_MOVIE = Symbol('DESELECT_MOVIE');

// Action creators
export const fetchMovies = (searchString) => {
    console.log(searchString);
    return (dispatch) => {
        if (searchString !== "") {
            dispatch({type: FETCH_MOVIES_INIT});
            window.fetch(`http://localhost:3030/search/${searchString}`, {
              method: 'GET',
              credentials: 'omit',
              headers: {
                  'Access-Control-Allow-Origin':'*',
                  'Content-Type': 'application/json',
              }
          })
          .then(response => response.json())
          .then(data => {
              dispatch({type: FETCH_MOVIES_SUCCESS, data: data.data.Search});
          })
          .catch(err => {
              dispatch({type: FETCH_MOVIES_ERROR});
              console.log(err);
          });    
        }
    }
}

export const selectMovie = (movie) => {
    return (dispatch) => {
        dispatch({type: SELECT_MOVIE, data: movie});
    }
}

export const deselectMovie = (movie) => {
    return (dispatch) => {
        dispatch({type: DESELECT_MOVIE, data: movie});
    }
}

export const resetSelectedMovies = () => {
    return (dispatch) =>    {
        dispatch({type: RESET_SELECTED_MOVIES});
    }
}

