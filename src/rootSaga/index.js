import { all } from 'redux-saga/effects';
import searchSaga from './searchSaga';
import profileSaga from './profileSaga';
import moviePageSaga from './moviePageSaga';
import movieSaga from './movieSaga';
import findSaga from './findSaga';

export default function* rootSaga() {
    yield all([
            ...profileSaga,
            ...searchSaga,
            ...moviePageSaga,
            ...movieSaga,
            ...findSaga,
        ]);
}