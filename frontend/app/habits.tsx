import { useSelector, useDispatch } from "react-redux";
import { fetchAddHabitThunk, markAsDoneThunk } from "@/features/habit/habitSlice";
import { AppState, AppDispatch } from "../Redux/store";
import { fetchHabitsThunk } from "@/features/habit/habitSlice";
import {useState} from "react";

type Habits = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  days: number;
  lastDone: Date;
  lastUpdated: Date;
  startedAt: Date;
};

type HabitsProps = {
  habits: Habits[];
};

const handleMarkAsDone = (habitId: string, dispatch: AppDispatch, token:string) => {
  dispatch(markAsDoneThunk({habitId, token}));
  if (token){
  dispatch(fetchHabitsThunk(token));}
};
export default function Habits({ habits }: HabitsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: AppState) => state.habit.status);
  const error = useSelector((state: AppState) => state.habit.error);
  const user = useSelector((state: AppState) => state.user.user);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const calculateProgress = (days: number): number => {
    return Math.min((days / 66) * 100, 100);
  };

  const handleAddHabi = () =>{
    if (title && description){
      dispatch(fetchAddHabitThunk({token:user?user.toString():"", title, description}));
      setTitle("");
      setDescription("");
      dispatch(fetchHabitsThunk(user?user.toString():""));
    }
  }

  return (
    <div className="p-3 bg-gradient-to-r from-slate-600 to-slate-700 divide-y divide-white w-120 rounded-2xl shadow-lg mt-1">
      {habits.map((habit) => (
        <div
          key={habit.title}
          className="flex flex-col p-4 m-1 list-none text-white"
        >
          <li className="text-lg font-semibold text-white">{habit.title}</li>
          <p>{habit.description}</p>
          <progress
            className="w-full h-4 rounded-lg"
            value={calculateProgress(habit.days)}
            max="100"
          ></progress>
          <button
            className="text-slate-100 w-1/2 mx-auto bg-rose-300 border border-slate-400 hover:border-transparent hover:bg-rose-400 hover:text-slate-100 active:bg-rose-700 rounded-md p-2 m-2"
            onClick={() => handleMarkAsDone(habit._id,dispatch, user?user.toString():"")}
          >
            {status[habit._id] === "loading" ? "Processing..." : "Mark as Done"}
          </button>
          {status[habit._id] === "failed" && (
            <span className="text-red-200"> {error[habit._id]}</span>
          )}
          {status[habit._id] === "success" && (
            <span className="text-teal-600">Habit was just marked as done!</span>
          )}
        </div>
      ))}
    </div>
  );
}
