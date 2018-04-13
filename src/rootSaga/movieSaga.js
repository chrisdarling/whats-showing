import { put, call, takeLatest } from 'redux-saga/effects';
import * as movieActions from '../actions/movies';
import { getPopularData, getShowingData, getUpcommingData } from './apiCalls';

function* loadPopularData() {
    try {
        yield put(movieActions.fetchingPopularMovies());
        const data = yield call(getPopularData);
        yield put(movieActions.fetchedPopularMovies(data.data));
    } catch(err) {
        yield put({ type: movieActions.fetchedPopularMovies, error: true });
    }
}

function* loadShowingData() {
    try {
        yield put(movieActions.fetchingShowingMovies());
        const data = yield call(getShowingData);
        yield put(movieActions.fetchedShowingMovies(data.data));
    } catch(err) {
        yield put({ type: movieActions.fetchedShowingMovies, error: true });
    }
}

function* loadUpcomingData() {
    try {
        yield put(movieActions.fetchingUpcomingMovies());
        const data = yield call(getUpcommingData);
        yield put(movieActions.fetchedUpcomingMovies(data.data));
    } catch(err) {
        yield put({ type: movieActions.fetchedUpcomingMovies, error: true });
    }
}

export default [
    takeLatest(movieActions.loadPopularPage, loadPopularData),
    takeLatest(movieActions.loadShowingPage, loadShowingData),
    takeLatest(movieActions.loadUpcomingPage, loadUpcomingData),
    takeLatest(movieActions.loadHomePage, loadPopularData),
    takeLatest(movieActions.loadHomePage, loadShowingData),
    takeLatest(movieActions.loadHomePage, loadUpcomingData),
];