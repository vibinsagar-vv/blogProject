import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching activities
export const fetchActivities = createAsyncThunk(
    'activities/fetchActivities',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:7800/user/fetchActivites');
            return response.data.data; 
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Failed to fetch activities');
        }
    }
);

const activitySlice = createSlice({
    name: 'activities',
    initialState: {
        activities: [],
       status:'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivities.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchActivities.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.activities = action.payload;
            })
            .addCase(fetchActivities.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default activitySlice.reducer;