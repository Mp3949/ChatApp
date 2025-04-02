import { createSlice } from '@reduxjs/toolkit';


const searchSlice = createSlice({
    name: "searchuser",
    // Initial state should have both:
    initialState: {
        otherUsers: [], // Original full list
        filteredOtherUsers: [] // Filtered results
    },
    reducers: {
        // Add this to your slice
        setFilteredOtherUsers: (state, action) => {
            state.filteredOtherUsers = action.payload;
        }
    }
});
export const { setFilteredOtherUsers} = searchSlice.actions;
export default searchSlice.reducer;