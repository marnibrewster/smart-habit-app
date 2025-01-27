"use client";

import Auth from "../components/Auth";
import styles from "./signup.module.scss";

export default function SignUpPage() {
  return (
    <div className={styles.signUpContainer}>
      <Auth />
    </div>
  );
}
