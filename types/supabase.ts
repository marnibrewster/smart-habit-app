export type User = {
  id: string;
  email: string;
  created_at: string;
  role: string;
  first_name: string;
  last_name: string;
};

export type Habit = {
  id: string;
  user_id: string;
  name: string;
  target_streak: number;
  created_at: string;
};

export type HabitLog = {
  id: string;
  habit_id: string;
  date: string;
  completed: boolean;
  created_at: string;
  comment?: string;
};
