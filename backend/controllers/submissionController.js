const Submission = require("../models/submission");
const Violation = require("../models/violation");
const Quiz = require("../models/quiz");

exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers, tabSwitchCount, autoSubmitted } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Calculate score
    let score = 0;
    answers.forEach((answer) => {
      const question = quiz.questions.id(answer.questionId);
      if (question && question.correctAnswer === answer.selectedOption) {
        score += question.marks;
      }
    });

    const percentage = (score / quiz.totalMarks) * 100;

    const submission = await Submission.create({
      quizId,
      studentId: req.user._id,
      answers,
      score,
      totalMarks: quiz.totalMarks,
      percentage,
      tabSwitchCount,
      autoSubmitted,
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logViolation = async (req, res) => {
  try {
    const { quizId, type, submissionId } = req.body;

    const violation = await Violation.create({
      submissionId,
      studentId: req.user._id,
      quizId,
      type,
    });

    res.status(201).json(violation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubmissionsByQuiz = async (req, res) => {
  try {
    const submissions = await Submission.find({ quizId: req.params.quizId })
      .populate("studentId", "name email")
      .sort("-submittedAt");

    // Get violations for each submission
    for (let submission of submissions) {
      const violations = await Violation.find({ submissionId: submission._id });
      submission._doc.violations = violations;
    }

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ studentId: req.user._id })
      .populate("quizId", "title totalMarks")
      .sort("-submittedAt");

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
