"use client";

import { Habit } from "@/types/supabase";
import { useCallback, useEffect, useMemo, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import useUser from "../hooks/useUser";
import { Button } from "@mui/material";
import Link from "next/link";

const HabitsList = () => {
  const [habitList, setHabitList] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { user } = useUser();
  const isAdmin = useMemo(() => user?.role === "admin", [user]);

  const getHabits = useCallback(async () => {
    const response = await fetch(`/api/habits`);

    try {
      const data = await response?.json();
      if (!response.ok) {
        console.error("Error fetching habits:", data.error);
        setError(data.error);
      } else {
        setIsLoading(false);
        setError(null);
        setHabitList(data);
      }
    } catch (error) {
      console.error("Error fetching habits:", error);
      setError("Failed to fetch habits");
    }
  }, []);

  const handleEdit = useCallback(async (habitId: string) => {}, []);

  const deleteHabit = useCallback(
    async (habitId: string) => {
      const response = await fetch("/api/habits", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: habitId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error deleting habit:", data.error);
        setError("Error deleting habit");
      } else {
        setMessage("Habit deleted!");
        getHabits();
      }
    },
    [getHabits]
  );

  useEffect(() => {
    if (habitList?.length === 0) {
      getHabits();
    }
  }, [getHabits, habitList?.length]);

  return (
    <div>
      {!isLoading && !error && (
        <>
          {habitList && habitList?.length > 0 ? (
            <>
              List of habits
              <TableContainer>
                <Table aria-label="habit table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Habit name</TableCell>
                      <TableCell>Target streak</TableCell>
                      <TableCell>Created at</TableCell>
                      {<TableCell />}
                      {isAdmin && <TableCell />}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {habitList?.map((habit) => (
                      <TableRow key={habit.id}>
                        <TableCell>{habit.name}</TableCell>
                        <TableCell>{habit.target_streak}</TableCell>
                        <TableCell>
                          {new Date(habit.created_at).toLocaleDateString()}
                        </TableCell>
                        {isAdmin ? (
                          <TableCell>
                            <IconButton>
                              <Edit onClick={() => handleEdit(habit.id)} />
                            </IconButton>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <Link
                              color="primary"
                              href={`/log-habit/${habit.id}`}
                            >
                              Log
                            </Link>
                          </TableCell>
                        )}
                        {isAdmin && (
                          <TableCell>
                            <IconButton onClick={() => deleteHabit(habit.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <div>No habits to display</div>
          )}
        </>
      )}
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <Snackbar
        open={Boolean(message)}
        onClose={() => setMessage(null)}
        message={message}
      />
    </div>
  );
};

export default HabitsList;
