import { createSlice } from '@reduxjs/toolkit';

export const globalStringValuesSlice = createSlice({
    name: 'video',
    initialState: {
        serverUrl: 'http://localhost:8080',
        phoneNumber: '+7 (962) 329-51-30',
        additionalPhoneNumber: '+7 (950) 757-03-47',
        vk: 'https://vk.com',
        viber: 'https://viber.com',
        whatsapp: 'https://whatsapp.com',
        telegram: 'https://t.me',
        isAdmin: false
    },
    reducers: {
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        }
    }
});

export const { setIsAdmin } = globalStringValuesSlice.actions;
export default globalStringValuesSlice.reducer;
