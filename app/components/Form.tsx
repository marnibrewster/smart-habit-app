"use client";

import { useCallback, useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import styles from "./Form.module.scss";
import useUser from "../hooks/useUser";
import { User } from "@/types/supabase";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Form = () => {
  const [habitName, setHabitName] = useState("");
  const [streakLength, setStreakLength] = useState<number>(7);
  const [message, setMessage] = useState<string | null>(null);
  const [userIds, setUserIds] = useState<string[]>([]);
  const { user } = useUser();
  const [userData, setUserData] = useState<User[] | null>(null);

  const handleChange = (event: SelectChangeEvent<typeof userIds>) => {
    const {
      target: { value },
    } = event;
    setUserIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    if (user && user?.role !== "admin") {
      window.location.href = "/";
    }
  }, [user]);

  const createHabit = useCallback(async () => {
    if (habitName.length > 5) {
      const response = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: habitName,
          target_streak: streakLength,
          user_ids: userIds,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error creating habit:", data.error);
      } else {
        setMessage("Habit added!");
        setHabitName("");
        setStreakLength(7);
        setUserIds([]);
      }
    } else {
      console.error("Habit name must be longer than 5 characters.");
    }
  }, [habitName, streakLength, userIds]);

  const getUsers = useCallback(async () => {
    const response = await fetch("/api/get-users");
    const data = await response.json();

    if (!response.ok) {
      console.error("Error fetching users:", data.error);
    } else {
      setUserData(data);
    }
  }, []);

  useEffect(() => {
    if (!userData) {
      getUsers();
    }
  }, [getUsers, userData]);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  const firstAndLastName = useCallback(
    (userId: string) => {
      const user = userData?.find((user) => user.id === userId);
      return user ? `${user.first_name} ${user.last_name}` : "";
    },
    [userData]
  );

  return (
    <>
      <div> Add a habit</div>
      <div className={styles.formContainer}>
        <div>
          <TextField
            required
            id="outlined-required"
            type="text"
            label="Name of habit (required)"
            defaultValue="Create a habit to track"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            type="number"
            label="Target streak (days)"
            defaultValue="7"
            value={streakLength}
            onChange={(e) => setStreakLength(Number(e.target.value))}
          />
          <FormControl sx={{ m: 1, width: 500 }}>
            <InputLabel id="user-chip-label">Users</InputLabel>
            <Select
              labelId="user-chip-label"
              id="user-chip"
              multiple
              value={userIds}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={firstAndLastName(value)} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {userData?.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.first_name + " " + user.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button
          onClick={createHabit}
          disabled={!habitName || !streakLength}
          variant="contained"
        >
          Submit
        </Button>
      </div>
      <Snackbar
        open={!!message}
        onClose={() => setMessage(null)}
        message={message}
      />
    </>
  );
};

export default Form;
