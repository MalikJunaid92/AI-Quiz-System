const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");
const { protect, restrictTo } = require("../middleware/auth");

router.post(
  "/submit",
  protect,
  restrictTo("student"),
  submissionController.submitQuiz
);
router.post(
  "/violation",
  protect,
  restrictTo("student"),
  submissionController.logViolation
);
router.get("/quiz/:quizId", protect, submissionController.getSubmissionsByQuiz);
router.get(
  "/my-submissions",
  protect,
  restrictTo("student"),
  submissionController.getMySubmissions
);

module.exports = router;
