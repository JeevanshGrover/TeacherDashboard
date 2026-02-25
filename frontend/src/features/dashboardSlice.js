import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance as axios } from "../utils/axios.js";

export const fetchDashboardSummary = createAsyncThunk(
    "dashboard/fetchSummary",
    async (range) => {
        const res = await axios.get(`/activity/dashboard/summary?range=${range}`)
        return res.data.data;
    }
)

export const fetchDashboardTrends = createAsyncThunk(
    "dashboard/fetchTrends",
    async (range) => {
        const res = await axios.get(`/activity/dashboard/trends?range=${range}`)
        console.log(res)
        return res.data.data
    }
)

const initialState = {
    summary: null,
    trends: [],
    range: "month",
    loadingSummary: false,
    loadingTrends: false,
    error: null
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setRange: (state, action) => {
            state.range = action.payload;
        }    
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardSummary.pending, (state) => {
                state.loadingSummary = true
            })
            .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
                state.loadingSummary = false
                state.summary = action.payload
            })
            .addCase(fetchDashboardSummary.rejected, (state, action) => {
                state.loadingSummary = false
                state.error = action.error.message;
            })
            .addCase(fetchDashboardTrends.pending, (state) => {
                state.loadingTrends = true
            })
            .addCase(fetchDashboardTrends.fulfilled, (state, action) => {
                state.loadingTrends = false
                state.trends = action.payload
            })
            .addCase(fetchDashboardTrends.rejected, (state, action) => {
                state.loadingTrends = false
                state.error = action.error.message;
            })
    }
})

export const { setRange } = dashboardSlice.actions;
export default dashboardSlice.reducer;