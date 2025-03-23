import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHabits } from "./habitAPI";

type Habit = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  days: number;
  lastDone: Date;
  lastUpdated: Date;
  startedAt: Date;
};

type HabitState = {
  habits: Habit[];
  status: Record<string, "idle" | "loading" | "success" | "failed">;
  error: Record<string, string | null>;
};

const initialState: HabitState = {
  habits: [],
  status: {},
  error: {},
};

export const fetchHabitsThunk = createAsyncThunk(
  "habit/fetchHabits",
  async () => {
    return await fetchHabits();
  }
);

export const markAsDoneThunk = createAsyncThunk(
  "habit/markAsDone",
  async (habitId: string, { rejectWithValue }) => {
    console.log("Marking habit as done, ID:", habitId);
    const response = await fetch(
      `http://localhost:5000/habits/markasdone/${habitId}`,
      { method: "PATCH" }
    );
    const responseJson = await response.json();
    if (!response.ok) {
      return rejectWithValue("Failed to mark habit as done");
    } else if (responseJson.message.toString() === "Habit restarted.") {
      return rejectWithValue(responseJson.message);
    } else {
      return responseJson.message;
    }
  }
);

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
        (habit) => habit._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitsThunk.fulfilled, (state, action) => {
        state.habits = action.payload;
      })
      .addCase(markAsDoneThunk.fulfilled, (state, action) => {
        state.status[action.meta.arg] = "success";
        state.error[action.meta.arg] = null;
      })
      .addCase(markAsDoneThunk.rejected, (state, action) => {
        state.status[action.meta.arg] = "failed";
        state.error[action.meta.arg] = action.payload as string;
      });
  }
});

export const { addHabits, addHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
