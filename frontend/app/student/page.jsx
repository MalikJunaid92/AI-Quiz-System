"use client"
import { useState } from "react";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// --- MOCK UI COMPONENTS (Matches screenshots) ---

const Button = ({ className = "", variant = "primary", size = "default", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-sm", // Join Button
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm", // Start Now
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700", // View Results
    ghost: "hover:bg-slate-100 text-slate-600", // Back button
    disabled: "bg-slate-100 text-slate-500 border border-slate-200", // Available at...
  };

 

  const sizes = {
    default: "h-11 px-6 text-sm",
    icon: "h-10 w-10",
    sm: "h-9 px-4 text-xs",
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

const Input = ({ className = "", ...props }) => (
  <div className="relative w-full">
    <input 
      className={`flex h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
      {...props}
    />
  </div>
);

const Card = ({ className = "", children, ...props }) => (
  <div className={`bg-white rounded-xl border border-slate-100 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ variant = "default", children, className="" }) => {
  const variants = {
    warning: "bg-amber-50 text-amber-600 border-amber-100", // Coming Soon
    success: "bg-emerald-50 text-emerald-600 border-emerald-100", // Active
    info: "bg-cyan-50 text-cyan-600 border-cyan-100", // Classroom ID / Completed
  };
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${variants[variant] || variants.info} ${className}`}>
      {children}
    </span>
  );
};

// --- MAIN COMPONENT ---

const StudentDashboard = ({ onBack }) => {
  const [classroomId, setClassroomId] = useState("");
  const [joinedClassrooms, setJoinedClassrooms] = useState([
    { id: "CLS001", name: "Mathematics - Grade 10", teacher: "Dr. Sarah Johnson" },
    { id: "CLS002", name: "Physics - Advanced", teacher: "Prof. Michael Chen" },
  ]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const quizzes = [
    {
      id: "Q001",
      classroomId: "CLS001",
      title: "Algebra Fundamentals",
      questions: 15,
      duration: 30,
      startTime: "2024-01-20T14:30:00",
      endTime: "2024-01-20T15:30:00",
      status: "upcoming",
    },
    {
      id: "Q002",
      classroomId: "CLS001",
      title: "Geometry Basics",
      questions: 20,
      duration: 45,
      startTime: "2024-01-18T10:00:00",
      endTime: "2024-01-18T11:00:00",
      status: "active",
    },
    {
      id: "Q003",
      classroomId: "CLS002",
      title: "Newton's Laws",
      questions: 12,
      duration: 25,
      startTime: "2024-01-15T13:00:00",
      endTime: "2024-01-15T14:00:00",
      status: "completed",
      score: 85,
    },
  ];

  const handleJoinClassroom = () => {
    if (classroomId.trim()) {
      setJoinedClassrooms([...joinedClassrooms, {
        id: classroomId,
        name: "New Classroom",
        teacher: "Teacher Name"
      }]);
      setClassroomId("");
    }
  };

    const router=useRouter()
      const Switchtoquizattempt=()=>{
        router.push("student/quiz-attempt")
      }

  // --- Helper to render quiz status and action button ---
  const renderQuizAction = (quiz) => {
    if (quiz.status === 'upcoming') {
      return (
        <Button variant="disabled" className="w-full md:w-auto cursor-not-allowed opacity-80">
          Available at {new Date(quiz.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Button>
      );
    }
    if (quiz.status === 'active') {
      return (
        <Button 
            variant="success" 
            className="w-full md:w-auto"
            onClick={Switchtoquizattempt}
        >
          Start Now
        </Button>
      );
    }
    if (quiz.status === 'completed') {
      return (
        <Button variant="outline" className="w-full md:w-auto">
          View Results
        </Button>
      );
    }
  };

  const renderStatusBadge = (status) => {
      if (status === 'upcoming') return <Badge variant="warning"><Clock className="w-3 h-3" /> Coming Soon</Badge>;
      if (status === 'active') return <Badge variant="success"><AlertCircle className="w-3 h-3" /> Active Now</Badge>;
      if (status === 'completed') return <Badge variant="info"><CheckCircle2 className="w-3 h-3" /> Completed</Badge>;
  };

  // Format date string nicely
  const formatDate = (dateString) => {
      const date = new Date(dateString);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  if (selectedQuiz) {
    // Placeholder for quiz attempt view
    return <div className="p-8">Quiz Interface would go here... <Button onClick={() => setSelectedQuiz(null)}>Back</Button></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Student Dashboard</h1>
            <p className="text-xs text-slate-500">View and attempt your quizzes</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-10 max-w-5xl">

        {/* Join Classroom Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Join a Classroom</h2>
          <Card className="p-6 bg-white">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Enter Classroom ID (e.g., CLS001)"
                value={classroomId}
                onChange={(e) => setClassroomId(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleJoinClassroom} className="w-full sm:w-auto min-w-[100px]">
                Join
              </Button>
            </div>
          </Card>
        </section>

        {/* My Classrooms Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">My Classrooms</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {joinedClassrooms.map((classroom) => (
              <Card key={classroom.id} className="p-5 flex justify-between items-start hover:shadow-md transition-shadow duration-200 cursor-default bg-white">
                <div>
                  <h3 className="font-semibold text-slate-900 text-base">{classroom.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{classroom.teacher}</p>
                </div>
                <Badge variant="info" className="shrink-0 uppercase tracking-wider text-[10px]">
                  {classroom.id}
                </Badge>
              </Card>
            ))}
          </div>
        </section>

        {/* Available Quizzes Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Available Quizzes</h2>
          <div className="space-y-4">
            {quizzes.map((quiz) => {
              const classroom = joinedClassrooms.find(c => c.id === quiz.classroomId);
              const isActive = quiz.status === "active";
              const isCompleted = quiz.status === "completed";

              return (
                <Card 
                  key={quiz.id} 
                  className={`p-6 transition-all duration-200 bg-white overflow-hidden relative ${isActive ? 'ring-1 ring-emerald-500/20 shadow-lg shadow-emerald-500/5' : 'hover:shadow-md'}`}
                >
                  {/* Green Left Border for Active items (simulated with absolute div) */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 rounded-l-xl"></div>
                  )}

                  <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${isActive ? 'pl-2' : ''}`}>
                    
                    {/* Left Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900">{quiz.title}</h3>
                        {renderStatusBadge(quiz.status)}
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-slate-500">{classroom?.name}</p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
                           <span className="flex items-center gap-1.5">
                             {quiz.questions} questions
                           </span>
                           <span className="flex items-center gap-1.5">
                             {quiz.duration} minutes
                           </span>
                           <span className="flex items-center gap-1.5">
                             {formatDate(quiz.startTime)}
                           </span>
                        </div>
                      </div>

                      {/* Score display for completed items */}
                      {isCompleted && quiz.score !== undefined && (
                        <div className="mt-2 inline-block">
                           <span className="text-sm font-semibold text-slate-700">
                             Your Score: <span className="text-emerald-600">{quiz.score}%</span>
                           </span>
                        </div>
                      )}
                    </div>

                    {/* Right Action */}
                    <div className="w-full md:w-auto shrink-0">
                      {renderQuizAction(quiz)}
                    </div>

                  </div>
                </Card>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default StudentDashboard;