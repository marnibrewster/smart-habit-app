"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./login.module.scss";

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        window.location.href = "/";
      }
    };
    checkUser();
  }, [supabase.auth]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      window.location.href = "/";
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <div className={styles.loginForm}>
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
        <Button
          className={styles.loginButton}
          onClick={handleLogin}
          variant="contained"
        >
          Login
        </Button>
      </div>
      {error && <p>{error}</p>}
      <Link href={"/signup"}>Create account</Link>
    </div>
  );
}
