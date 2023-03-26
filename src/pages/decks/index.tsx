import { useEffect } from "react";
import { useSelector } from "react-redux";
import DeckList from "../../components/DeckList";
import MainH1 from "../../components/mainH1";
import { useAppDispatch } from "../../store/dispatch";
import type { RootState } from "../../store/store";
import {
  createDecksCmd,
  deleteDecksCmd,
  showDecksCmd,
  updateDecksCmd,
} from "../../slices/decksSlice";

function Decks() {
  const decks = useSelector((state: RootState) => state.decks.deckList);
  const updateDeckStatus = useSelector(
    (state: RootState) => state.decks.updateDeckStatus
  );

  const createDeckStatus = useSelector(
    (state: RootState) => state.decks.createDeckStatus
  );

  const deleteDeckStatus = useSelector(
    (state: RootState) => state.decks.deleteDeckStatus
  );
  const dispatch = useAppDispatch();

  // updateDeckStatus so deck reloads once update is sucessfull
  useEffect(() => {
    if (
      updateDeckStatus === "idle" &&
      createDeckStatus === "idle" &&
      deleteDeckStatus === "idle"
    ) {
      dispatch(showDecksCmd());
    }
  }, [updateDeckStatus, createDeckStatus, deleteDeckStatus]);

  return (
    <>
      <MainH1 text="Decks" />
      <DeckList
        editAction={updateDecksCmd}
        createAction={createDecksCmd}
        deleteAction={deleteDecksCmd}
        list={decks}
      />
    </>
  );
}

export default Decks;
