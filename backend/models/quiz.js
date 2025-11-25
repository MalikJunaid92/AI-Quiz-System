const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    text: String,
    isCorrect: Boolean,
  },
  { _id: true }
);

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
    },
    options: [optionSchema],
    correctAnswer: Number, // Index of correct option
    marks: {
      type: Number,
      default: 1,
    },
  },
  { _id: true }
);

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [questionSchema],
  totalMarks: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number, // in minutes
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "scheduled", "active", "completed"],
    default: "draft",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate total marks
quizSchema.pre("save", function (next) {
  this.totalMarks = this.questions.reduce((sum, q) => sum + q.marks, 0);
  next();
});

module.exports = mongoose.model("Quiz", quizSchema);
