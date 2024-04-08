import {createSlice} from '@reduxjs/toolkit';

import {RootState} from '../../index';

const slice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const {
    reducerPath: authReducerPath,
    reducer: authReducer,
    actions: authActions,
} = slice;

export const selectAuthToken = (state: RootState) => state.auth.token;
