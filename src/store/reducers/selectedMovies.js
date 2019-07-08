import { SELECT_MOVIE, DESELECT_MOVIE, RESET_SELECTED_MOVIES } from "../actions";

const initialState = {
    movies: []
}

const selectedMovies = (state = initialState, action) => {
    switch(action.type) {
        case SELECT_MOVIE:
            const stateToAdd = state.movies;
            console.log(state.movies.indexOf(action.data));
            if (state.movies.indexOf(action.data) === -1) {
                stateToAdd.push(action.data);
                return {
                    ...state,
                    movies: stateToAdd
                }    
            } else {
                return state;
            }
        case DESELECT_MOVIE:
            const stateToReduce = state.movies;
            if (stateToReduce.indexOf(action.data) !== -1) {
                stateToReduce.splice(stateToReduce.indexOf(action.data), 1);
                return {
                    ...state,
                    movies: stateToReduce
                }
            } else {
                return state;
            }
        case RESET_SELECTED_MOVIES:
            return {
                ...state,
                movies: []
            }
        default:
            return state;
    }
}

export default selectedMovies;