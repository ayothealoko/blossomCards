import Link from "next/link";
import Button from "./button";
import styles from "./decklist.module.scss";
import edit from "../assets/edit.svg";
import cancel from "../assets/cancel.svg";
import Image from "next/image";
import { AnyAction, AsyncThunkAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { useAppDispatch } from "../store/dispatch";

export interface DeckListProps {
  // change decks_id? to stict
  list: DeckRow[];
  editAction: EditActionType;
  createAction: CreateActionType;
  deleteAction: DeleteActionType;
}

type EditActionType = (
  edit: DeckRow
) => AnyAction | AsyncThunkAction<any, any, any>;
type CreateActionType = (
  title: string
) => AnyAction | AsyncThunkAction<any, any, any>;
type DeleteActionType = (
  deckId: number
) => AnyAction | AsyncThunkAction<any, any, any>;

function DeckList({
  list,
  editAction,
  createAction,
  deleteAction,
}: DeckListProps) {
  // decks_id of deck beign edited
  const [edit, setEdit] = useState<number | null>();
  const [isAddDeck, setIsAddDeck] = useState<boolean>(false);

  const deck = list.map((x, i) => {
    return x.decks_id === edit ? (
      <DeckRowEdit key={i} {...x} editAction={editAction} setEdit={setEdit} />
    ) : (
      <DeckRowDefault
        deleteAction={deleteAction}
        setEdit={setEdit}
        key={i}
        {...x}
      />
    );
  });

  if (isAddDeck) {
    const length = deck.length;
    deck.push(
      <DeckRowCreate
        key={length}
        createAction={createAction}
        setIsAddDeck={setIsAddDeck}
      />
    );
  }

  const handleAddDeck = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEdit(null);
    setIsAddDeck(true);
  };

  return (
    <>
      <div className={styles.container}>{deck}</div>
      <div>
        <Button onClick={handleAddDeck} text="Create Deck" variant={2} />
      </div>
    </>
  );
}

export interface DeckRow {
  title: string;
  link: string;
  decks_id: number;
}

type SetEditType = (edit: number) => void;

function DeckRowDefault({
  title,
  link,
  decks_id,
  setEdit,
  deleteAction,
}: DeckRow & { setEdit: SetEditType; deleteAction: DeleteActionType }) {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.row}>
      <Link href={"./decks/" + link}>{title}</Link>
      <div>
        <button
          onClick={() => {
            setEdit(decks_id);
          }}
          className={styles.deckButton}
        >
          <Image src={edit} alt="edit button" />
        </button>
        <button
          onClick={() => {
            dispatch(deleteAction(decks_id));
          }}
          className={styles.deckButton}
        >
          <Image src={cancel} alt="delete button" />
        </button>
      </div>
    </div>
  );
}

function DeckRowEdit({
  title,
  decks_id,
  editAction,
  setEdit,
}: DeckRow & { editAction: EditActionType; setEdit: SetEditType }) {
  const [inputTitle, setInputTitle] = useState(title);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setInputTitle(title);
  };

  // handle done click
  // TODO sanitize user inputs
  const handleClick = (_: React.MouseEvent<HTMLButtonElement>): void => {
    const edit: DeckRow = {
      decks_id,
      title: inputTitle.trim(),
      link: inputTitle.trim(),
    };

    setEdit(null);
    if (inputTitle !== "") {
      dispatch(editAction(edit));
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      const edit: DeckRow = {
        decks_id,
        title: inputTitle,
        link: inputTitle,
      };

      setEdit(null);
      if (inputTitle !== "") {
        dispatch(editAction(edit));
      }
    }
  };

  return (
    <div className={styles.edit}>
      <input
        autoFocus
        onKeyDown={handleEnter}
        type="text"
        onChange={handleChange}
        value={inputTitle}
      />
      <button onClick={handleClick} className={styles.deckButton}>
        done
      </button>
    </div>
  );
}

interface DeckRowCreateProps {
  createAction: CreateActionType;
  setIsAddDeck: (bool: boolean) => void;
}
function DeckRowCreate({ createAction, setIsAddDeck }: DeckRowCreateProps) {
  const [inputTitle, setInputTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setInputTitle(title);
  };

  // handle done click
  // TODO sanitize user inputs
  const handleClick = (_: React.MouseEvent<HTMLButtonElement>): void => {
    setIsAddDeck(false);
    if (inputTitle !== "") {
      dispatch(createAction(inputTitle.trim()));
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      setIsAddDeck(false);
      if (inputTitle !== "") {
        dispatch(createAction(inputTitle.trim()));
      }
    }
  };
  return (
    <div className={styles.edit}>
      <input
        autoFocus
        type="text"
        onKeyDown={handleEnter}
        onChange={handleChange}
        value={inputTitle}
      />
      <button onClick={handleClick} className={styles.deckButton}>
        done
      </button>
    </div>
  );
}

export default DeckList;
