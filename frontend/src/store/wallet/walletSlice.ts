import { createSlice } from "@reduxjs/toolkit";
import { Account } from "thirdweb/wallets";
import { connectWallet } from "./walletThunk";

export interface IWalletState {
  personalAccount: Account | null;
  smartAccount: Account | null;
  error: string | null;
  loading: boolean;
  balance: number;
}

const initialState: IWalletState = {
  personalAccount: null,
  smartAccount: null,
  error: null,
  loading: false,
  balance: 5000,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    // reducers funcs having no side effects
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(connectWallet.fulfilled, (state, action) => {
        state.personalAccount = action.payload.personalAccount;
        state.smartAccount = action.payload.smartAccount;

        state.loading = false;
      })
      .addCase(connectWallet.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default walletSlice.reducer;
