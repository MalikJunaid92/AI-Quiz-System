"use client"
import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Clock, 
  AlertTriangle, 
  CheckCircle2 
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- UI COMPONENTS (Teal/Cyan Theme) ---
const Button = ({ className = "", variant = "primary", size = "default", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm shadow-cyan-500/20",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm shadow-emerald-500/20",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
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

const QuizAttempt = ({ quizId = "Q002" }) => {
  const [timeLeft, setTimeLeft] = useState(1800);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  const SwitchtoDashboard = () => {
    router.push("./")
  };

  // Mock Toast
  const toast = ({ title, description }) => {
    alert(`✅ ${title}\n${description}`);
  };

  // --- ANTI CHEAT: BLOCK COPY, SELECT, RIGHT CLICK, SHORTCUTS ---
  useEffect(() => {
    const prevent = (e) => e.preventDefault();

    document.addEventListener("copy", prevent);
    document.addEventListener("cut", prevent);
    document.addEventListener("paste", prevent);
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("selectstart", prevent);

    const blockKeys = (e) => {
      if (e.ctrlKey || e.metaKey) {
        const blocked = ["c", "v", "x", "u", "p", "s", "a"];
        if (blocked.includes(e.key.toLowerCase())) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", blockKeys);

    return () => {
      document.removeEventListener("copy", prevent);
      document.removeEventListener("cut", prevent);
      document.removeEventListener("paste", prevent);
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("selectstart", prevent);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  // --- TIMER ---
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  // --- ANTI CHEAT: AUTO SUBMIT WHEN TAB CHANGED ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !submitted) {
        handleSubmit();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [submitted]);

  // --- ANTI CHEAT: AUTO SUBMIT WHEN WINDOW LOSES FOCUS ---
  useEffect(() => {
    const handleBlur = () => {
      if (!submitted) handleSubmit();
    };

    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, [submitted]);

  // Questions
  const questions = [
    {
      id: 1,
      question: "What is the derivative of x²?",
      options: ["2x²", "2x", "x²/2", "x"],
      correctId: 1
    },
    {
      id: 2,
      question: "Solve for x: 2x + 5 = 15",
      options: ["10", "20", "5", "7.5"],
      correctId: 2
    },
  ];

  const currentQ = questions[currentQuestion];

  const handleOptionSelect = (optionIdx) => {
    setAnswers({ ...answers, [currentQuestion]: optionIdx });
  };

  const handleSubmit = () => {
    if (submitted) return;
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

  // SUBMITTED VIEW
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
          <Button 
            onClick={SwitchtoDashboard} 
            variant="primary" 
            className="w-full bg-cyan-500 hover:bg-cyan-600"
          >
            Return to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  // ACTIVE QUIZ VIEW
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 select-none">

      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-slate-900">Geometry Basics</h1>
            <span className="text-sm text-slate-400 font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          {/* Timer */}
          <div className="bg-cyan-50 text-cyan-700 px-4 py-2 rounded-lg font-mono font-bold text-sm flex items-center gap-2 border border-cyan-100">
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Anti-Cheat Warning */}
      <div className="bg-orange-50 border-b border-orange-100 text-orange-700 px-4 py-3 text-sm text-center flex justify-center items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <span>Anti-cheat enabled: No copying. Changing tabs or windows will auto-submit.</span>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">

        {/* Question */}
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

        {/* Navigation */}
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
      </div>
    </div>
  );
};

export default QuizAttempt;
