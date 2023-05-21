import { useEffect } from "react";
import DeckList from "../../components/DeckList";
import MainH1 from "../../components/mainH1";
import { useAppDispatch, useAppSelector } from "../../store/dispatch";
import {
  createDecksCmd,
  deleteDecksCmd,
  showDecksCmd,
  updateDecksCmd,
} from "../../slices/decksSlice";

function Decks() {
  const decks = useAppSelector((state) => state.decks.deckList);
  const updateDeckStatus = useAppSelector(
    (state) => state.decks.updateDeckStatus
  );

  const createDeckStatus = useAppSelector(
    (state) => state.decks.createDeckStatus
  );

  const deleteDeckStatus = useAppSelector(
    (state) => state.decks.deleteDeckStatus
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
