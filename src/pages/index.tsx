// Notes use "@tauri-apps/api/tauri" not "@tauri-apps/api"
// They will both import but "@tauri-apps/api"
// fails on "npm run tauri dev" with window undefined
import * as React from "react";
import { useSelector } from "react-redux";
import HabitTracker, { HabitTrackerProps } from "../components/habitTracker";
import MainH1 from "../components/mainH1";
import { RootState } from "../store/store";

function App() {
  const habitTrackerProps: HabitTrackerProps = useSelector(
    (state: RootState) => state.index.habitTracker
  );

  return (
    <>
      <MainH1 text="Dashboard" />
      <HabitTracker {...habitTrackerProps} />
    </>
  );
}

export default App;
