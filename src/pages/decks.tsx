import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DeckList from "../components/DeckList";
import MainH1 from "../components/mainH1";
import { useAppDispatch } from "../store/dispatch";
import type { RootState } from "../store/store";
import { showDecksCmd } from "./decksSlice";

function Decks() {
  const decks = useSelector((state: RootState) => state.decks.deckList);
  console.log(decks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showDecksCmd());
  }, []);

  return (
    <>
      <MainH1 text="Decks" />
      <DeckList list={decks} />
      <Link href="./decks/Default Deck/card/1234">CARD</Link>
    </>
  );
}

export default Decks;
