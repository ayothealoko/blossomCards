import clsx from "clsx";
import styles from "./button.module.scss";

interface ButtonProps {
  text: string;
  variant: 1 | 2;
}

function Button({ text, variant }: ButtonProps) {
  return (
    <button
      className={clsx({
        [styles.container]: true,
        [styles.variant1]: variant === 1,
        [styles.variant2]: variant === 2,
      })}
    >
      {text}
    </button>
  );
}

export default Button;
