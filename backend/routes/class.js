const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");
const { protect, restrictTo } = require("../middleware/auth");

router.post(
  "/create",
  protect,
  restrictTo("teacher"),
  classController.createClass
);
router.post("/join", protect, restrictTo("student"), classController.joinClass);
router.get("/my-classes", protect, classController.getMyClasses);
router.get("/:id", protect, classController.getClassById);

module.exports = router;
