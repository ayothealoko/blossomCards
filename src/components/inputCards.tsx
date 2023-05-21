import Button from "./button";
import styles from "./inputCards.module.scss";

export interface InputCardsProps {
  cards: CardPropType[];
}

type CardPropType = Omit<InputRowProps, "num">;

function InputCards({ cards }: InputCardsProps) {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.term}>Term</span>
        <span className={styles.def}>Definition</span>
        {cards.map((x, i) => {
          return <InputRow key={i} {...x} num={i + 1} />;
        })}
      </div>
      <div className={styles.buttonTray}>
        <Button variant={2} text="Add card" />
        <Button variant={1} text="Done" />
      </div>
    </>
  );
}

export interface InputRowProps {
  num: number;
  front: string;
  back: string;
}

function InputRow({ num, front, back }: InputRowProps) {
  return (
    <>
      <span className={styles.number}>{`${num}.`}</span>
      <input type="text" value={front} className={styles.input} />
      <input type="text" value={back} className={styles.input} />
      <button className={styles.cancel}></button>
    </>
  );
}

export default InputCards;
