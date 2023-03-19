import clsx from "clsx";
import { ReactElement } from "react";
import styles from "./habitTracker.module.scss";

const WEEKDAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export interface HabitTrackerProps {
  grid: DaysGridProps["dayBoxMatrix"];
  streakDays: number;
}

function HabitTracker({ grid, streakDays }: HabitTrackerProps): JSX.Element {
  return (
    <div className={styles.container}>
      <p className={styles.streakCount}>
        {dayCount(streakDays)} <br /> streak
      </p>
      <div className={styles.wrapper}>
        <div className={styles.habitTrackerWeekdays}>
          {WEEKDAY.map((x, i) => {
            return <span key={i}>{x}</span>;
          })}
        </div>
        <DaysGrid dayBoxMatrix={grid} />
      </div>
    </div>
  );
}

function dayCount(number: number): string {
  if (number === 1 || number < 1) {
    return `${number} day`;
  }

  return `${number} days`;
}

interface DaysGridProps {
  dayBoxMatrix: DayBoxProps[][];
}

function DaysGrid({ dayBoxMatrix }: DaysGridProps): JSX.Element {
  return (
    <div className={styles.daysGridContainer}>
      {dayBoxMatrix.map((x, i) => {
        return <DayRow key={i} boxProps={dayBoxMatrix[i]} />;
      })}
    </div>
  );
}

interface DayRowProps {
  boxProps: DayBoxProps[];
}

function DayRow({ boxProps }: DayRowProps): JSX.Element {
  return (
    <div className={styles.dayRowContainer}>
      {boxProps.map((x, i) => {
        return <DayBox key={i} {...boxProps[i]} />;
      })}
    </div>
  );
}

function rowDates(lastWeekDay: Date, columnNum: number): Date[] {
  let rowDates = [];

  for (let week = 0; week < columnNum; week++) {
    let date = new Date(lastWeekDay.valueOf());
    date.setDate(-1 * week * 7);
    rowDates.push(date);
  }

  rowDates = rowDates.reverse();

  return rowDates;
}

interface DayBoxProps {
  isActive: boolean;
  month?: number;
}

function DayBox({ isActive, month }: DayBoxProps) {
  const el = (
    <div
      className={clsx({
        [styles.dayBox]: true,
        [styles.dayBoxActive]: isActive,
      })}
    ></div>
  );

  if (month) {
    return (
      <div className={styles.dayBoxMonthContainer}>
        <span className={styles.dayBoxMonthText}>{MONTHS[month]}</span>
        {el}
      </div>
    );
  }

  return el;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function isMondayInMonthStartWeek(date: Date): boolean {
  // check if day is monday
  if (date.getDay() !== 1) {
    return false;
  }

  // check if first day of month
  if (date.getDate() === 1) {
    return true;
  }

  // check if next monday is a new month not starting on the 1st
  let nextMonday = new Date(date.valueOf());
  nextMonday.setDate(nextMonday.getDate() + 7);

  if (nextMonday.getMonth() !== date.getMonth() && nextMonday.getDate() !== 1) {
    return true;
  }

  return false;
}

export default HabitTracker;
