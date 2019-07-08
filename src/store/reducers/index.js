import { combineReducers } from 'redux';
import availableMovies from './availableMovies';
import selectedMovies from './selectedMovies';

export default combineReducers({
    availableMovies,
    selectedMovies
});