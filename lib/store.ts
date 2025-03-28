import { configureStore } from "@reduxjs/toolkit";
import { jobApplicationsReducer } from "./slicer/jobApplicationsSlice";
import { authReducer } from "./slicer/authSlicer";

export const store = configureStore({
    reducer: {
        jobApplications: jobApplicationsReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
