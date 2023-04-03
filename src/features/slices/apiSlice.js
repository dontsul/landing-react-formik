import { createSlice } from '@reduxjs/toolkit';
import { getApiDatas } from '../../thunk/getApiDatas';
const apiSlice = createSlice({
    name: 'api',
    initialState: {
        page: 1,
        totalPages: 0,
        loading: 'idle',
        error: null,
    },
    reducers: {
        changePage: (state) => {
            state.page = state.page + 1;
        },
        resetPage: (state) => {
            state.page = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApiDatas.pending, (state, action) => {
                state.loading = 'loading';
            })
            .addCase(getApiDatas.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.page = action.payload.page;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(getApiDatas.rejected, (state) => {
                state.loading = 'idle';
                state.error = 'Error';
            });
    },
});

export const { changePage, resetPage } = apiSlice.actions;
export const apiReducer = apiSlice.reducer;
