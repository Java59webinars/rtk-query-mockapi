import { MiddlewareAPI, Dispatch} from "@reduxjs/toolkit";
import { Action } from "redux";


export const loggerMiddleware =
        (store: MiddlewareAPI) =>
        (next: Dispatch<Action>) =>
        (action: Action) => {
    console.log("🔹 Dispatching action:", action);
    console.log("📦 Before request:", store.getState()); //  Используем store.getState()

    if (action.type.endsWith("/pending")) {
        console.log("🟡 Request send:", action);
    }

    if (action.type.endsWith("/fulfilled")) {
        console.log("🟢 Successful response:", action);
    }

    if (action.type.endsWith("/rejected")) {
        console.error("🔴 Request error:", action);
    }

    const result = next(action);

    console.log("📦 Current  state after request:", store.getState()); // Логируем состояние после запроса

    return result;
};