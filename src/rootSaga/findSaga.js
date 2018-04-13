import { put, call, select, takeLatest } from 'redux-saga/effects';
import { findMovies } from './apiCalls';
import * as findActions from '../actions/find';

function* findMoviesFilter() {
    try {
        const find = yield select(state => state.find);
        const { sortby, genre, decade, page } = find;
        const data = yield call(() => findMovies(sortby, genre, decade, page));
        yield put(findActions.fetchedFindMovies(data));
    } catch(err) {
        yield put({ type: findActions.fetchedFindMovies, error: true });
    }
}

export default [
    takeLatest(findActions.loadFindMovies, findMoviesFilter)
];