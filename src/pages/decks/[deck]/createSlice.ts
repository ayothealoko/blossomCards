import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api/tauri";
import type { InputCardsProps } from "../../../components/inputCards";

export interface CreateState {
  cards: InputCardsProps["cards"];
}

const initialState: CreateState = {
  cards: [
    { num: 1, front: "", back: "" },
    { num: 2, front: "", back: "" },
    { num: 3, front: "", back: "" },
  ],
};

export const createSDeckSlice = createSlice({
  name: "createDecks",
  initialState,
  reducers: {},
});

export default createDeckSlice.reducer;
// export async thunk action
