import { combineReducers } from 'redux';
import MovieReducer from './actions/movies';
import SearchReducer from './actions/search';
import ProfileReducer from './actions/profile';
import FindReducer from './actions/find';

export default combineReducers({
    movies: MovieReducer,
    search: SearchReducer,
    profile: ProfileReducer,
    find: FindReducer,
});
