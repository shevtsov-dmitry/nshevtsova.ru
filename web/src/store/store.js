import { configureStore } from '@reduxjs/toolkit'
import globalStringValuesSlice from './globalStringValuesSlice'
import reviewSlice from './reviewSlice'

export const store = configureStore({
    reducer: {
        globalStringValues: globalStringValuesSlice,
        review: reviewSlice,
    },
})
