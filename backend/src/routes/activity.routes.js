import { Router } from "express";
import {
        createActivity,
        getActivities,
        getDashboardSummary,
        getActivityTrends
} from "../controllers/activity.controller.js"

const router = Router();

router.route("/").post(createActivity).get(getActivities);

router.route("/dashboard/summary").get(getDashboardSummary);

router.route("/dashboard/trends").get(getActivityTrends)

export default router;