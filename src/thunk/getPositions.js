import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../config';

export const getPositions = createAsyncThunk('users/getPositions', async (page) => {
    try {
        const res = await fetch(`${API_URL}positions`);
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
});
