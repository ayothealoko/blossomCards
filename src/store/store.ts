import { configureStore } from "@reduxjs/toolkit";
import decksReducer from "../slices/decksSlice";
import cardsReducer from "../slices/cardSlice";
import { indexSlice } from "../slices/indexSlice";
// ...

export const store = configureStore({
  reducer: {
    index: indexSlice.reducer,
    decks: decksReducer,
    cards: cardsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
