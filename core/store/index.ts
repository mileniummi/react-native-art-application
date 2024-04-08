import {configureStore} from '@reduxjs/toolkit';

import {authReducer, authReducerPath} from './reducers/auth/auth.reducer';
import {imagesMiddleware, imagesReducer, imagesReducerPath} from './services/images.service';
import {showsMiddleware, showsReducer, showsReducerPath} from './services/shows.service';

export const store = configureStore({
    reducer: {
        [authReducerPath]: authReducer,
        [imagesReducerPath]: imagesReducer,
        [showsReducerPath]: showsReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([imagesMiddleware, showsMiddleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
