import { createSlice } from '@reduxjs/toolkit';

export const activeElementsSlice = createSlice({
    name: 'activeElements',
    initialState: {
        estateForm: false,
    },
    reducers: {
        setIsEstateFormActive: (state, action) => {
            state.estateForm = action.payload
        },
    }
});

export const { setIsEstateFormActive } = activeElementsSlice.actions

export default activeElementsSlice.reducer;