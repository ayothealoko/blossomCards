import styles from "./practicedCards.module.scss";

interface PracticedCardsProps {
  learning?: TemplateProps["cards"];
  newCards?: TemplateProps["cards"];
}

function PracticedCards({ learning, newCards }: PracticedCardsProps) {
  return (
    <>
      {learning ? <Template cards={learning} title="Learing" /> : null}
      {newCards ? <Template cards={newCards} title="new Cards" /> : null}
    </>
  );
}

interface TemplateProps {
  title: string;
  cards: {
    term: string;
    definition: string;
  }[];
}

function Template({ title, cards }: TemplateProps) {
  return (
    <div className={styles.templateContainer}>
      <span className={styles.templateTitle}>{title}</span>
      <div className={styles.templateGrid}>
        {cards.map((x, i) => {
          return (
            <>
              <span key={`${i}-1`}>{x.term}</span>
              <span key={`${i}-2`}>{x.definition}</span>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default PracticedCards;
