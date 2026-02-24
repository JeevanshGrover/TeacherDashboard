import { Router } from "express";
import {
    getAllTeachers,
    getTeacherSummary,
    getTeacherTrends
} from "../controllers/teacher.controller.js";

const router = Router();

router.get("/", getAllTeachers);

router.get("/:teacher_id/summary", getTeacherSummary);

router.get("/:teacher_id/trends", getTeacherTrends);

export default router;