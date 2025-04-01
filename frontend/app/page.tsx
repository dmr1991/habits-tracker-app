"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHabitsThunk } from "@/features/habit/habitSlice";
import { AppState, AppDispatch } from "../Redux/store";
import Habits from "./habits";
import {
  fetchRegisterUserThunk,
  fetchLoginUserThunk,
  addUser,
} from "@/features/user/userSlice";
import { getCookie } from "cookies-next";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const habits = useSelector((state: AppState) => state.habit.habits);
  const user = useSelector((state: AppState) => state.user.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = getCookie("habitToken");
    if (token) {
      dispatch(addUser(token));
    }
    if (user) {
      dispatch(fetchHabitsThunk(user.toString()));
    }
  }, [dispatch, user]);

  const handleLogin = () => {
    dispatch(fetchLoginUserThunk({ username, password }));
  };

  const handleRegister = () => {
    dispatch(fetchRegisterUserThunk({ username, password }));
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 pb-20 sm:p-5">
      {!user && ( <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Login/Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="w-full px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Register
          </button>
        </div>
      )}
      {user && <Habits habits={habits} />}
    </div>
  );
}
