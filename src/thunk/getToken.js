import { createAsyncThunk } from '@reduxjs/toolkit';

export const getToken = createAsyncThunk('users/getToken', async () => {
    try {
        const res = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/token`);
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
});
