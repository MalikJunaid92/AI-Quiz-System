const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");
// const cron = require('node-cron');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDatabase();

// Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/classes', require('./routes/class'));
// app.use('/api/quiz', require('./routes/quiz'));
// app.use('/api/submission', require('./routes/submission'));

// Cron job to auto-submit quizzes at end time
// cron.schedule('* * * * *', async () => {
//   const Quiz = require('./models/Quiz');
//   const now = new Date();

//   const expiredQuizzes = await Quiz.find({
//     endTime: { $lte: now },
//     status: 'active'
//   });

//   for (let quiz of expiredQuizzes) {
//     quiz.status = 'completed';
//     await quiz.save();
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
