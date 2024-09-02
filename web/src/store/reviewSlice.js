import { createSlice } from '@reduxjs/toolkit';

export const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        stars: 0,
    },
    reducers: {
        setRatingStars: (state, action) => {
            state.stars = action.payload
        },
    }
});

export const { setRatingStars } = reviewSlice.actions
export default reviewSlice.reducer;
