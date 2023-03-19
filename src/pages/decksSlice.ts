import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api/tauri";
import { DeckListProps } from "../components/DeckList";

export interface DecksState {
  deckList: DeckListProps["list"];
}

const initialState: DecksState = {
  deckList: [],
};

// thunk to fetch data from and export action
export const showDecksCmd = createAsyncThunk(
  "decks/showDecksCommand",
  async () => {
    if (window) {
      const response = await invoke("show_deck_cmd");
      return response as DeckListProps["list"];
    }

    return [];
  }
);

export const decksSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showDecksCmd.fulfilled, (state, action) => {
      state.deckList = action.payload;
    });
  },
});

export default decksSlice.reducer;
// export async thunk action
