import { put, call, select, takeLatest } from 'redux-saga/effects';
import * as searchActions from '../actions/search';
import { searchMovies, searchPeople } from './apiCalls';

function* fetchMovies() {
    try {
        const search = yield select(state => state.search);
        const { searchString, page } = search;
        const data = yield call(() => searchMovies(searchString, page));
        yield put(searchActions.fetchedMovies(data));
    } catch(err) {
        yield put({ type: searchActions.fetchedMovies, error: true });
    }
}

function* fetchPeople() {
    try {
        const search = yield select(state => state.search);
        const { searchString, page } = search;
        const data = yield call(() => searchPeople(searchString, page));
        yield put(searchActions.fetchedPeople(data));
    } catch(err) {
        yield put({ type: searchActions.fetchedPeople, error: true });
    }
}

export default [
    takeLatest(searchActions.loadSearch, fetchMovies),
    takeLatest(searchActions.loadSearch, fetchPeople),
    takeLatest(searchActions.loadMovieSearch, fetchMovies),
    takeLatest(searchActions.loadPeopleSearch, fetchPeople),
];