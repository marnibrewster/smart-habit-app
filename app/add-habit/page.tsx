import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Form from "../components/Form";
import styles from "./add-habit.module.scss";

export default function AddHabitPage() {
  const supabase = createServerComponentClient({ cookies });

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return <div>You need to log in to access this page.</div>;
    }

    return (
      <div className={styles.addHabitContainer}>
        <Form />
      </div>
    );
  };

  return fetchUser();
}
