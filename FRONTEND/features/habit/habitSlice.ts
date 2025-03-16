import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHabits } from "./habitAPI";

type Habit = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

type HabitState = {
  habits: Habit[];
};

const initialState: HabitState = {
  habits: [],
};

export const fetchHabitsThunk = createAsyncThunk(
  "habit/fetchHabits",
  async () => {
    return await fetchHabits();
  }
); 

/* export const fetchHabitsThunk = createAsyncThunk(
  "habit/fetchHabits",
  async () => {
    const response = await fetchHabits();
    const responseJson=await response.json();
    return responseJson;
  }
); 
 */ // dejo esto quees una parte de videoconferencia,pero no logre poner las cosas en UI, dejare el archivo para mostrar los habitos en redux toolkit


const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabits: (state, action) => {
      state.habits = action.payload;
    },
    addHabit: (state, action) => {
      state.habits.push(action.payload);
    },
    removeHabit: (state, action) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
      state.habits = action.payload;
    });
  },
});

export const { addHabits, addHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
