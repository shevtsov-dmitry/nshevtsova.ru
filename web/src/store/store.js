import { configureStore } from '@reduxjs/toolkit';
import globalStringValuesSlice from './globalStringValuesSlice';
import reviewSlice from './reviewSlice';
import estateFormSlice from './estateFormSlice.js';

export const store = configureStore({
    reducer: {
        globalStringValues: globalStringValuesSlice,
        review: reviewSlice,
        estateForm: estateFormSlice
    }
});
