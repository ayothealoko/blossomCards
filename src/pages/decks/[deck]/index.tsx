import Button from "../../../components/button";
import ButtonLink from "../../../components/buttonLink";
import MainH1 from "../../../components/mainH1";
import PracticedCards from "../../../components/practicedCards";
import useGetDeckName from "../../../hooks/getDeckNanme";
import useUrl from "../../../hooks/getUrl";
import styles from "./index.module.scss";

function Index() {
  const deck = useGetDeckName();
  const url = useUrl();
  return (
    <>
      <MainH1 text={deck} />
      <div className={styles.buttonTray}>
        <ButtonLink href="#" text="Start Studying" variant={1} />
        <Button text="New Study Session" variant={2} />
        <ButtonLink href={url + "/create"} text="Edit Deck" variant={2} />
      </div>
      <PracticedCards learning={[{ front: "hello", back: "Hallo" }]} />
    </>
  );
}

export default Index;
