import { createAction, handleActions } from 'redux-actions';

const initialState = {
    loading: false,
    sortby: 'popularity.desc',
    genre: 'All',
    decade: 'All',
    page: 1,
    results: [],
};

export const loadFindMovies = createAction('LOAD_FIND_MOVIES');
export const fetchedFindMovies = createAction('FETCHED_FIND_MOVIES');
export const resetFilters = createAction('RESET_FIND_FILTERS');

export default handleActions({
    [loadFindMovies]: (state, { payload }) => ({
        ...state,
        loading: true,
        sortby: payload.sortby || 'popularity.desc',
        genre: payload.genre || 'All',
        decade: payload.decade || 'All',
        page: payload.page || 1,
    }),
    [fetchedFindMovies]: (state, { payload }) => ({
        ...state,
        loading: false,
        ...payload,
        results: state.page === 1 ? [...payload.results] : [...state.results, ...payload.results],
    }),
    [resetFilters]: state => ({
        ...state,
        loading: false,
        sortby: 'popularity.desc',
        genre: 'All',
        decade: 'All',
        page: 1,
        results: [],
    }),
}, initialState);