import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Activity } from "../models/activity.model.js";

const createActivity = asyncHandler(async(req, res) => {
    const { teacher_id,teacher_name, grade, subject, activity_type, created_at } = req.body;
    const activityExists = await Activity.findOne({
        $and: [{teacher_id}, {activity_type}, {created_at}]
    })

    if(activityExists){
        throw new ApiError(400, "duplicate entries detected")
    }

    const createdActivity = await Activity.create({
        teacher_id,
        teacher_name,
        grade,
        subject,
        activity_type,
        created_at:created_at || new Date()
    })

    if(!createdActivity){
        throw new ApiError(500, "something went wrong while creating the activity")
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdActivity, "Activity created successfully"))
});

const getActivities = asyncHandler(async(req, res) => {
    const activities = await Activity.find().sort({created_at: -1})

    return res
        .status(200)
        .json(new ApiResponse(200, activities));
})

const getDashboardSummary = asyncHandler(async (req, res) => {
    const { range } = req.query;
    let startDate = new Date();
    const now = new Date();
    
    if(range === "week"){
        const day = now.getDay();
        const  diff = now.getDate() - day + (day === 0? -6 : 1);

        startDate = new Date(now.getFullYear(), now.getMonth(), diff);
        startDate.setHours(0, 0, 0, 0);
    }

    else if(range === "month"){
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    else if(range === "year"){
        startDate = new Date(now.getFullYear(), 0, 1); 
    }

    else{
        throw new ApiError(400, "invalid range")
    }

    const matchCriteria = {
        created_at: { $gte: startDate }
    }

    const aggregateQuery = await Activity.aggregate([
        {
            $match: matchCriteria
        },
        {
            $facet: {
                teacherCount: [
                    {
                        $group: {
                            _id: "$teacher_id",
                        }
                    },
                    {
                        $count: "totalTeachers"
                    }
                ],
                activityCount: [
                    {
                        $group: {
                            _id: "$activity_type",
                            count: { $sum: 1 }
                        }
                    }
                ]
            }
        }
    ])

    const teacherCount = aggregateQuery[0].teacherCount[0]?.totalTeachers ?? 0;

    const activities = aggregateQuery[0].activityCount;
    const totalActivities = Object.fromEntries(
        activities.map(({_id, count}) => [_id, count])
    );


    return res
        .status(200)
        .json(new ApiResponse(200, {
            totalTeachers: teacherCount,
            totalLessons: totalActivities["Lesson Plan"] ?? 0,
            totalQuizzes: totalActivities["Quiz"] ?? 0,
            totalAssessments: totalActivities["Question Paper"] ?? 0
        }));
});

const getActivityTrends = asyncHandler(async (req, res) => {

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

    const data = await Activity.aggregate([
        {
            $match: {
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
        new ApiResponse(200, data)
    );
});

export{
    createActivity,
    getActivities,
    getDashboardSummary,
    getActivityTrends
}

