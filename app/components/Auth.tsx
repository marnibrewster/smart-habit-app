import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import styles from "./Auth.module.scss";
import Link from "next/link";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = async () => {
    try {
      // Sign up the user
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      const user = signUpData.user;

      if (user) {
        // Insert the user into the `users` table
        const { error: insertError } = await supabase.from("users").insert({
          id: user.id,
          email: user.email,
        });

        if (insertError) {
          setError(
            `User created but failed to add to the database: ${insertError.message}`
          );
          return;
        }

        // Success: Handle any post-signup actions
        console.log("User successfully signed up and added to the database");
      }
    } catch (err) {
      console.log({ err });
      setError("Unexpected error occurred during signup");
    }
  };

  return (
    <div className={styles.authContainer}>
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUp}>Sign Up</button>
      {error && <p>{error}</p>}
      <Link href={"/login"}>Login</Link>
    </div>
  );
}
