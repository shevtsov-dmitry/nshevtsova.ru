import { createSlice } from '@reduxjs/toolkit';

export const estateFormSlice = createSlice({
    name: 'estateForm',
    initialState: {
        isVisible: false,
        stateJson: {
            currentFormType: '',
            estate: {
                price: 11248458,
                estateType: 'APARTMENT',
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
        setIsEstateFormVisible: (state, action) => {
            state.isVisible = action.payload;
        },
        setEstateJson: (state, action) => {
            state.estateForm = action.payload;
        },
        setCurrentFormType: (state, action) => {
            state.currentFormType = action.payload;
        }
    }
});

export const { setEstateJson, setIsEstateFormVisible, setCurrentFormType } =
    estateFormSlice.actions;

export default estateFormSlice.reducer;
