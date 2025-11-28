"use client";
import React, { useState } from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  Brain,
  Menu,
  X,
  CheckCircle2,
  
} from "lucide-react";
import { useRouter } from "next/navigation";
import  Contact  from "../components/ui/Contact";

// --- UI Components (Mocking shadcn/ui for single-file portability) ---

const Button = ({
  children,
  className = "",
  variant = "primary",
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary:
      "bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500 shadow-lg shadow-teal-500/30",
    secondary:
      "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 shadow-lg shadow-orange-500/30",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    outline: "border border-slate-200 hover:bg-slate-100 text-slate-700",
    link: "text-slate-600 hover:text-teal-600 underline-offset-4 hover:underline",
  };

  const sizes = "h-10 py-2 px-6 text-sm";

  return (
    <button
      className={`${baseStyles} ${
        variants[variant] || variants.primary
      } ${sizes} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "", onClick }) => (
  <div onClick={onClick} className={`rounded-3xl bg-white ${className}`}>
    {children}
  </div>
);

// --- Mock Dashboards & Auth Components ---







// --- Main Application Component ---

const Index = () => {
  const [userRole, setUserRole] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTeacherSignup, setShowTeacherSignup] = useState(false);
  const [showStudentSignup, setShowStudentSignup] = useState(false);

  const router = useRouter();
  const SwitchtoStudentlogin = () => {
    router.push("/auth/student-signup");
  };
  const SwitchtoTeacherlogin = () => {
    router.push("/auth/teacher-signup");
  };
  
 
 const SwitchtoSignIn = () => {
    router.push("/auth/sign-in");
  };
  

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-100">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-slate-700">
                QuizMaster <span className="text-orange-500">AI</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
               <Button variant="ghost" onClick={SwitchtoSignIn}>Sign In</Button>
              <Button onClick={onclose} className="rounded-full">
                <a href="#maincard">Get Started</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-100 animate-in slide-in-from-top-5">
              <div className="flex flex-col space-y-4 p-2">
                <a
                  href="#features"
                  className="px-4 py-2 hover:bg-slate-50 rounded-lg text-slate-600"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="px-4 py-2 hover:bg-slate-50 rounded-lg text-slate-600"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="px-4 py-2 hover:bg-slate-50 rounded-lg text-slate-600"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  Contact
                </a>
                <div className="h-px bg-slate-100 my-2"></div>
                <button onClick={SwitchtoSignIn} className="px-4 py-2 text-left font-medium text-slate-700">
                  Sign In
                </button>
                <Button className="w-full justify-center">
                  <a href="#maincard">Get Started</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

     

    

      <main className="pt-32 pb-20 px-4 md:px-6 overflow-hidden">
        {/* Background Blobs - Matches the soft gradients in images */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-100/50 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-20 max-w-4xl mx-auto">
            {/* Hero Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-3xl shadow-xl shadow-teal-900/5 flex items-center justify-center border border-slate-100">
                <Brain className="w-10 h-10 md:w-12 md:h-12 text-teal-500" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 tracking-tight">
              QuizMaster <span className="text-teal-500">AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 font-light mb-4">
              Transform Education with AI-Powered Assessments
            </p>

            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Create intelligent quizzes, track performance, and ensure academic
              integrity with advanced anti-cheat technology
            </p>
          </div>

          {/* Portal Cards Section - Replicating Dashboard 2 */}
          <div
            id="maincard"
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24"
          >
            {/* Teacher Portal Card */}
            <Card className="group relative overflow-hidden border-2 border-teal-100 hover:border-teal-400 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-900/10 bg-teal-50/30 p-8 md:p-10">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-8 h-8 text-teal-600" />
                </div>

                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Teacher Portal
                </h2>

                <p className="text-slate-600 mb-8 leading-relaxed">
                  Create intelligent classrooms, generate AI-powered quizzes,
                  and monitor student progress in real-time.
                </p>

                <ul className="space-y-4 mb-10">
                  {[
                    "AI-generated MCQs from any content",
                    "Flexible scheduling & access control",
                    "Automatic grading with analytics",
                    "Question shuffling for security",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-600"
                    >
                      <div className="w-2 h-2 rounded-full bg-teal-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="primary"
                  className="w-full h-12 text-base font-semibold"
                  onClick={SwitchtoTeacherlogin}
                >
                  Continue as Teacher
                </Button>
              </div>
            </Card>

            {/* Student Portal Card */}
            <Card className="group relative overflow-hidden border-2 border-orange-100 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-900/10 bg-orange-50/30 p-8 md:p-10">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>

                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Student Portal
                </h2>

                <p className="text-slate-600 mb-8 leading-relaxed">
                  Join classrooms, take secure quizzes, and get instant feedback
                  on your performance.
                </p>

                <ul className="space-y-4 mb-10">
                  {[
                    "Quick access with classroom ID",
                    "Secure exam environment",
                    "Instant results with feedback",
                    "Track progress across quizzes",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-600"
                    >
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="secondary"
                  className="w-full h-12 text-base font-semibold"
                  onClick={SwitchtoStudentlogin}
                >
                  Continue as Student
                </Button>
              </div>
            </Card>
          </div>

          {/* Features Grid - Replicating Dashboard 3 */}
          <div className="max-w-5xl mx-auto" id="features">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-14 h-14 mx-auto bg-teal-50 rounded-xl flex items-center justify-center mb-6">
                  <BookOpen className="w-7 h-7 text-teal-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">
                  AI-Powered Generation
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Create quizzes from any topic or document instantly with
                  advanced AI models.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-14 h-14 mx-auto bg-teal-50 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-7 h-7 text-teal-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">
                  Smart Auto-Grading
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Instant evaluation with detailed analytics, insights, and
                  performance tracking.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-14 h-14 mx-auto bg-orange-50 rounded-xl flex items-center justify-center mb-6">
                  <GraduationCap className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">
                  Anti-Cheat Security
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Advanced tab monitoring, copy prevention, and secure browser
                  environment.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      {/* About Section */}
<section id="about" className="mt-20 mb-30 relative overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-100/50 rounded-full blur-3xl"></div>
        </div>
  <div className="text-center mb-20">
    <h2 className="text-4xl md:text-5xl font-bold text-slate-700">
      About <span className="text-orange-500">QuizMaster AI</span>
    </h2>
    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
      Revolutionizing education through intelligent assessment technology
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
    {/* Mission Card */}
    <div className="bg-white p-10 rounded-3xl shadow-md border border-slate-100">
      <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6">
        <Brain className="w-8 h-8 text-teal-500" />
      </div>

      <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>

      <p className="text-slate-600 leading-relaxed mb-4">
        QuizMaster AI is designed to empower educators and students with
        cutting-edge assessment tools. We believe in making education more
        accessible, efficient, and secure through the power of artificial
        intelligence.
      </p>

      <p className="text-slate-600 leading-relaxed">
        Our platform combines intuitive design with powerful features to create
        a seamless experience for both teachers and students, ensuring fair and
        accurate evaluations.
      </p>
    </div>

    {/* Why Choose Us Card */}
    <div className="bg-white p-10 rounded-3xl shadow-md border border-slate-100">
      <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
        <GraduationCap className="w-8 h-8 text-orange-500" />
      </div>

      <h3 className="text-2xl font-bold text-slate-800 mb-6">Why Choose Us</h3>

      <ul className="space-y-3 text-slate-600 leading-relaxed">
        <li className="flex items-start gap-3">
          <span className="text-orange-500 text-lg">•</span>
          Advanced AI technology for instant quiz generation
        </li>
        <li className="flex items-start gap-3">
          <span className="text-orange-500 text-lg">•</span>
          Comprehensive anti-cheat measures for exam integrity
        </li>
        <li className="flex items-start gap-3">
          <span className="text-orange-500 text-lg">•</span>
          Real-time analytics and detailed performance insights
        </li>
        <li className="flex items-start gap-3">
          <span className="text-orange-500 text-lg">•</span>
          User-friendly interface for seamless experience
        </li>
        <li className="flex items-start gap-3">
          <span className="text-orange-500 text-lg">•</span>
          Flexible scheduling and classroom management
        </li>
      </ul>
    </div>
    
  </div>
{/* Contact component */}
<Contact/>
</section>

      <footer className="bg-white py-8 border-t border-slate-100" >
        
        <div className="container mx-auto px-6 text-center text-slate-400 text-sm">
          © 2024 QuizMaster AI. Transform your assessment experience.
        </div>
      </footer>
    </div>
  );
};

export default Index;
