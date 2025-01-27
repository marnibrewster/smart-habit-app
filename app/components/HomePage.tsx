"use client";

import useUser from "../hooks/useUser";

const HomePage = () => {
  const { user } = useUser();

  return <div>Welcome, {user?.first_name}!</div>;
};

export default HomePage;
