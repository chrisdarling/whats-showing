import { createAction, handleActions } from 'redux-actions';

const initialState = {
    loading: false,
    profileID: null,
    details: {
        loading: false,
    },
};

export const loadProfile = createAction('LOAD_PROFILE');
export const fetchedProfile = createAction('FETCHED_PROFILE');
export const loadDetails = createAction('LOAD_PROFILE_DETAILS');
export const fetchedDetails = createAction('FETCHED_PROFILE_DETAILS');

export default handleActions({
    [loadProfile]: (state, { payload }) => ({
        profileID: payload,
        loading: true,
        details: {
            loading: true,
        },
    }),
    [fetchedProfile]: (state, { payload, error }) => ({
        ...state,
        ...payload,
        loading: false,
        error,
    }),
    [fetchedDetails]: (state, { payload, error }) => ({
        ...state,
        details: {
            ...payload,
            loading: false,
            error,
        },
    }),
}, initialState);