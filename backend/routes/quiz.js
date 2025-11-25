const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const { protect, restrictTo } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post(
  "/upload",
  protect,
  restrictTo("teacher"),
  upload.single("file"),
  quizController.uploadAndGenerate
);
router.post(
  "/create",
  protect,
  restrictTo("teacher"),
  quizController.createQuiz
);
router.get("/class/:classId", protect, quizController.getQuizzesByClass);
router.get("/:id", protect, quizController.getQuizById);
router.get(
  "/:id/student",
  protect,
  restrictTo("student"),
  quizController.getShuffledQuiz
);

module.exports = router;
