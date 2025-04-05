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
      console.log("Token encontrado: ", token); // Verificar si el token existe
      dispatch(addUser(token));  // Agregar al estado de Redux
    }
  }, [dispatch]);
  
  useEffect(() => {
    if (user) {
      console.log("User disponible: ", user); // Verificar que el `user` se está actualizando
      console.log("Dispatching fetchHabitsThunk con user: ", user); // Verifica si se está despachando la acción correctamente
      dispatch(fetchHabitsThunk(user.toString())); // Llamar a la acción para obtener los hábitos
    }
  }, [user, dispatch]);
/* 
  useEffect(() => {
    const token = getCookie("habitToken");
    if (token) {
      dispatch(addUser(token));
    }
    if (user) {
      dispatch(fetchHabitsThunk(user.toString()));
    }
  }, [dispatch, user]);
 */
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
            className="text-slate-100 w-1/3 mx-auto bg-rose-300 border border-slate-400 hover:border-transparent hover:bg-rose-400 hover:text-slate-100 active:bg-rose-700 rounded-md p-2 m-2"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="text-slate-100 w-1/3 mx-auto bg-rose-300 border border-slate-400 hover:border-transparent hover:bg-rose-400 hover:text-slate-100 active:bg-rose-700 rounded-md p-2 m-2"
          >
            Register
          </button>
        </div>
      )}
      {user && <Habits habits={habits} />}
    </div>
  );
}
