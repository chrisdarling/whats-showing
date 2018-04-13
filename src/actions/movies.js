import { createAction, handleActions } from 'redux-actions';

export const fetchingPopularMovies = createAction('FETCHING_POPULAR_MOVIES');
export const fetchedPopularMovies = createAction('FETCHED_POPULAR_MOVIES');

export const fetchingShowingMovies = createAction('FETCHING_SHOWING_MOVIES');
export const fetchedShowingMovies = createAction('FETCHED_SHOWING_MOVIES');

export const fetchingUpcomingMovies = createAction('FETCHING_UPCOMING_MOVIES');
export const fetchedUpcomingMovies = createAction('FETCHED_UPCOMING_MOVIES');

export const loadHomePage = createAction('LOAD_HOMEPAGE');
export const loadPopularPage = createAction('LOAD_POPULARPAGE');
export const loadShowingPage = createAction('LOAD_SHOWINGPAGE');
export const loadUpcomingPage = createAction('LOAD_UPCOMINGPAGE');

export const loadMovie = createAction('LOAD_CURRENT_MOVIE');
export const loadMovieDetails = createAction('LOAD_MOVIE_DETAILS');
export const fetchedMovie = createAction('FETCHED_SPECIFIC_MOVIE');
export const fetchedMovieCast = createAction('FETCHED_MOVIE_CAST');
export const fetchedMovieImages = createAction('FETCHED_MOVIE_IMAGES');
export const fetchedMovieVideos = createAction('FETCHED_MOVIE_VIDEOS');
export const fetchedMovieReccomendatinos = createAction('FETCHED_MOVIE_RECCOMENDATIONS');

const initialState = {
    popular: {
        loading: false,
        results: [],
    },
    showing: {
        loading: false,
        results: [],
    },
    upcoming: {
        loading: false,
        results: [],
    },
    movie: {
        loading: false,
        movieID: null,
        error: false,
    },
    cast: {
        loading: false,
        error: false,
    },
    images: {
        loading: false,
        error: false,
    },
    videos: {
        loading: false,
        error: false,
    },
    reccomendations: {
        loading: false,
        error: false,
    },
};

export default handleActions({
    [fetchingPopularMovies]: (state, { payload }) => ({
        ...state,
        popular: {
            ...state.popular,
            loading: true,
        },
    }),
    [fetchedPopularMovies]: (state, { payload, error }) => ({
        ...state,
        popular: {
            ...state.popular,
            ...payload,
            results: error ? [] : payload.results,
            loading: false,
        },
    }),
    [fetchingShowingMovies]: (state, { payload }) => ({
        ...state,
        showing: {
            ...state.showing,
            loading: true,
        },
    }),
    [fetchedShowingMovies]: (state, { payload, error }) => ({
        ...state,
        showing: {
            ...state.showing,
            ...payload,
            results: error ? [] : payload.results,
            loading: false,
        },
    }),
    [fetchingUpcomingMovies]: (state, { payload }) => ({
        ...state,
        upcoming: {
            ...state.upcoming,
            loading: true,
        },
    }),
    [fetchedUpcomingMovies]: (state, { payload, error }) => ({
        ...state,
        upcoming: {
            ...state.upcoming,
            ...payload,
            results: error ? [] : payload.results,
            loading: false,
        },
    }),
    [loadMovie]: (state, { payload }) => ({
        ...state,
        movie: {
            movieID: payload,
            loading: true,
        },
        cast: {
            loading: true,
        },
        images: {
            loading: true,
        },
        videos: {
            loading: true,
        },
        reccomendations: {
            loading: true,
        },
    }),
    [fetchedMovie]: (state, { payload, error }) => ({
        ...state,
        movie: {
            ...state.movie,
            ...payload,
            loading: false,
            error,
        },
    }),
    [fetchedMovieCast]: (state, { payload, error }) => ({
        ...state,
        cast: {
            ...state.cast,
            loading: false,
            ...payload,
            error,
        }
    }),
    [fetchedMovieImages]: (state, { payload, error }) => ({
        ...state,
        images: {
            ...state.images,
            loading: false,
            ...payload,
            error,
        }
    }),
    [fetchedMovieVideos]: (state, { payload, error }) => ({
        ...state,
        videos: {
            ...state.videos,
            loading: false,
            ...payload,
            error,
        }
    }),
    [fetchedMovieReccomendatinos]: (state, { payload, error }) => ({
        ...state,
        reccomendations: {
            ...state.reccomendations,
            loading: false,
            ...payload,
            error,
        }
    }),
}, initialState)
