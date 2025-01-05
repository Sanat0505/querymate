import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  userData: [],
  refresh: false,
  bpmnXml: [],
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
        setBpmnXml: (data, action) => {
            data.bpmnXml = action.payload
        },
    }
})


export const { userData, setRefresh, setBpmnXml } = DataSlice.actions;
export default DataSlice.reducer;
