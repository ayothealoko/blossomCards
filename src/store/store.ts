import { configureStore } from "@reduxjs/toolkit";
import decksReducer from "../pages/decksSlice";
import { indexSlice } from "../pages/indexSlice";
// ...

export const store = configureStore({
  reducer: {
    index: indexSlice.reducer,
    decks: decksReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
