import express from "express"
import cors from "cors";

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||
      origin.endsWith(".vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Backend is running. Use /api/v1/... endpoints.");
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true , limit: "16kb"}));

import activityRouter from "./routes/activity.routes.js"

app.use("/api/v1/activity", activityRouter)

import teacherRouter from "./routes/teacher.routes.js"

app.use("/api/v1/teacher", teacherRouter);

export { app }