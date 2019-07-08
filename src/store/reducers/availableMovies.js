import { FETCH_MOVIES_INIT, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_ERROR } from "../actions";
import { REQ } from "../../utils/requestStatus";

const initialState = {
    movies: [],
    status: REQ.INIT
};

const avaiableMovies = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MOVIES_INIT:
            return {
                ...state,
                status: REQ.PENDING
            }
        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.data,
                status: REQ.SUCCESS
            }
        case FETCH_MOVIES_ERROR:
            return {
                ...state,
                movies: [],
                status: REQ.ERROR
            }
        default:
            return state;
    }
}

export default avaiableMovies;