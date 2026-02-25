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
    const { range } = req.query;

    const now = new Date();
    let startDate = null;

    if (range === "week") {
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        startDate = new Date(now.getFullYear(), now.getMonth(), diff);
        startDate.setHours(0, 0, 0, 0);
    }

    else if (range === "month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    else if (range === "year") {
        startDate = new Date(now.getFullYear(), 0, 1);
    }

    const matchFilter = { teacher_id };

    if (startDate) {
        matchFilter.created_at = { $gte: startDate };
    }

    const summary = await Activity.aggregate([
        { $match: matchFilter },
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

    const teacher = await Activity.findOne({ teacher_id }).select("teacher_name");

    return res.status(200).json(
        new ApiResponse(200, {
            teacher_id,
            name: teacher?.teacher_name ?? null,
            lessons: counts["Lesson Plan"] ?? 0,
            quizzes: counts["Quiz"] ?? 0,
            assessments: counts["Question Paper"] ?? 0
        })
    );
});

const getTeacherTrends = asyncHandler(async (req, res) => {
  const { teacher_id } = req.params;
  const { range } = req.query;

  if (!["week", "month", "year"].includes(range)) {
    throw new ApiError(400, "Invalid range");
  }

  const now = new Date();
  let startDate;
  let groupFormat;
  let allPeriods = [];

  if (range === "week") {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);

    startDate = new Date(now.getFullYear(), now.getMonth(), diff);
    startDate.setHours(0, 0, 0, 0);

    groupFormat = "%Y-%m-%d";

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      allPeriods.push(date.toISOString().split("T")[0]);
    }
  } 
  else if (range === "month") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    groupFormat = "%Y-%m-%d";

    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(now.getFullYear(), now.getMonth(), i);
      allPeriods.push(date.toISOString().split("T")[0]);
    }
  } 
  else if (range === "year") {
    startDate = new Date(now.getFullYear(), 0, 1);
    groupFormat = "%Y-%m";

    for (let i = 0; i < 12; i++) {
      const month = new Date(now.getFullYear(), i, 1);
      allPeriods.push(month.toISOString().slice(0, 7));
    }
  }

  const rawData = await Activity.aggregate([
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
    { $sort: { "_id.period": 1 } }
  ]);

  const formattedMap = {};

  allPeriods.forEach((period) => {
    formattedMap[period] = {
      period,
      lessons: 0,
      quizzes: 0,
      assessments: 0
    };
  });

  rawData.forEach((item) => {
    const period = item._id.period;
    const type = item._id.type;

    if (!formattedMap[period]) return;

    if (type === "Lesson Plan") {
      formattedMap[period].lessons = item.count;
    }

    if (type === "Quiz") {
      formattedMap[period].quizzes = item.count;
    }

    if (type === "Question Paper") {
      formattedMap[period].assessments = item.count;
    }
  });

  const finalData = Object.values(formattedMap);

  return res.status(200).json(
    new ApiResponse(200, finalData)
  );
});

export {
    getAllTeachers,
    getTeacherTrends,
    getTeacherSummary
}