import Button from "./button";
import styles from "./cardComp.module.scss";

function CardComp() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.cardP}>Card</p>
      </div>
      <span className={styles.text}>
        click or press the spacebar to see the definition{" "}
      </span>
      <div>
        <Button text="correct" variant={2} />
        <Button text="wrong" variant={2} />
      </div>
    </div>
  );
}

export default CardComp;
