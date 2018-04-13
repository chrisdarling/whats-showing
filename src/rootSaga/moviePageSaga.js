import { put, call, takeLatest, select } from 'redux-saga/effects';
import * as movieActions from '../actions/movies';
import { getMovieByID, getMovieCast, getMovieImages, getMovieVideos, getMovieReccomendations } from './apiCalls';

function* loadMovieByID() {
    try {
        const movies = yield select(state => state.movies);
        const { movie: { movieID } } = movies;
        const data = yield call(() => getMovieByID(movieID));
        yield put(movieActions.fetchedMovie(data));
    } catch(err) {
        yield put({ type: movieActions.fetchedMovie, error: true });
    }
}

function* loadMovieCast() {
    try {
        const movies = yield select(state => state.movies);
        const { movie: { movieID } } = movies;
        const data = yield call(() => getMovieCast(movieID));
        yield put(movieActions.fetchedMovieCast(data));
    } catch(err) {
        yield put({ type: movieActions.fetchedMovieCast, error: true });
    }
}

function* loadMovieImages() {
    try {
        const movies = yield select(state => state.movies);
        const { movie: { movieID } } = movies;
        const data = yield call(() => getMovieImages(movieID));
        yield put(movieActions.fetchedMovieImages(data));
    } catch(err) {
        yield put({ type: movieActions.fetchedMovieImages, error: true });
    }
}

function* loadMovieVideos() {
    try {
        const movies = yield select(state => state.movies);
        const { movie: { movieID } } = movies;
        const data = yield call(() => getMovieVideos(movieID));
        yield put(movieActions.fetchedMovieVideos(data));  
    } catch(err) {
        yield put({ type: movieActions.fetchedMovieVideos, error: true });
    }
}

function* loadMovieReccomendations() {
    try {
        const movies = yield select(state => state.movies);
        const { movie: { movieID } } = movies;
        const data = yield call(() => getMovieReccomendations(movieID));
        yield put(movieActions.fetchedMovieReccomendatinos(data));
    } catch(err) {
        yield put({ type: movieActions.fetchedMovieReccomendatinos, error: true });
    }
}

export default [
    takeLatest(movieActions.loadMovie, loadMovieCast),
    takeLatest(movieActions.loadMovie, loadMovieImages),
    takeLatest(movieActions.loadMovie, loadMovieVideos),
    takeLatest(movieActions.loadMovie, loadMovieReccomendations),
    takeLatest(movieActions.loadMovie, loadMovieByID),
];
