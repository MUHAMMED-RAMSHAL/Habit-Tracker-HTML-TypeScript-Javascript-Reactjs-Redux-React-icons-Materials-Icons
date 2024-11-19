import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completeDates: string[];
  createdAt: string; // Fixed typo from `createAt` to `createdAt`
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching habits
export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate delay

  const mockHabits: Habit[] = [
    {
      id: "1",
      name: "Read",
      frequency: "daily",
      completeDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Exercise",
      frequency: "daily",
      completeDates: [],
      createdAt: new Date().toISOString(),
    },
  ];
  return mockHabits;
});

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    // Add a new habit
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completeDates: [],
        createdAt: new Date().toISOString(),
      };

      state.habits.push(newHabit);
    },

    // Toggle a habit's completion for a specific date
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find((habit) => habit.id === action.payload.id);
      if (habit) {
        const index = habit.completeDates.indexOf(action.payload.date);
        if (index > -1) {
          // Remove date if already completed
          habit.completeDates.splice(index, 1);
        } else {
          // Add date if not completed
          habit.completeDates.push(action.payload.date);
        }
      }
    },

    // Remove a habit by ID
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter((habit) => habit.id !== action.payload);
    },
  },

  // Handle async actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch habits";
      });
  },
});

// Export actions
export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;

// Export reducer
export default habitSlice.reducer;
