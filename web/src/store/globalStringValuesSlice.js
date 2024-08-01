import { createSlice } from '@reduxjs/toolkit'

export const globalStringValuesSlice = createSlice({
    name: 'video',
    initialState: {
        phoneNumber: '+7 (903) 733-57-57',
    },
    reducers: {
        setPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload
        },
    },
})

export const { setPhoneNumber } = globalStringValuesSlice.actions
export default globalStringValuesSlice.reducer
