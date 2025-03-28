import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Applications } from "@/types/type";

interface JobApplicationsState {
    applications: Applications[];
    loading: boolean;
}

const initialState: JobApplicationsState = {
    applications: [],
    loading: false,
};

const jobApplicationsSlice = createSlice({
    name: "jobApplications",
    initialState,
    reducers: {
        //Set all job applications
        setJobApplicationsReducer(state, action: PayloadAction<Applications[]>) {
            state.applications = action.payload;
        },

        //Add a new job application
        addJobApplicationReducer(state, action: PayloadAction<Applications>) {
            state.applications.push(action.payload);
        },

        //Remove a job application by ID
        removeJobApplicationReducer(state, action: PayloadAction<string>) {
            state.applications = state.applications.filter(app => app.id !== action.payload);
        },
    },
});

export const { setJobApplicationsReducer, addJobApplicationReducer, removeJobApplicationReducer } = jobApplicationsSlice.actions;
export const jobApplicationsReducer = jobApplicationsSlice.reducer;
