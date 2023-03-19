import InputCards from "../../../components/inputCards";
import MainH1 from "../../../components/mainH1";
import useGetDeckName from "../../../hooks/getDeckNanme";

function Deck() {
  const deck = useGetDeckName();
  return (
    <>
      <MainH1 text={deck} />
      <InputCards cards={[{ num: 1 }, { num: 2 }, { num: 3 }]} />
    </>
  );
}

export default Deck;
