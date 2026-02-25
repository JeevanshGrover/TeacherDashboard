import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance as axios } from "../utils/axios.js";

export const fetchTeachers = createAsyncThunk(
    "teachers/fetchAll",
    async () => {
        const res = await axios.get("/teacher");
        console.log(res);
        return res.data.data;
    }
);

export const fetchTeacherSummary = createAsyncThunk(
    "teachers/fetchSummary",
    async (teacher_id) => {
        const res = await axios.get(`/teacher/${teacher_id}/summary`);
        console.log(res);
        return res.data.data;
    }
);

export const fetchTeacherTrends = createAsyncThunk(
    "teachers/fetchTrends",
    async ({ teacher_id, range }) => {
        const res = await axios.get(
            `/teacher/${teacher_id}/trends?range=${range}`
        );
        console.log(res);
        return res.data.data;
    }
);

const initialState = {
    list: [],
    summary: null,
    trends: [],
    selectedTeacher: null,
    loadingList: false,
    loadingSummary: false,
    loadingTrends: false,
    error: null
};

export const teacherSlice = createSlice({
    name: "teachers",
    initialState,
    reducers: {
        setSelectedTeacher: (state, action) => {
            state.selectedTeacher = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchTeachers.pending, (state) => {
                state.loadingList = true;
            })
            .addCase(fetchTeachers.fulfilled, (state, action) => {
                state.loadingList = false;
                state.list = action.payload;
            })
            .addCase(fetchTeachers.rejected, (state, action) => {
                state.loadingList = false;
                state.error = action.error.message;
            })

            .addCase(fetchTeacherSummary.pending, (state) => {
                state.loadingSummary = true;
            })
            .addCase(fetchTeacherSummary.fulfilled, (state, action) => {
                state.loadingSummary = false;
                state.summary = action.payload;
            })
            .addCase(fetchTeacherSummary.rejected, (state, action) => {
                state.loadingSummary = false;
                state.error = action.error.message;
            })

            .addCase(fetchTeacherTrends.pending, (state) => {
                state.loadingTrends = true;
            })
            .addCase(fetchTeacherTrends.fulfilled, (state, action) => {
                state.loadingTrends = false;
                state.trends = action.payload;
            })
            .addCase(fetchTeacherTrends.rejected, (state, action) => {
                state.loadingTrends = false;
                state.error = action.error.message;
            });
    }
});

export const { setSelectedTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;