import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./reducers/chatReducer";
import settingsReducer from "./reducers/settingsReducer";

const store = configureStore({

    reducer: {
        chat: chatReducer,
        settings: settingsReducer
    }

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;