import { createSlice } from '@reduxjs/toolkit';

export const globalStringValuesSlice = createSlice({
    name: 'video',
    initialState: {
        phoneNumber: '+7 (962) 329-51-30',
        additionalPhoneNumber: '+7 (950) 757-03-47',
        vk: 'https://vk.com',
        viber: 'https://viber.com',
        whatsapp: 'https://whatsapp.com',
        telegram: 'https://t.me'
    },
    reducers: {
        // setPhoneNumber: (state, action) => {
        //     state.phoneNumber = action.payload
        // },
    }
});

// export const { setPhoneNumber } = globalStringValuesSlice.actions
export default globalStringValuesSlice.reducer;
