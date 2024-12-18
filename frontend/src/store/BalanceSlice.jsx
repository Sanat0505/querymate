import { createSlice } from "@reduxjs/toolkit";
import { BigNumber } from "ethers";

let initialState = {
  EzyBalance: BigNumber.from('0'),
  UsdtBalance: BigNumber.from('0'),
  refresh: false
};

export const BalanceSlice = createSlice({
    name: "BalanceSlice",
    initialState: {
        ...initialState
    },

    reducers: {
        setEazyBalance: (data, action) => {
            data.EzyBalance = action.payload
        },

        setUsdtBalance: (data, action) => {
            data.UsdtBalance = action.payload
        },

        setRefresh: (data, action) => {
            data.refresh = action.payload
        },
    }
})


export const { setEazyBalance, setUsdtBalance, setRefresh } = BalanceSlice.actions;
export default BalanceSlice.reducer;
