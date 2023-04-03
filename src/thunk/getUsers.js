import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../config';

export const getUsers = createAsyncThunk('users/getUsers', async (page) => {
    try {
        const res = await fetch(`${API_URL}users?page=${page}&count=6`);
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
});
