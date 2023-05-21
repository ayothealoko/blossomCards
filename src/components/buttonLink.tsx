import clsx from "clsx";
import styles from "./buttonLink.module.scss";
import Link from "next/link";

interface ButtonProps {
  text: string;
  href: string;
  variant: 1 | 2;
}

function ButtonLink({ text, variant, href }: ButtonProps) {
  return (
    <Link
      href={href}
      className={clsx({
        [styles.container]: true,
        [styles.variant1]: variant === 1,
        [styles.variant2]: variant === 2,
      })}
    >
      {text}
    </Link>
  );
}

export default ButtonLink;
