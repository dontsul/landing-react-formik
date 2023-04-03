import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/slices/usersSlice';
import { apiReducer } from '../features/slices/apiSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        api: apiReducer,
    },
});
