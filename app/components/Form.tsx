"use client";

import { useCallback, useState } from "react";
import styles from "./Form.module.scss";

const user_id = "123e4567-e89b-12d3-a456-426614174000";

const Form = () => {
  const [habitName, setHabitName] = useState("");
  const [streakLength, setStreakLength] = useState<number>(7);
  // const [isHabitCompleted, setIsHabitString] = useState(false);

  const createHabit = useCallback(async () => {
    if (habitName.length > 5) {
      const response = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          name: habitName,
          target_streak: streakLength,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error creating habit:", data.error);
      }
    } else {
      console.error("Habit name must be longer than 5 characters.");
    }
  }, [habitName, streakLength]);

  // const logHabit = useCallback(async (habit_id: string, completed: boolean) => {
  //   const response = await fetch("/api/logs", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       habit_id,
  //       date: new Date().toISOString().split("T")[0], // Current date
  //       completed,
  //     }),
  //   });

  //   const data = await response.json();
  //   if (!response.ok) {
  //     console.error("Error logging habit:", data.error);
  //   } else {
  //     console.log("Habit logged successfully:", data);
  //   }
  // }, []);

  return (
    <div className={styles.formContainer}>
      <input
        type="text"
        placeholder="Create a habit to track"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target streak (days)"
        value={streakLength ?? 7}
        onChange={(e) => setStreakLength(Number(e.target.value))}
      />
      <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        onClick={createHabit}
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
