"use client"
import { useState } from "react";
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  BarChart3, 
  Plus, 
  Download, 
  Clock, 
  Calendar, 
  MoreVertical, 
  FileSpreadsheet, 
  File,
  Search
} from "lucide-react";

// --- UI COMPONENTS ---

const Button = ({ className = "", variant = "primary", size = "default", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-teal-500 text-white hover:bg-teal-600 shadow-sm shadow-teal-500/20",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
    ghost: "hover:bg-slate-100 text-slate-600",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-6 text-base",
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

const Badge = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-600",
    upcoming: "bg-orange-50 text-orange-600 border border-orange-100",
    completed: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    teal: "bg-teal-50 text-teal-600 border border-teal-100",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};

// --- MAIN COMPONENT ---

const ClassroomDetail = ({ classroomId = "CLS001", onBack }) => {
  const [activeTab, setActiveTab] = useState("quizzes"); // 'quizzes' or 'students'

  // Mock Data
  const stats = {
    totalStudents: 32,
    activeQuizzes: 5,
    avgPerformance: 78
  };

  const quizzes = [
    {
      id: "Q001",
      title: "Algebra Fundamentals",
      questions: 15,
      duration: "30 mins",
      attempts: 28,
      avgScore: 82,
      startDate: "2024-01-20 14:30",
      endDate: "2024-01-20 15:30",
      status: "upcoming"
    },
    {
      id: "Q002",
      title: "Geometry Basics",
      questions: 20,
      duration: "45 mins",
      attempts: 32,
      avgScore: 75,
      startDate: "2024-01-18 10:00",
      endDate: "2024-01-18 11:00",
      status: "completed"
    }
  ];

  const students = [
    { id: 1, name: "Alex Johnson", email: "alex.j@school.edu", quizzes: 5, avgScore: 85, initials: "AJ", color: "bg-cyan-100 text-cyan-700" },
    { id: 2, name: "Emma Wilson", email: "emma.w@school.edu", quizzes: 5, avgScore: 92, initials: "EW", color: "bg-purple-100 text-purple-700" },
    { id: 3, name: "Michael Brown", email: "michael.b@school.edu", quizzes: 4, avgScore: 78, initials: "MB", color: "bg-emerald-100 text-emerald-700" },
    { id: 4, name: "Sarah Davis", email: "sarah.d@school.edu", quizzes: 5, avgScore: 88, initials: "SD", color: "bg-orange-100 text-orange-700" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-10">
      
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Mathematics - Grade 10</h1>
                <p className="text-sm text-slate-500">Classroom ID: {classroomId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 space-y-8">

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-500 rounded-l-xl" />
            <div className="flex items-center justify-between pl-2">
              <div>
                <p className="text-sm text-slate-500 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-slate-900">{stats.totalStudents}</p>
              </div>
              <div className="h-10 w-10 bg-cyan-50 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-cyan-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500 rounded-l-xl" />
            <div className="flex items-center justify-between pl-2">
              <div>
                <p className="text-sm text-slate-500 mb-1">Active Quizzes</p>
                <p className="text-3xl font-bold text-slate-900">{stats.activeQuizzes}</p>
              </div>
              <div className="h-10 w-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 rounded-l-xl" />
            <div className="flex items-center justify-between pl-2">
              <div>
                <p className="text-sm text-slate-500 mb-1">Avg. Performance</p>
                <p className="text-3xl font-bold text-slate-900">{stats.avgPerformance}%</p>
              </div>
              <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="bg-slate-100 p-1 rounded-xl inline-flex">
          <button 
            onClick={() => setActiveTab("quizzes")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "quizzes" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Quizzes
          </button>
          <button 
            onClick={() => setActiveTab("students")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "students" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Students
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "quizzes" ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{quiz.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">Quiz ID: {quiz.id}</p>
                    </div>
                    <Badge variant={quiz.status}>{quiz.status === 'upcoming' ? 'Upcoming' : 'Completed'}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
                    <div className="flex items-center text-sm text-slate-500">
                      <FileText className="h-4 w-4 mr-2 text-slate-400" />
                      {quiz.questions} Questions
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="h-4 w-4 mr-2 text-slate-400" />
                      {quiz.duration}
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <Users className="h-4 w-4 mr-2 text-slate-400" />
                      {quiz.attempts} Attempts
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <BarChart3 className="h-4 w-4 mr-2 text-slate-400" />
                      Avg: {quiz.avgScore}%
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-slate-400 border-t border-slate-100 pt-4">
                    <Calendar className="h-3 w-3 mr-2" />
                    {quiz.startDate} - {quiz.endDate}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <File className="h-3 w-3 mr-1" /> PDF
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <FileSpreadsheet className="h-3 w-3 mr-1" /> CSV
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <FileSpreadsheet className="h-3 w-3 mr-1" /> Excel
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Enrolled Students</h3>
                <Button variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-2"/> Export List
                </Button>
            </div>
            {students.map((student) => (
              <Card key={student.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${student.color}`}>
                    {student.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{student.name}</h4>
                    <p className="text-xs text-slate-500">{student.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                   <div className="hidden md:block text-center">
                       <p className="text-xs text-slate-400">Quizzes</p>
                       <p className="font-semibold text-slate-700">{student.quizzes}</p>
                   </div>
                   <div className="hidden md:block text-center">
                       <p className="text-xs text-slate-400">Avg Score</p>
                       <p className="font-semibold text-emerald-600">{student.avgScore}%</p>
                   </div>
                   <Button variant="outline" size="sm">View Profile</Button>
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ClassroomDetail;