import { API_URL } from '../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const getApiDatas = createAsyncThunk('users/getApiDatas', async (_, { dipatch }) => {
    try {
        const res = await fetch(`${API_URL}users?page=1&count=6`);
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
});
