"use client";

import Link from "next/link";
import useUser from "../hooks/useUser";

const Links = () => {
  const { user } = useUser();

  return (
    <div>
      <h2>Links</h2>
      <ul>
        {user?.role === "admin" && (
          <li>
            <Link href="/add-habit">Add Habit</Link>
          </li>
        )}
        <li>
          <Link href="/habits">Habits</Link>
        </li>
      </ul>
    </div>
  );
};

export default Links;
