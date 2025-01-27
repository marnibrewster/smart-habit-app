import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import styles from "./Auth.module.scss";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const signUp = async () => {
    try {
      // Sign up the user
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
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
          first_name: firstName,
          last_name: lastName,
          role: "non-admin",
        });

        if (insertError) {
          setError(
            `User created but failed to add to the database: ${insertError.message}`
          );
          return;
        }
      }
      // Redirect to home page after successful sign up
      window.location.href = "/";
    } catch (err) {
      console.log({ err });
      setError("Unexpected error occurred during signup" + err);
    }
  };

  return (
    <div className={styles.authContainer}>
      <TextField
        required
        id="outlined-required"
        label="First name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Last name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={signUp} variant="contained">
        Sign Up
      </Button>
      {error && <p>{error}</p>}
      <Link href={"/login"}>Login</Link>
    </div>
  );
}
