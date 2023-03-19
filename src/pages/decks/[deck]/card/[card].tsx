import CardComp from "../../../../components/card";
import MainH1 from "../../../../components/mainH1";
import useGetDeckName from "../../../../hooks/getDeckNanme";

function Card() {
  const deck = useGetDeckName();
  return (
    <>
      <MainH1 text={deck} />
      <CardComp />
    </>
  );
}

export default Card;
