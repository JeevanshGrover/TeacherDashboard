import mongoose, { Schema } from "mongoose"

const activitySchema = new Schema({
  teacher_id: {
    type: String,
    required: true
  },
  teacher_name: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  activity_type: {
    type: String,
    enum: ["Quiz", "Lesson Plan", "Question Paper"],
    required: true
  },
  created_at: {
    type: Date,
    required: true
  }
}, { timestamps: true });

activitySchema.index(
  { teacher_id: 1, activity_type: 1, created_at: 1 },
  { unique: true }
);

export const Activity = mongoose.model("Activity", activitySchema);