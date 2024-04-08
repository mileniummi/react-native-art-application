import {createApi} from '@reduxjs/toolkit/query/react';

import {baseQuery} from '../baseQuery';
import {IGetShowsRequest, IGetShowsResponse} from '../../models/show.model';
import {IEmbeddedApiResponse} from '../../models/common.model';

export const showsApi = createApi({
    reducerPath: 'showsApi',
    baseQuery,
    endpoints: builder => ({
        getShows: builder.query<IEmbeddedApiResponse<IGetShowsResponse>, IGetShowsRequest | undefined>({
            query: params => ({url: '/shows', params}),
        }),
    }),
});

export const {
    useGetShowsQuery,
    reducer: showsReducer,
    reducerPath: showsReducerPath,
    middleware: showsMiddleware,
} = showsApi;
