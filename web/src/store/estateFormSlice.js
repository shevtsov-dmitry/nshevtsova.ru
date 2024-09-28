import { createSlice } from '@reduxjs/toolkit';

export const estateFormSlice = createSlice({
    name: 'estateForm',
    initialState: {
        // isVisible: false,
        estateJson: {
            estate: {
                // imageBase64: noImgIconBase64,
                price: 11248458,
                estateType: 'APARTMENT',
                // createdAt: '2024-08-24T14:33:24',
                address: 'Борисоглебск, Третьяковская ул., 73'
            },
            innerAttributes: {
                roomsAmount: 2,
                totalSizeSquareMeters: 70.1,
                kitchenSizeSquareMeters: 22.1,
                hasFinishing: false,
                ceilHeight: 2.3,
                toiletsAmount: 1
            },
            outerAttributes: {
                floor: 9,
                allFloors: 9,
                releaseDate: 1958,
                hasParking: true,
                description: 'Квартира с видом на парк и реку.'
            }
        }
    },
    reducers: {
        // setIsEstateFormActive: (state, action) => {
        //     state.estateForm = action.payload
        // },
        setEstateJson: (state, action) => {
            state.estateForm = action.payload;
        }
    }
});

export const { setEstateJson } = estateFormSlice.actions;

export default estateFormSlice.reducer;
