import {fetchBaseQuery} from '@reduxjs/toolkit/query';

import {RootState} from './index';

export const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/api`,
    prepareHeaders: (headers, {getState}) => {
        const {token} = (getState() as RootState).auth;
        if (token) {
            headers.set('X-XAPP-Token', token);
        }
        return headers;
    },
});
