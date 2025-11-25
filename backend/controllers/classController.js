const Class = require("../models/class");

exports.createClass = async (req, res) => {
  try {
    const { name, description } = req.body;

    let code;
    let isUnique = false;

    while (!isUnique) {
      code = Class.generateClassCode();
      const existing = await Class.findOne({ code });
      if (!existing) isUnique = true;
    }

    const newClass = await Class.create({
      name,
      description,
      code,
      teacherId: req.user._id,
    });

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.joinClass = async (req, res) => {
  try {
    const { code } = req.body;

    const classToJoin = await Class.findOne({ code });
    if (!classToJoin) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (classToJoin.students.includes(req.user._id)) {
      return res.status(400).json({ message: "Already joined" });
    }

    classToJoin.students.push(req.user._id);
    await classToJoin.save();

    res.json(classToJoin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyClasses = async (req, res) => {
  try {
    let classes;

    if (req.user.role === "teacher") {
      classes = await Class.find({ teacherId: req.user._id }).populate(
        "students",
        "name email"
      );
    } else {
      classes = await Class.find({ students: req.user._id }).populate(
        "teacherId",
        "name email"
      );
    }

    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate("teacherId", "name email")
      .populate("students", "name email");

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
