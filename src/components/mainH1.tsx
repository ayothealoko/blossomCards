import styles from "./mainH1.module.scss";
import { ReactElement } from "react";

interface MainH1Props {
  text: string;
}

function MainH1({ text }: MainH1Props): ReactElement {
  return <h1 className={styles.container}>{text}</h1>;
}

export default MainH1;
