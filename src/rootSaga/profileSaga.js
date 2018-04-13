import { put, call, select, takeLatest } from 'redux-saga/effects';
import * as profileActions from '../actions/profile';
import { getProfile, getProfileDetails } from './apiCalls';

function* profileFetch() {
    try {
        yield put(profileActions.loadDetails());
        const profile = yield select(state => state.profile);
        const { profileID } = profile;
        const data = yield call(() => getProfile(profileID));
        yield put(profileActions.fetchedProfile(data));
    } catch(err) {
        yield put({ type: profileActions.fetchedProfile, error: true });
    }
}

function* profileDetailsFetch() {
    try {
        const profile = yield select(state => state.profile);
        const { profileID } = profile;
        const data = yield call(() => getProfileDetails(profileID));
        yield put(profileActions.fetchedDetails(data));
    } catch (err) {
        yield put({ type: profileActions.fetchedDetails, error: true });
    }
}

export default [
    takeLatest(profileActions.loadDetails, profileDetailsFetch),
    takeLatest(profileActions.loadProfile, profileFetch),
];