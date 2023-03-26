import clsx from "clsx";
import styles from "./button.module.scss";

interface ButtonProps {
  text: string;
  variant: 1 | 2;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ text, variant, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
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
