import styles from "./practicedCards.module.scss";
import React from "react";

interface PracticedCardsProps {
  learning?: TemplateProps["cards"];
  newCards?: TemplateProps["cards"];
}

function PracticedCards({ learning, newCards }: PracticedCardsProps) {
  return (
    <>
      {learning ? <Template cards={learning} title="Learning" /> : null}
      {newCards ? <Template cards={newCards} title="New cards" /> : null}
    </>
  );
}

interface TemplateProps {
  title: string;
  cards: {
    front: string;
    back: string;
  }[];
}

function Template({ title, cards }: TemplateProps) {
  return (
    <div className={styles.templateContainer}>
      <span className={styles.templateTitle}>{title}</span>
      <div className={styles.templateGrid}>
        {cards.map((x, i) => {
          return (
            <React.Fragment key={i}>
              <span key={`${i}-1`}>{x.front}</span>
              <span key={`${i}-2`}>{x.back}</span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default PracticedCards;
