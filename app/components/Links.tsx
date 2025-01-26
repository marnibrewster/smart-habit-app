"use client";

import Link from "next/link";

const Links = () => {
  return (
    <div>
      <h2>Links</h2>
      <ul>
        <li>
          <Link href="/add-habit">Add Habit</Link>
        </li>
        <li>
          <Link href="/habits">Habits</Link>
        </li>
      </ul>
    </div>
  );
};

export default Links;
