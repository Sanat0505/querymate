import { combineReducers } from "@reduxjs/toolkit";
import BalanceSlice from "./BalanceSlice";

export default combineReducers({
  data: DataSlice,
  balance: BalanceSlice,
});

