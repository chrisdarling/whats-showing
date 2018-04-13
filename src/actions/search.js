import { createAction, handleActions } from 'redux-actions';

export const loadSearch = createAction('LOAD_SEARCH');
export const fetchedMovies = createAction('FETCHED_SEARCH_MOVIES');
export const loadMovieSearch = createAction('LOAD_MOVIE_SEARCH');
export const loadPeopleSearch = createAction('LOAD_PEOPLE_SEARCH');
export const fetchedPeople = createAction('FETCHED_SEARCH_PEOPLE');
export const changeType = createAction('CHANGE_TYPE');

const initialState = {
    searchString: "",
    page: 1,
    type: "movies",
    movies: {
        loading: false,
    },
    people: {
        loading: false,
    }
};

export default handleActions({
    [loadMovieSearch]: (state, { payload }) => ({
        ...state,
        searchString: payload.searchString,
        page: payload.page,
        movies: {
            loading: true,
        },
    }),
    [loadPeopleSearch]: (state, { payload }) => ({
        ...state,
        searchString: payload.searchString,
        page: payload.page,
        people: {
            loading: true,
        }
    }),
    [loadSearch]: (state, { payload }) => ({
        ...state,
        searchString: payload.searchString,
        page: payload.page || 1,
        type: payload.type,
        movies: {
            loading: true,
        },
        people: {
            loading: true,
        }
    }),
    [changeType]: (state, { payload }) => ({
        ...state,
        type: payload,
    }),
    [fetchedMovies]: (state, { payload, error }) => ({
        ...state,
        movies: {
            loading: false,
            ...payload,
            error,
        },
    }),
    [fetchedPeople]: (state, { payload, error }) => ({
        ...state,
        people: {
            loading: false,
            ...payload,
            error,
        },
    }),
}, initialState);