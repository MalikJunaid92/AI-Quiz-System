"use client"
import { useState } from "react";
import { 
  Plus, 
  ArrowLeft, 
  FolderOpen, 
  Users, 
  BarChart3, 
  FileText, 
  Calendar
} from "lucide-react";

// --- MOCK SUB-COMPONENTS ---
// These are defined here to prevent import errors in the single-file preview.

const CreateClassroom = ({ onBack }) => (
  <div className="p-8">
    <div className="mb-6">
      <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
    </div>
    <h2 className="text-2xl font-bold">Create Classroom</h2>
    <p className="text-slate-500">Form to create a new classroom would go here.</p>
  </div>
);

const ClassroomDetail = ({ classroomId, onBack }) => (
  <div className="p-8">
    <div className="mb-6">
      <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
    </div>
    <h2 className="text-2xl font-bold">Classroom Detail: {classroomId}</h2>
    <p className="text-slate-500">Details and management for this classroom would go here.</p>
  </div>
);

// --- UI COMPONENTS ---

const Button = ({ className = "", variant = "primary", size = "default", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-teal-500 text-white hover:bg-teal-600 shadow-sm shadow-teal-500/20",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
    ghost: "hover:bg-slate-100 text-slate-600",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
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

const TeacherDashboard = ({ onBack }) => {
  const [view, setView] = useState("list");
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  // Mock Data matching the screenshot
  const classrooms = [
    {
      id: "CLS001",
      name: "Mathematics - Grade 10",
      students: 32,
      quizzes: 5,
      lastActive: "Active 2 hours ago",
      theme: "teal"
    },
    {
      id: "CLS002",
      name: "Physics - Advanced",
      students: 28,
      quizzes: 4,
      lastActive: "Active 5 hours ago",
      theme: "orange"
    },
    {
      id: "CLS003",
      name: "Chemistry Basics",
      students: 35,
      quizzes: 6,
      lastActive: "Active 1 day ago",
      theme: "green"
    }
  ];

  const handleCreateClassroom = () => setView("create");
  
  const handleViewClassroom = (classroomId) => {
    setSelectedClassroom(classroomId);
    setView("detail");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedClassroom(null);
  };

  // Navigation Logic
  if (view === "create") return <CreateClassroom onBack={handleBackToList} />;
  if (view === "detail" && selectedClassroom) return <ClassroomDetail classroomId={selectedClassroom} onBack={handleBackToList} />;

  // Helper for dynamic border colors
  const getThemeColor = (theme) => {
    const colors = {
      teal: "bg-teal-500",
      orange: "bg-orange-500",
      green: "bg-emerald-500"
    };
    return colors[theme] || colors.teal;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} size="icon" className="-ml-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Teacher Dashboard</h1>
                <p className="text-sm text-slate-500">Manage your classrooms and quizzes</p>
              </div>
            </div>
            <Button onClick={handleCreateClassroom}>
              <Plus className="h-4 w-4 mr-2" />
              Create Classroom
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 space-y-10">
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Total Classrooms */}
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-500 rounded-l-xl" />
            <div className="flex items-center justify-between pl-2">
              <div>
                <p className="text-sm text-slate-500 mb-1">Total Classrooms</p>
                <p className="text-4xl font-bold text-slate-900">8</p>
              </div>
              <div className="h-12 w-12 bg-teal-50 rounded-xl flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </Card>

          {/* Card 2: Active Students */}
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500 rounded-l-xl" />
            <div className="flex items-center justify-between pl-2">
              <div>
                <p className="text-sm text-slate-500 mb-1">Active Students</p>
                <p className="text-4xl font-bold text-slate-900">247</p>
              </div>
              <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>

          {/* Card 3: Quizzes Created */}
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 rounded-l-xl" />
            <div className="flex items-center justify-between pl-2">
              <div>
                <p className="text-sm text-slate-500 mb-1">Quizzes Created</p>
                <p className="text-4xl font-bold text-slate-900">34</p>
              </div>
              <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Classrooms Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Your Classrooms</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
              <Card key={classroom.id} className="overflow-hidden flex flex-col">
                {/* Colored Top Border */}
                <div className={`h-1.5 w-full ${getThemeColor(classroom.theme)}`} />
                
                <div className="p-6 flex-1">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900">{classroom.name}</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">{classroom.id}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-slate-500">
                      <Users className="h-4 w-4 mr-3 text-slate-400" />
                      {classroom.students} Students
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <FileText className="h-4 w-4 mr-3 text-slate-400" />
                      {classroom.quizzes} Quizzes
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <Calendar className="h-4 w-4 mr-3 text-slate-400" />
                      {classroom.lastActive}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 mt-auto">
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 h-11"
                    onClick={() => handleViewClassroom(classroom.id)}
                  >
                    Manage Classroom
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;