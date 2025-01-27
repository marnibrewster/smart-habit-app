"use client";

import { usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useMemo, useState } from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import useUser from "../hooks/useUser";

type FooterLink = {
  label: string;
  url?: string;
  onClick?: () => void;
};

const Footer = () => {
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const { user } = useUser();

  const links = useMemo<FooterLink[]>(
    () => [
      { label: "Home", url: "/" },
      ...(!user ? [{ label: "Login", url: "/login" }] : []),
      ...(!user ? [{ label: "Sign Up", url: "/signup" }] : []),
      ...(user?.role === "admin"
        ? [{ label: "Add Habit", url: "/add-habit" }]
        : []),
      { label: "Habits", url: "/habits" },
    ],
    [user]
  );

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

  const isActive = useCallback(
    (link: FooterLink) => {
      if (link.url) {
        return pathname === link.url;
      }

      return false;
    },
    [pathname]
  );

  return (
    <div className={styles.footerContainer}>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.url || "#"}
          onClick={link.onClick}
          className={isActive(link) ? styles.activeLink : undefined}
        >
          {link.label}
        </Link>
      ))}
      <Link href="#" onClick={handleLogout}>
        Logout
      </Link>
      {logoutError}
    </div>
  );
};

export default Footer;
