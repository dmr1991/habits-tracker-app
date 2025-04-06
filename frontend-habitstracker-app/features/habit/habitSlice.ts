import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHabits, fetchAddHabit } from "./habitAPI";

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

type markAsDoneThunkParams = {
  habitId: string;
  token: string
};

type addHabitThunkParams = {
  token: string;
  title: string;
  description: string
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
  async (token: string, { rejectWithValue }) => {
    const response = await fetchHabits(token);
    console.log("Response from API fetchHabits:", response); // Agrega este log para depuración
    const responseJson = await response.json();
    if (!response.ok) {
      return rejectWithValue("Failed to fetch habits.");
    }
    return responseJson;
  }
);

export const markAsDoneThunk = createAsyncThunk(
  "habit/markAsDone",
  async ({ habitId, token }: markAsDoneThunkParams, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:5000/habits/markasdone/${habitId}`,
      { method: "PATCH", headers: { Authorizaion: "Bearer " + token } }
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

export const fetchAddHabitThunk = createAsyncThunk(
  "habit/fetchAddHabit",
  async (
    { token, title, description }: addHabitThunkParams,
    { rejectWithValue }
  ) => {
    const response = await fetchAddHabit(token, title, description);
    const responseJson = await response.json();
    if (!response.ok) {
      return rejectWithValue("Failed to add Habit.");
    } else if (responseJson?.message?.toString() === "Error creating habit.") {
      return rejectWithValue(responseJson.message);
    } else {
      return responseJson;
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
        console.log("Habits loaded:", action.payload);  // Agrega este log para depuración
        state.habits = action.payload;
      })
      .addCase(markAsDoneThunk.fulfilled, (state, action) => {
        state.status[action.meta.arg.token] = "success";
        state.error[action.meta.arg.habitId] = null;
      })
      .addCase(markAsDoneThunk.rejected, (state, action) => {
        state.status[action.meta.arg.habitId] = "failed";
        state.error[action.meta.arg.habitId] = action.payload as string;
      })
      .addCase(fetchAddHabitThunk.fulfilled, (state, action) => {
        console.log(action)
        state.habits.push(action.payload);
      }).addCase(fetchAddHabitThunk.rejected, (state, action) => {
        state.status[action.meta.arg.title] = "failed";  // Usamos el título para identificar el estado de error
        state.error[action.meta.arg.title] = action.error.message || "Error adding habit";
        console.error('Error adding habit:', action.error); // Verifica en la consola el error
      });
  },
});

export const { addHabits, addHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
