import express from "express"
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "https://teacher-dashboard-savra.vercel.app",
        credentials: true
    })
)

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true , limit: "16kb"}));

import activityRouter from "./routes/activity.routes.js"

app.use("/api/v1/activity", activityRouter)

import teacherRouter from "./routes/teacher.routes.js"

app.use("/api/v1/teacher", teacherRouter);

export { app }