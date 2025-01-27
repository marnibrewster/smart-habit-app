import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import styles from "./habits.module.scss";
import HabitsList from "../components/HabitsList";

export default function HabitsPage() {
  const supabase = createServerComponentClient({ cookies });

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return <div>You need to log in to access this page.</div>;
    }

    return (
      <div className={styles.habitContainer}>
        <HabitsList />
      </div>
    );
  };

  return fetchUser();
}
