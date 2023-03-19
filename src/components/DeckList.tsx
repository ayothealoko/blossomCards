import Link from "next/link";
import Button from "./button";
import styles from "./decklist.module.scss";

export interface DeckListProps {
  // change deckId? to stict
  list: { link: string; title: string; deckId?: string }[];
}

function DeckList({ list }: DeckListProps) {
  return (
    <>
      <div className={styles.container}>
        {list.map((x, i) => {
          return (
            <Link key={i} href={x.link}>
              {x.title}
            </Link>
          );
        })}
      </div>
      <div>
        <Button text="Create Deck" variant={2} />
      </div>
    </>
  );
}

export default DeckList;
