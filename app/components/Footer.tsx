"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
  const supabase = createClientComponentClient();
  const [links, setLinks] = useState<
    {
      label: string;
      url?: string;
      onClick?: () => void;
    }[]
  >([
    { label: "Home", url: "/" },
    { label: "Login", url: "/login" },
    { label: "Sign Up", url: "/signup" },
    { label: "Add Habit", url: "/add-habit" },
    { label: "Habits", url: "/habits" },
  ]);
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setLogoutError(error.message);
    } else {
      setLogoutError("");
      window.location.href = "/";
    }
  }, [supabase.auth]);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setLinks([
          { label: "Home", url: "/" },
          { label: "Add Habit", url: "/add-habit" },
          { label: "Habits", url: "/habits" },
          { label: "Logout", onClick: handleLogout },
        ]);
      }
    };
    checkUser();
  }, [handleLogout, supabase.auth]);

  return (
    <div className={styles.footerContainer}>
      {links.map((link, index) => (
        <Link key={index} href={link.url || "#"} onClick={link.onClick}>
          {link.label}
        </Link>
      ))}
      {logoutError}
    </div>
  );
};

export default Footer;
