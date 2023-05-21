import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api/tauri";
import { RootState } from "../store/store";
import { InputCardsProps } from "../components/inputCards";

//NOTE AYSNC THUNK TYPING
//createAsyncThunk<return of payload creator, first arg of payload creator,
// obj with typing for thunk api>

// Dedupe cases where called twice

type CardType = InputCardsProps["cards"];

export interface CardState {
  decksId?: number;
  getDecksIdStatus: "idle" | "pending" | "fulfilled" | "rejected";
  getDecksIdRequestId?: string;
  cards?: CardType;
  readCardsStatus: "idle" | "pending" | "fulfilled" | "rejected";
  readCardsRequestId?: string;
  createCardsStatus: "idle" | "pending" | "fulfilled" | "rejected";
  createCardsRequestId?: string;
}

const initialState: CardState = {
  decksId: undefined,
  getDecksIdStatus: "idle",
  getDecksIdRequestId: undefined,
  cards: undefined,
  readCardsStatus: "idle",
  readCardsRequestId: undefined,
  createCardsStatus: "idle",
  createCardsRequestId: undefined,
};

interface CardThunkType {
  state: RootState;
}

// thunk to fetch data from and export action
export const getDecksIdCmd = createAsyncThunk<number, string, CardThunkType>(
  "cards/showDeckNameCommand",
  async (deckName: string, { getState, requestId }): Promise<number> => {
    const currRequestId: string = getState().cards.getDecksIdRequestId;
    const getDecksIdStatus: string = getState().cards.getDecksIdStatus;

    if (
      !window ||
      currRequestId !== requestId ||
      getDecksIdStatus != "pending"
    ) {
      // Dedupe cases where called twice
      // -1 means do nothing
      return -1;
    }

    const response: number = await invoke("get_decks_id_cmd", {
      deckName: deckName,
    });
    return response;
  }
);

export const createCardsCmd = createAsyncThunk<
  void,
  [string, string, number],
  CardThunkType
>(
  "cards/createCardsCommand",
  async (
    card: [string, string, number],
    { getState, requestId }
  ): Promise<null> => {
    const currRequestId: string = getState().cards.createCardsRequestId;
    const createCardsStatus: string = getState().cards.createCardsStatus;

    if (
      !window ||
      currRequestId !== requestId ||
      createCardsStatus != "pending"
    ) {
      return;
    }

    return await invoke("create_card_cmd", {
      front: card[0],
      back: card[1],
      decksId: card[2],
    });
  }
);

type ReadCardType = CardType | "Do Nothing";
// thunk to fetch data from and export action
export const readCardsCmd = createAsyncThunk<
  ReadCardType,
  number,
  CardThunkType
>(
  "cards/ReadCardsCommand",
  async (decksId: number, { getState, requestId }): Promise<ReadCardType> => {
    const currRequestId: string = getState().cards.readCardsRequestId;
    const getDecksIdStatus: string = getState().cards.readCardsStatus;

    if (
      !window ||
      currRequestId !== requestId ||
      getDecksIdStatus != "pending"
    ) {
      // Dedupe cases where called twice
      return "Do Nothing";
    }

    const response: CardType = await invoke("read_cards_cmd", {
      decksId: decksId,
    });
    return response;
  }
);

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get DECK id
      .addCase(getDecksIdCmd.pending, (state, action) => {
        if (state.getDecksIdStatus === "idle") {
          state.getDecksIdStatus = "pending";
          state.getDecksIdRequestId = action.meta.requestId;
        }
      })
      .addCase(getDecksIdCmd.fulfilled, (state, action) => {
        // Dedupe cases where called twice
        const { requestId } = action.meta;
        if (
          action.payload !== -1 &&
          state.getDecksIdStatus === "pending" &&
          state.getDecksIdRequestId === requestId
        ) {
          state.getDecksIdStatus = "idle";
          state.getDecksIdRequestId = undefined;
          state.decksId = action.payload;
        }
      })
      .addCase(getDecksIdCmd.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.getDecksIdStatus === "pending" &&
          state.getDecksIdRequestId === requestId
        ) {
          state.getDecksIdStatus = "idle";
          // TODO log errors
          // state.error = action.error
          state.getDecksIdRequestId = undefined;
        }
      })
      // read Cards
      .addCase(readCardsCmd.pending, (state, action) => {
        if (state.readCardsStatus === "idle") {
          state.readCardsStatus = "pending";
          state.readCardsRequestId = action.meta.requestId;
        }
      })
      .addCase(readCardsCmd.fulfilled, (state, action) => {
        // Dedupe cases where called twice
        const { requestId } = action.meta;
        if (
          action.payload !== "Do Nothing" &&
          state.readCardsStatus === "pending" &&
          state.readCardsRequestId === requestId
        ) {
          state.readCardsStatus = "idle";
          state.cards = action.payload;
          state.readCardsRequestId = undefined;
        }
      })
      .addCase(readCardsCmd.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.readCardsStatus === "pending" &&
          state.readCardsRequestId === requestId
        ) {
          state.readCardsStatus = "idle";
          // TODO log errors
          // state.error = action.error
          state.readCardsRequestId = undefined;
        }
      })
      // CREATE CARDS
      .addCase(createCardsCmd.pending, (state, action) => {
        if (state.createCardsStatus === "idle") {
          state.createCardsStatus = "pending";
          state.createCardsRequestId = action.meta.requestId;
        }
      })
      .addCase(createCardsCmd.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.createCardsStatus === "pending" &&
          state.createCardsRequestId === requestId
        ) {
          // once finished use a useEffect to reload decks
          state.createCardsStatus = "idle";
          state.createCardsRequestId = undefined;
        }
      })
      .addCase(createCardsCmd.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.createCardsStatus === "pending" &&
          state.createCardsRequestId === requestId
        ) {
          state.createCardsStatus = "idle";
          // TODO log errors
          // state.error = action.error
          state.createCardsRequestId = undefined;
        }
      });
  },
});

export default cardSlice.reducer;
// export async thunk action
