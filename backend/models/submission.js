const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  selectedOption: Number, // Index of selected option
});

const submissionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answers: [answerSchema],
  score: {
    type: Number,
    default: 0,
  },
  totalMarks: Number,
  percentage: Number,
  tabSwitchCount: {
    type: Number,
    default: 0,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  autoSubmitted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Submission", submissionSchema);
