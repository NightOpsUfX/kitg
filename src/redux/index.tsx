import {combineReducers, configureStore } from "@reduxjs/toolkit";
import slice from "./RequestSlice/request.slice"

const rootReducer = combineReducers(
    {
        toolkit: slice
    }
)

export const store = configureStore({
    reducer: rootReducer,
})
