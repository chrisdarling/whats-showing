import { createAction, handleActions } from 'redux-actions';

const initialState = {
    loading: false,
    sortby: 'popularity.desc',
    genre: 'All',
    decade: 'All',
    page: 1,
};

export const loadFindMovies = createAction('LOAD_FIND_MOVIES');
export const fetchedFindMovies = createAction('FETCHED_FIND_MOVIES');

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
    }),
}, initialState);