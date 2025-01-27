import { User } from "@/types/supabase";
import { useState, useEffect, useMemo } from "react";

const useUser = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchRole = async () => {
      const res = await fetch("/api/get-user", { method: "GET" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }
      setUser(data);
    };

    fetchRole();
  }, []);

  const memoizedValue = useMemo(() => {
    return { user, error };
  }, [user, error]);

  return memoizedValue;
};

export default useUser;
