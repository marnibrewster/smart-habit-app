"use client";

import { HabitLog } from "@/types/supabase";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const LogHabit = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [habitState, setHabitState] = useState(false);
  const [habitComment, setHabitComment] = useState("");
  const { slug } = useParams();
  const [isDisabled, setIsDisabled] = useState(true);

  const getHabit = useCallback(async () => {
    if (slug) {
      const response = await fetch(`/api/logs/${slug}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      try {
        const data = await response?.json();
        if (!response.ok) {
          console.error("Error fetching habits:", data.error);
          setError(data.error);
        } else {
          setIsDisabled(
            data.filter((habit: HabitLog) => {
              const today = new Date();
              const habitDate = new Date(habit.date);
              return (
                habitDate.getDate() === today.getDate() &&
                habitDate.getMonth() === today.getMonth() &&
                habitDate.getFullYear() === today.getFullYear()
              );
            }).length > 0
          );
        }
      } catch (error) {
        setError("Failed to fetch habits" + error);
      }
    }
  }, [slug]);

  useEffect(() => {
    getHabit();
  }, [getHabit]);

  const logHabit = useCallback(async () => {
    if (slug) {
      const response = await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          habit_id: slug,
          completed: habitState,
          comment: habitComment,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error logging habit:", data.error);
        setError(data.error);
      } else {
        setMessage("Habit logged successfully!");
        setHabitState(false);
        setHabitComment("");
        getHabit();
      }
    }
  }, [slug, habitState, habitComment, getHabit]);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" gutterBottom>
        Log habit
      </Typography>
      <FormControl>
        {isDisabled ? (
          <FormLabel id="task-completion">
            You have already logged this task today. Log again tomorrow!
          </FormLabel>
        ) : (
          <FormLabel id="task-completion">Did you complete the task?</FormLabel>
        )}
        <RadioGroup
          row
          aria-labelledby="task-completion"
          defaultValue="incomplete"
          name="radio-buttons-group"
          onChange={(e) => setHabitState(e.target.value === "complete")}
        >
          <FormControlLabel
            value="complete"
            control={<Radio />}
            label="Completed"
            disabled={isDisabled}
          />
          <FormControlLabel
            value="incomplete"
            control={<Radio />}
            label="Did not complete"
            disabled={isDisabled}
          />
        </RadioGroup>
      </FormControl>
      <TextField
        id="comment"
        type="text"
        label="Comment about the habit (optional)"
        value={habitComment}
        onChange={(e) => setHabitComment(e.target.value)}
        disabled={isDisabled}
      />
      <Button
        variant="contained"
        onClick={() => logHabit()}
        disabled={isDisabled}
      >
        Submit
      </Button>
      <Snackbar
        open={!!message || !!error}
        onClose={() => {
          setMessage(null);
          setError("");
        }}
        message={message || error}
      />
    </Stack>
  );
};

export default LogHabit;
