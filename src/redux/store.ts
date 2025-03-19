import {configureStore, Middleware} from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";
import {loggerMiddleware} from "./loggerMiddleware";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware, loggerMiddleware as Middleware)
});


