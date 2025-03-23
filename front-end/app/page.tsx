"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHabitsThunk } from "@/features/habit/habitSlice";
import { AppState, AppDispatch } from "../Redux/store";
import Habits from "./habits";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const habits = useSelector((state: AppState) => state.habit.habits);

  useSelector((state: AppState) => state.habit);
  useEffect(() => {
    dispatch(fetchHabitsThunk());
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center justify-center p-8 pb-20 sm:p-5">
      <Habits habits={habits} />
    </div>
  );
}
