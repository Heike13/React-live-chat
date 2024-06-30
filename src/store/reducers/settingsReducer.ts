import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { createAppAsyncThunk } from "../../utils/redux";

// Initial state types
interface ISettingsState {
  open: boolean;
  loading: boolean;
  error: string;
  credentials: ICredentials;
  pseudo: string;
}

const initialState: ISettingsState = {
    open: false,
    loading: false,
    error: "",
    credentials: {
        email: "",
        password: "",
    },
    pseudo: "",
};
// Helper types
export type KeysOfCredentials = keyof ICredentials;

// Actions for the reducer
export const updateCredentialField = createAction<{
  value: string;
  field: KeysOfCredentials;
}>("SETTINGS/UPDATE_CREDENTIAL_FIELD");
export const toggleSettings = createAction("SETTINGS/TOGGLE_SETTINGS");
export const login = createAppAsyncThunk(
  "SETTING/LOGIN_ASYNC",
  async (_, thunkAPI) => {
    const store = thunkAPI.getState();
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      store.settings.credentials
    );
    return data as { pseudo: string };
  }
);

const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCredentialField, (state, action) => {
      const field = action.payload.field;
      state.credentials[field] = action.payload.value;
    })
    .addCase(toggleSettings, (state) => {
      state.open = !state.open;
    })
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.pseudo = action.payload.pseudo;
      state.loading = false;
      state.open = false;
    })
    .addCase(login.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    });
});

export default settingsReducer;
