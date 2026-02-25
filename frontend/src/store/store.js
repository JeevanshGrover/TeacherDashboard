import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../features/dashboardSlice.js";
import teacherReducer from "../features/teacherSlice.js";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    teachers: teacherReducer
  }
});

