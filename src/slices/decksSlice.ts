import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api/tauri";
import { DeckListProps, DeckRow } from "../components/DeckList";
import { RootState } from "../store/store";

type DeckList = DeckListProps["list"];

//NOTE AYSNC THUNK TYPING
//createAsyncThunk<return of payload creator, first arg of payload creator,
// obj with typing for thunk api>

// Dedupe cases where called twice
type DeckListThunk = DeckListProps["list"] | "Do Nothing";

export interface DecksState {
  deckList: DeckList;
  showDeckStatus: "idle" | "pending" | "fulfilled" | "rejected";
  showDeckStatusRequestId?: string;
  updateDeckStatus: "idle" | "pending" | "fulfilled" | "rejected";
  updateDeckStatusRequestId?: string;
  createDeckStatus: "idle" | "pending" | "fulfilled" | "rejected";
  createDeckStatusRequestId?: string;
  deleteDeckStatus: "idle" | "pending" | "fulfilled" | "rejected";
  deleteDeckStatusRequestId?: string;
}

const initialState: DecksState = {
  deckList: [],
  showDeckStatus: "idle",
  showDeckStatusRequestId: undefined,
  updateDeckStatus: "idle",
  updateDeckStatusRequestId: undefined,
  createDeckStatus: "idle",
  createDeckStatusRequestId: undefined,
  deleteDeckStatus: "idle",
  deleteDeckStatusRequestId: undefined,
};

interface DecksThunkType {
  state: RootState;
}

// thunk to fetch data from and export action
export const showDecksCmd = createAsyncThunk<
  DeckListThunk,
  void,
  DecksThunkType
>(
  "decks/showDecksCommand",
  async (_: void, { getState, requestId }): Promise<DeckListThunk> => {
    const currRequestId: string = getState().decks.showDeckStatusRequestId;
    const showDeckStatus: string = getState().decks.showDeckStatus;

    if (!window || currRequestId !== requestId || showDeckStatus != "pending") {
      // Dedupe cases where called twice
      return "Do Nothing";
    }

    const response = await invoke("show_deck_cmd");
    return response as DeckList;
  }
);

// thunk to update data and export action
export const updateDecksCmd = createAsyncThunk<void, DeckRow, DecksThunkType>(
  "decks/updateDecksCommand",
  async (deckEdit: DeckRow, { getState, requestId }): Promise<null> => {
    const currRequestId: string = getState().decks.updateDeckStatusRequestId;
    const updateDeckStatus: string = getState().decks.updateDeckStatus;

    if (
      !window ||
      currRequestId !== requestId ||
      updateDeckStatus != "pending"
    ) {
      return;
    }

    return await invoke("update_deck_cmd", { edit: deckEdit });
  }
);

// thunk to create data and export action
export const createDecksCmd = createAsyncThunk<void, string, DecksThunkType>(
  "decks/createDecksCommand",
  async (title: string, { getState, requestId }): Promise<null> => {
    const currRequestId: string = getState().decks.createDeckStatusRequestId;
    const createDeckStatus: string = getState().decks.createDeckStatus;

    if (
      !window ||
      currRequestId !== requestId ||
      createDeckStatus != "pending"
    ) {
      return;
    }

    return await invoke("create_deck_cmd", { deck: title });
  }
);

// thunk to create data and export action
export const deleteDecksCmd = createAsyncThunk<void, number, DecksThunkType>(
  "decks/deleteDecksCommand",
  async (deckId: number, { getState, requestId }): Promise<null> => {
    const currRequestId: string = getState().decks.deleteDeckStatusRequestId;
    const deleteDeckStatus: string = getState().decks.deleteDeckStatus;

    if (
      !window ||
      currRequestId !== requestId ||
      deleteDeckStatus != "pending"
    ) {
      return;
    }
    console.log("gg");

    return await invoke("delete_deck_cmd", { decksId: deckId });
  }
);

export const decksSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SHOW DECKS
      .addCase(showDecksCmd.pending, (state, action) => {
        if (state.showDeckStatus === "idle") {
          state.showDeckStatus = "pending";
          state.showDeckStatusRequestId = action.meta.requestId;
        }
      })
      .addCase(showDecksCmd.fulfilled, (state, action) => {
        // Dedupe cases where called twice
        const { requestId } = action.meta;
        if (
          action.payload !== "Do Nothing" &&
          state.showDeckStatus === "pending" &&
          state.showDeckStatusRequestId === requestId
        ) {
          state.showDeckStatus = "idle";
          state.deckList = action.payload;
          state.showDeckStatusRequestId = undefined;
        }
      })
      .addCase(showDecksCmd.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.showDeckStatus === "pending" &&
          state.showDeckStatusRequestId === requestId
        ) {
          state.showDeckStatus = "idle";
          // TODO log errors
          // state.error = action.error
          state.showDeckStatusRequestId = undefined;
        }
      })
      // UPDATE DECKS
      .addCase(updateDecksCmd.pending, (state, action) => {
        if (state.showDeckStatus === "idle") {
          state.updateDeckStatus = "pending";
          state.updateDeckStatusRequestId = action.meta.requestId;
        }
      })
      .addCase(updateDecksCmd.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.updateDeckStatus === "pending" &&
          state.updateDeckStatusRequestId === requestId
        ) {
          // once finished use a useEffect to reload decks
          state.updateDeckStatus = "idle";
          state.updateDeckStatusRequestId = undefined;
        }
      })
      .addCase(updateDecksCmd.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.updateDeckStatus === "pending" &&
          state.updateDeckStatusRequestId === requestId
        ) {
          state.updateDeckStatus = "idle";
          // TODO log errors
          // state.error = action.error
          state.updateDeckStatusRequestId = undefined;
        }
      })
      // CREATE DECKS
      .addCase(createDecksCmd.pending, (state, action) => {
        if (state.createDeckStatus === "idle") {
          state.createDeckStatus = "pending";
          state.createDeckStatusRequestId = action.meta.requestId;
        }
      })
      .addCase(createDecksCmd.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.createDeckStatus === "pending" &&
          state.createDeckStatusRequestId === requestId
        ) {
          // once finished use a useEffect to reload decks
          state.createDeckStatus = "idle";
          state.createDeckStatusRequestId = undefined;
        }
      })
      .addCase(createDecksCmd.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.createDeckStatus === "pending" &&
          state.createDeckStatusRequestId === requestId
        ) {
          state.createDeckStatus = "idle";
          // TODO log errors
          // state.error = action.error
          state.createDeckStatusRequestId = undefined;
        }
      })
      //DELETE DECKS
      .addCase(deleteDecksCmd.pending, (state, action) => {
        if (state.deleteDeckStatus === "idle") {
          state.deleteDeckStatus = "pending";
          state.deleteDeckStatusRequestId = action.meta.requestId;
        }
      })
      .addCase(deleteDecksCmd.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.deleteDeckStatus === "pending" &&
          state.deleteDeckStatusRequestId === requestId
        ) {
          // once finished use a useEffect to reload decks
          state.deleteDeckStatus = "idle";
          state.deleteDeckStatusRequestId = undefined;
        }
      })
      .addCase(deleteDecksCmd.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.deleteDeckStatus === "pending" &&
          state.deleteDeckStatusRequestId === requestId
        ) {
          state.deleteDeckStatus = "idle";
          // TODO log errors
          // state.error = action.error
          state.deleteDeckStatusRequestId = undefined;
        }
      });
  },
});

export default decksSlice.reducer;
// export async thunk action
