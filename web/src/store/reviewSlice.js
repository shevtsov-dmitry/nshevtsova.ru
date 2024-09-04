import { createSlice } from '@reduxjs/toolkit';

export const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        stars: 0,
        isReviewSent: false,
    },
    reducers: {
        setRatingStars: (state, action) => {
            state.stars = action.payload
        },
        setIsReviewSent: (state, action) => {
            state.isReviewSent = action.payload
        },

    }
});

export const { setRatingStars } = reviewSlice.actions
export const { setIsReviewSent } = reviewSlice.actions

export default reviewSlice.reducer;
