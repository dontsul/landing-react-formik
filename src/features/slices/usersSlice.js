import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../thunk/getUsers';
import { getPositions } from '../../thunk/getPositions';
import { getToken } from '../../thunk/getToken';

function sortByDateDescending(users) {
    users.sort(function (a, b) {
        return b.registration_timestamp - a.registration_timestamp;
    });
    return users;
}

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        items: [],
        loading: 'idle',
        error: null,
        positions: [],
        sortedUsers: [],
        token: '',
    },
    reducers: {
        resetItems: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.error = null;
                state.items.push(...action.payload.users);
                state.sortedUsers = sortByDateDescending(state.items);
            })
            .addCase(getPositions.fulfilled, (state, action) => {
                state.positions = action.payload.positions;
            })
            .addCase(getToken.fulfilled, (state, action) => {
                state.token = action.payload.token;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = 'loading';
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state) => {
                    state.loading = 'idle';
                    state.error = 'Error';
                    console.log('error');
                }
            );
    },
});

export const usersReducer = usersSlice.reducer;
export const { resetItems } = usersSlice.actions;
