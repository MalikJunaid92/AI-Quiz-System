"use client"
import { useState } from "react";
import { 
  ArrowLeft, 
  Sparkles, 
  Upload, 
  FileText, 
  Calendar, 
  Clock, 
  Download,
  X
} from "lucide-react";

// --- UI COMPONENTS (Teal Theme) ---

const Button = ({ className = "", variant = "primary", size = "default", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-teal-400 text-white hover:bg-teal-500 shadow-sm shadow-teal-500/20", // Main actions
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
    ghost: "hover:bg-slate-100 text-slate-600",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
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

const Input = ({ className = "", ...props }) => (
  <div className="relative">
    <input 
      className={`flex h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/20 focus-visible:border-teal-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
      {...props}
    />
  </div>
);

const Textarea = ({ className = "", ...props }) => (
  <div className="relative">
    <textarea 
      className={`flex min-h-[120px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/20 focus-visible:border-teal-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-y ${className}`}
      {...props}
    />
  </div>
);

const Label = ({ className = "", children, ...props }) => (
  <label className={`text-sm font-semibold leading-none text-slate-900 mb-2 block ${className}`} {...props}>
    {children}
  </label>
);

const Card = ({ className = "", children, ...props }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

// Mock Tabs Component
const Tabs = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={className}>
      {Array.isArray(children) 
        ? children.map(child => {
            if (child.type === TabsList) {
              return <TabsList key="list" activeTab={activeTab} setActiveTab={setActiveTab}>{child.props.children}</TabsList>;
            }
            if (child.type === TabsContent) {
              return activeTab === child.props.value ? <div key={child.props.value}>{child.props.children}</div> : null;
            }
            return null;
          })
        : children
      }
    </div>
  );
};

const TabsList = ({ children, activeTab, setActiveTab }) => (
  <div className="inline-flex h-12 items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-500 w-full mb-6">
    {Array.isArray(children) ? children.map(child => 
      <button
        key={child.props.value}
        onClick={() => setActiveTab(child.props.value)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full h-full ${activeTab === child.props.value ? 'bg-white text-slate-950 shadow-sm' : 'hover:text-slate-900'}`}
      >
        {child.props.children}
      </button>
    ) : null}
  </div>
);

const TabsTrigger = ({ children, value }) => <>{children}</>; 
const TabsContent = ({ children, value }) => <>{children}</>;

const useToast = () => ({
    toast: ({ title, description }) => alert(`${title}\n${description}`)
});

// --- MAIN COMPONENT ---

const CreateQuiz = ({ classroomId = "CLS002", onBack }) => {
  const { toast } = useToast();
  const [quizData, setQuizData] = useState({
    title: "",
    numQuestions: 10,
    topic: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    duration: 30,
  });

  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  const handleGenerateAI = () => {
    const mockQuestions = Array.from({ length: quizData.numQuestions }, (_, i) => ({
      id: i + 1,
      question: `Sample question ${i + 1} about ${quizData.topic}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
    }));
    setGeneratedQuestions(mockQuestions);
    toast({
      title: "Questions Generated!",
      description: `${quizData.numQuestions} AI-generated questions are ready.`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Create New Quiz</h1>
            <p className="text-xs text-slate-500">Classroom: {classroomId}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Column: Details & Schedule */}
          <div className="space-y-6">
            
            {/* Quiz Details Card */}
            <Card className="p-6 md:p-8">
              <h2 className="text-lg font-bold mb-6 text-slate-900">Quiz Details</h2>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="title">Quiz Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Algebra Fundamentals"
                    value={quizData.title}
                    onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="numQuestions">Number of Questions *</Label>
                  <Input
                    id="numQuestions"
                    type="number"
                    min="1"
                    max="50"
                    value={quizData.numQuestions}
                    onChange={(e) => setQuizData({ ...quizData, numQuestions: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="5"
                    value={quizData.duration}
                    onChange={(e) => setQuizData({ ...quizData, duration: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </Card>

            {/* Schedule Card */}
            <Card className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-teal-500" />
                <h2 className="text-lg font-bold text-slate-900">Schedule</h2>
              </div>
              
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={quizData.startDate}
                      onChange={(e) => setQuizData({ ...quizData, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={quizData.startTime}
                      onChange={(e) => setQuizData({ ...quizData, startTime: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={quizData.endDate}
                      onChange={(e) => setQuizData({ ...quizData, endDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={quizData.endTime}
                      onChange={(e) => setQuizData({ ...quizData, endTime: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Generation Method */}
          <div className="space-y-6">
            <Card className="p-6 md:p-8 h-full">
              <Tabs defaultValue="ai" className="w-full">
                <TabsList>
                  <TabsTrigger value="ai">AI Generate</TabsTrigger>
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                </TabsList>

                <TabsContent value="ai">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="topic">Topic / Content</Label>
                      <Textarea
                        id="topic"
                        placeholder="Enter the topic or paste content for AI to generate questions from..."
                        value={quizData.topic}
                        onChange={(e) => setQuizData({ ...quizData, topic: e.target.value })}
                        className="min-h-[200px]"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleGenerateAI}
                      className="w-full"
                      disabled={!quizData.topic}
                      size="lg"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Questions with AI
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="upload">
                  <div className="h-[320px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-8 text-center">
                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                       <Upload className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload documents, slides, or PDFs</h3>
                    <p className="text-sm text-slate-500 mb-8 max-w-xs">
                      Drag and drop your files here or click to browse
                    </p>
                    
                    <Button variant="outline" className="bg-white">
                      <FileText className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                    
                    <p className="text-xs text-slate-400 mt-8">
                      Supported formats: PDF, DOCX, PPTX, TXT
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Generated Questions Preview (Conditional) */}
            {generatedQuestions.length > 0 && (
              <Card className="p-6 shadow-lg shadow-slate-200/50 border-teal-100 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                    <h3 className="font-semibold text-slate-900">Generated Preview</h3>
                  </div>
                  <span className="text-xs text-slate-500">{generatedQuestions.length} questions ready</span>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {generatedQuestions.slice(0, 3).map((q) => (
                    <div key={q.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-sm font-medium text-slate-900 mb-2">{q.question}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt, idx) => (
                          <div key={idx} className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-100">
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {generatedQuestions.length > 3 && (
                    <p className="text-xs text-center text-slate-400 italic pt-2">
                      + {generatedQuestions.length - 3} more questions
                    </p>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
          <Button variant="outline" onClick={onBack} className="min-w-[120px] h-12 text-base">
            Cancel
          </Button>
          <Button 
            className="min-w-[200px] h-12 text-base bg-teal-400 hover:bg-teal-500"
            disabled={!quizData.title || (generatedQuestions.length === 0 && !quizData.topic)}
          >
            Create Quiz
          </Button>
        </div>

      </div>
    </div>
  );
};

export default CreateQuiz;