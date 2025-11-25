const Quiz = require("../models/quiz");
const path = require("path");
const fileParser = require("../services/fileParser");
const aiService = require("../services/aiService");

// Shuffle function
function shuffleArray(array, seed) {
  const random = (seed) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  let currentIndex = array.length;
  let randomIndex;
  const shuffled = [...array];

  while (currentIndex !== 0) {
    randomIndex = Math.floor(random(seed) * currentIndex);
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
    seed++;
  }

  return shuffled;
}

exports.uploadAndGenerate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const ext = path.extname(req.file.originalname).toLowerCase().substring(1);
    const content = await fileParser.parseFile(req.file.path, ext);

    const numberOfQuestions = parseInt(req.body.numberOfQuestions) || 10;
    const questions = await aiService.generateMCQs(content, numberOfQuestions);

    res.json({ questions, content: content.substring(0, 500) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const {
      title,
      description,
      classId,
      questions,
      duration,
      startTime,
      endTime,
    } = req.body;

    const quiz = await Quiz.create({
      title,
      description,
      classId,
      teacherId: req.user._id,
      questions,
      duration,
      startTime,
      endTime,
      status: "scheduled",
    });

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizzesByClass = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ classId: req.params.classId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getShuffledQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const now = new Date();
    if (now < quiz.startTime || now > quiz.endTime) {
      return res.status(403).json({ message: "Quiz not available" });
    }

    // Create seed from student ID
    const seed = parseInt(req.user._id.toString().substring(0, 8), 16);

    // Shuffle questions
    const shuffledQuestions = shuffleArray(quiz.questions, seed);

    // Shuffle options for each question
    const shuffledQuiz = shuffledQuestions.map((q, idx) => ({
      ...q.toObject(),
      options: shuffleArray(q.options, seed + idx),
    }));

    res.json({
      ...quiz.toObject(),
      questions: shuffledQuiz,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
