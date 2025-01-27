import LogHabit from "../../components/LogHabit";
import styles from "./log-habit.module.scss";

export default function LogHabitPage() {
  return (
    <div className={styles.logHabitContainer}>
      <LogHabit />
    </div>
  );
}
