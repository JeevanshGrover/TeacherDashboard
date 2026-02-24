import { Activity } from "../models/activity.model.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllTeachers = asyncHandler(async (req, res) => {

    const teachers = await Activity.aggregate([
        {
            $group: {
                _id: "$teacher_id",
                teacher_name: { $first: "$teacher_name" }
            }
        },
        {
            $project: {
                _id: 0,
                teacher_id: "$_id",
                teacher_name: 1
            }
        },
        {
            $sort: { teacher_name: 1 }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(200, teachers)
    );
});

const getTeacherSummary = asyncHandler(async (req, res) => {

    const { teacher_id } = req.params;

    const summary = await Activity.aggregate([
        {
            $match: { teacher_id }
        },
        {
            $group: {
                _id: "$activity_type",
                count: { $sum: 1 }
            }
        }
    ]);

    const counts = Object.fromEntries(
        summary.map(({ _id, count }) => [_id, count])
    );

    return res.status(200).json(
        new ApiResponse(200, {
            teacher_id,
            totalLessons: counts["Lesson Plan"] ?? 0,
            totalQuizzes: counts["Quiz"] ?? 0,
            totalAssessments: counts["Question Paper"] ?? 0
        })
    );
});

const getTeacherTrends = asyncHandler(async (req, res) => {

    const { teacher_id } = req.params;
    const { range } = req.query;

    const now = new Date();
    let startDate;
    let groupFormat;

    if (range === "week") {
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        startDate = new Date(now.getFullYear(), now.getMonth(), diff);
        startDate.setHours(0, 0, 0, 0);
        groupFormat = "%Y-%m-%d";
    }

    else if (range === "month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        groupFormat = "%Y-%m-%d";
    }

    else if (range === "year") {
        startDate = new Date(now.getFullYear(), 0, 1);
        groupFormat = "%Y-%m";
    }

    else {
        throw new ApiError(400, "Invalid range");
    }

    const trends = await Activity.aggregate([
        {
            $match: {
                teacher_id,
                created_at: { $gte: startDate }
            }
        },
        {
            $group: {
                _id: {
                    period: {
                        $dateToString: {
                            format: groupFormat,
                            date: "$created_at"
                        }
                    },
                    type: "$activity_type"
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { "_id.period": 1 }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(200, trends)
    );
});

export {
    getAllTeachers,
    getTeacherTrends,
    getTeacherSummary
}