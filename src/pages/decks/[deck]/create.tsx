import { useEffect, useState } from "react";
import InputCards from "../../../components/inputCards";
import MainH1 from "../../../components/mainH1";
import useGetDeckName from "../../../hooks/getDeckNanme";
import {
  createCardsCmd,
  getDecksIdCmd,
  readCardsCmd,
} from "../../../slices/cardSlice";
import { useAppDispatch, useAppSelector } from "../../../store/dispatch";

function Create() {
  const [dedupeCreateCard, setDedupeCreateCard] = useState<number>(0);
  const deck = useGetDeckName();
  const dispatch = useAppDispatch();
  const getDecksIdStatus = useAppSelector(
    (state) => state.cards.getDecksIdStatus
  );

  const readCardsStatus = useAppSelector(
    (state) => state.cards.readCardsStatus
  );
  const createCardsStatus = useAppSelector(
    (state) => state.cards.createCardsStatus
  );
  const decksId = useAppSelector((state) => state.cards.decksId);
  const cards = useAppSelector((state) => state.cards.cards);

  useEffect(() => {
    if (getDecksIdStatus === "idle") dispatch(getDecksIdCmd(deck));
  }, [deck]);

  useEffect(() => {
    if (
      readCardsStatus === "idle" &&
      getDecksIdStatus === "idle" &&
      createCardsStatus === "idle" &&
      decksId !== undefined
    ) {
      dispatch(readCardsCmd(decksId));
    }
  }, [decksId, createCardsStatus]);

  useEffect(() => {
    if (
      cards !== undefined &&
      cards.length === 0 &&
      decksId !== undefined &&
      dedupeCreateCard < 4
    ) {
      setDedupeCreateCard((v) => ++v);
      dispatch(createCardsCmd(["", "", decksId]));
    }
  }, [cards]);

  console.log(dedupeCreateCard, cards, decksId);
  return (
    <>
      <MainH1 text={deck} />
      <InputCards cards={cards ? cards : []} />
    </>
  );
}

export default Create;
