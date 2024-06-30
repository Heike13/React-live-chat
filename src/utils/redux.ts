import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store/store";

// Creation of a custom asyncThunk preTyped with the state and dispatch types
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState,
    dispatch: AppDispatch
}>();