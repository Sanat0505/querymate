import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  userData: [],
  refresh: false
};

export const DataSlice = createSlice({
    name: "DataSlice",
    initialState: {
        ...initialState
    },

    reducers: {
        userData: (data, action) => {
            data.userData = action.payload
        },

        setRefresh: (data, action) => {
            data.refresh = action.payload
        },
    }
})


export const { userData, setRefresh } = DataSlice.actions;
export default DataSlice.reducer;
