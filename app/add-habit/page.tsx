import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Form from "../components/Form";
import styles from "./add-habit.module.scss";

export default async function AddHabitPage() {
  const awaitedCookies = await cookies;
  const supabase = createServerComponentClient({ cookies: awaitedCookies });

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
