import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";
import {loggerMiddleware} from "./loggerMiddleware";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware, loggerMiddleware),
});

// Типизация `RootState` и `AppDispatch`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
