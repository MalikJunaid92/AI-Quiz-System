"use client"
import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Clock, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2 
} from "lucide-react";

// --- UI COMPONENTS (Teal/Cyan Theme) ---

const Button = ({ className = "", variant = "primary", size = "default", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm shadow-cyan-500/20", // Next Question
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm shadow-emerald-500/20", // Submit
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700", // Previous
    ghost: "hover:bg-slate-100 text-slate-600",
  };

  const sizes = {
    default: "h-11 px-6 text-sm",
    sm: "h-9 px-3 text-xs",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button 
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ className = "", children, ...props }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

// --- MAIN COMPONENT ---

const QuizAttempt = ({ quizId = "Q002", onBack }) => {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Mock Toast
  const toast = ({ title, description, variant }) => {
    if (variant === 'destructive') alert(`⚠️ ${title}\n${description}`);
    else alert(`✅ ${title}\n${description}`);
  };

  // Timer Logic
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  // Anti-cheat (Simplified for demo)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !submitted) {
        console.log("Tab change detected"); 
        // In real app: trigger warning or auto-submit
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [submitted]);

  const questions = [
    {
      id: 1,
      question: "What is the derivative of x²?",
      options: ["2x²", "2x", "x²/2", "x"],
      correctId: 1 // Index of "2x"
    },
    {
      id: 2,
      question: "Solve for x: 2x + 5 = 15",
      options: ["10", "20", "5", "7.5"],
      correctId: 2 // Index of "5"
    },
  ];

  const currentQ = questions[currentQuestion];

  const handleOptionSelect = (optionIdx) => {
    setAnswers({ ...answers, [currentQuestion]: optionIdx });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast({
      title: "Quiz Submitted!",
      description: "Your answers have been recorded.",
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Quiz Submitted!</h2>
            <p className="text-slate-500 mt-2">Your answers have been successfully recorded.</p>
          </div>
          <Button onClick={onBack} variant="primary" className="w-full bg-cyan-500 hover:bg-cyan-600">
            Return to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-slate-900">Geometry Basics</h1>
            <span className="text-sm text-slate-400 font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          
          {/* Timer Badge */}
          <div className="bg-cyan-50 text-cyan-700 px-4 py-2 rounded-lg font-mono font-bold text-sm flex items-center gap-2 border border-cyan-100">
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Anti-Cheat Warning Banner */}
      <div className="bg-orange-50 border-b border-orange-100 text-orange-700 px-4 py-3 text-sm text-center flex justify-center items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <span>Anti-cheat enabled: Copying is disabled. Changing tabs will auto-submit the quiz.</span>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
        
        {/* Question Card */}
        <Card className="p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, idx) => {
              const isSelected = answers[currentQuestion] === idx;
              return (
                <label 
                  key={idx}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer group ${
                    isSelected 
                      ? 'border-cyan-500 bg-cyan-50/30' 
                      : 'border-slate-200 hover:border-cyan-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-cyan-500' : 'border-slate-300 group-hover:border-cyan-400'
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />}
                  </div>
                  
                  <input 
                    type="radio" 
                    name={`question-${currentQuestion}`} 
                    className="hidden"
                    checked={isSelected}
                    onChange={() => handleOptionSelect(idx)}
                  />
                  
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <span className="text-slate-400 uppercase text-sm font-bold w-6">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {option}
                  </div>
                </label>
              );
            })}
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-2">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="min-w-[120px]"
          >
            Previous
          </Button>

          {currentQuestion < questions.length - 1 ? (
            <Button 
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="min-w-[160px] bg-cyan-500 hover:bg-cyan-600"
            >
              Next Question
            </Button>
          ) : (
            <Button 
              variant="success"
              onClick={handleSubmit}
              className="min-w-[160px]"
            >
              Submit Quiz
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <Card className="p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Question Navigator</h3>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {questions.map((_, idx) => {
              let statusClass = "bg-slate-100 text-slate-500 border-transparent"; // Not Answered
              
              if (currentQuestion === idx) {
                statusClass = "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"; // Current
              } else if (answers[idx] !== undefined) {
                statusClass = "bg-white border-emerald-400 text-emerald-600 border-2"; // Answered (using border style as per common design or solid if preferred)
                 // Or solid green if strictly following 'Answered' filled square logic:
                 // statusClass = "bg-emerald-100 text-emerald-700 border-transparent";
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm transition-all flex items-center justify-center border ${statusClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-emerald-400 bg-white"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-100"></div>
              <span>Not Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-cyan-500"></div>
              <span>Current</span>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default QuizAttempt;