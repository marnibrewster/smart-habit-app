"use client";

import { Habit } from "@/types/supabase";
import { useCallback, useEffect, useState } from "react";

const HabitsList = () => {
  const [habitList, setHabitList] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getHabits = useCallback(async () => {
    const response = await fetch(`/api/habits`);

    try {
      const data = await response?.json();
      if (!response.ok) {
        console.error("Error fetching habits:", data.error);
        setError(data.error);
      } else {
        setIsLoading(false);
        setError(null);
        setHabitList(data);
      }
    } catch (error) {
      console.error("Error fetching habits:", error);
      setError("Failed to fetch habits");
    }
  }, []);

  useEffect(() => {
    if (habitList?.length === 0) {
      getHabits();
    }
  }, [getHabits, habitList?.length]);

  return (
    <div>
      {!isLoading && !error && (
        <>
          {habitList && habitList?.length > 0 ? (
            <>
              List of habits
              <table>
                <tr>
                  <th>Habit</th>
                  <th>Target Streak</th>
                  <th>Created At</th>
                </tr>
                {habitList?.map((habit) => (
                  <tr key={habit.id}>
                    <td>{habit.name}</td>
                    <td>{habit.target_streak}</td>

                    <td>{new Date(habit.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </table>
            </>
          ) : (
            <div>No habits to display</div>
          )}
        </>
      )}
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default HabitsList;
