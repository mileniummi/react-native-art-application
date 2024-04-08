import {createApi} from '@reduxjs/toolkit/query/react';

import {baseQuery} from '../baseQuery';
import {IGetImagesRequest, IImagesResponse} from '../../models/images.model';
import {IEmbeddedApiResponse} from '../../models/common.model';

export const imagesApi = createApi({
    reducerPath: 'imagesApi',
    baseQuery,
    endpoints: builder => ({
        getImages: builder.query<IEmbeddedApiResponse<IImagesResponse>, IGetImagesRequest>({
            query: params => ({url: '/images', params}),
        }),
    }),
});

export const {
    useGetImagesQuery,
    reducer: imagesReducer,
    reducerPath: imagesReducerPath,
    middleware: imagesMiddleware,
} = imagesApi;
