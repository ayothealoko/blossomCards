import Button from "../../../components/button";
import MainH1 from "../../../components/mainH1";
import PracticedCards from "../../../components/practicedCards";
import useGetDeckName from "../../../hooks/getDeckNanme";
import styles from "./index.module.scss";

function Index() {
  const deck = useGetDeckName();
  return (
    <>
      <MainH1 text={deck} />
      <div className={styles.buttonTray}>
        <Button text="Start Studying" variant={1} />
        <Button text="Edit Deck" variant={2} />
        <Button text="Show All Cards" variant={2} />
      </div>
      <PracticedCards learning={[{ term: "hello", definition: "Hallo" }]} />
    </>
  );
}

export default Index;
