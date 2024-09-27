import { configureStore } from '@reduxjs/toolkit'
import globalStringValuesSlice from './globalStringValuesSlice'
import reviewSlice from './reviewSlice'
import activeElementsSlice from './activeElementsSlice'

export const store = configureStore({
    reducer: {
        globalStringValues: globalStringValuesSlice,
        review: reviewSlice,
        activeElements: activeElementsSlice,
    },
})
