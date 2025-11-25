"use client"
import { useState } from "react";
import { Users, Mail, Lock, Building2, BookOpen, User, UserCheck, ChevronDown, X } from "lucide-react";

// --- MOCK UI COMPONENTS (Copying the style from your screenshot) ---
// In your real project, you can keep your imports or update your UI component styles.

const Button = ({ className = "", variant = "default", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none disabled:opacity-50 shadow-sm";
  const variants = {
      default: "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/25 hover:shadow-orange-500/40", // Student Orange Theme
      outline: "border border-slate-200 hover:bg-slate-50 text-slate-700",
  };
  return <button className={`${base} ${variants[variant] || variants.default} h-11 px-8 w-full ${className}`} {...props}>{children}</button>;
};

const Input = ({ className = "", icon: Icon, ...props }) => (
  <div className="relative">
    <input 
      className={`flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
      {...props}
    />
  </div>
);

const Label = ({ className = "", children, icon: Icon, ...props }) => (
  <label className={`text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 flex items-center gap-2 mb-2 ${className}`} {...props}>
    {Icon && <Icon className="w-4 h-4 text-orange-500" />}
    {children}
  </label>
);

const Select = ({ value, onValueChange, children }) => {
    // Simplified Select for preview purposes
    return (
        <div className="relative">
            <select 
                value={value} 
                onChange={(e) => onValueChange(e.target.value)}
                className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all duration-200"
            >
                {children}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
        </div>
    );
};

const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;
const SelectTrigger = ({ children }) => <>{children}</>; // No-op for native select mock
const SelectValue = ({ placeholder }) => <option value="" disabled>{placeholder}</option>;
const SelectContent = ({ children }) => <>{children}</>; // No-op for native select mock

const Card = ({ className = "", children }) => <div className={`bg-white ${className}`}>{children}</div>;
const CardHeader = ({ className = "", children }) => <div className={`space-y-1.5 p-1 ${className}`}>{children}</div>;
const CardTitle = ({ className = "", children }) => <h3 className={`text-2xl font-bold leading-none tracking-tight text-slate-900 ${className}`}>{children}</h3>;
const CardDescription = ({ className = "", children }) => <p className={`text-sm text-slate-500 ${className}`}>{children}</p>;
const CardContent = ({ className = "", children }) => <div className={`p-1 pt-0 ${className}`}>{children}</div>;

// Mock Toast
const useToast = () => ({
    toast: ({ title, description }) => alert(`${title}\n${description}`)
});

// --- END MOCKS ---

export default function StudentSignup({ onClose }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    password: "",
    confirmPassword: "",
    subject: "",
    department: "",
    university: "",
    semester: "",
    shift: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sign up successful!",
      description: "Welcome to QuizMaster AI, Student!",
    });

    console.log("Student signup data:", formData);
    if (onClose) onClose();
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-2xl shadow-orange-900/10 relative">
      {/* Close button for the modal context */}
      {onClose && (
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-5 h-5" />
        </button>
      )}

      <Card className="w-full border-0 shadow-none">
        <CardHeader className="space-y-2 pb-8">
          <div className="flex items-center gap-4 mb-2">
            {/* Updated Icon Container to match screenshot style but with Student Orange */}
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center border border-orange-200">
              <Users className="w-7 h-7 text-orange-600" />
            </div>
            <div>
                <CardTitle className="text-3xl">Student Sign Up</CardTitle>
                <CardDescription className="text-base mt-1">
                    Create your account to join classrooms and take quizzes
                </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <Label htmlFor="name" icon={User}>Full Name</Label>
                <Input
                  id="name"
                  placeholder="Ahmed Ali"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="fatherName" icon={UserCheck}>Father's Name</Label>
                <Input
                  id="fatherName"
                  placeholder="Mohammad Ali"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Email Section */}
            <div className="space-y-1">
              <Label htmlFor="email" icon={Mail}>Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="ahmed.ali@student.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {/* Academic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <Label htmlFor="subject" icon={BookOpen}>Subject</Label>
                <Input
                  id="subject"
                  placeholder="Computer Science"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="department" icon={Building2}>Department</Label>
                <Input
                  id="department"
                  placeholder="Software Engineering"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* University Section */}
            <div className="space-y-1">
              <Label htmlFor="university" icon={Building2}>University Name</Label>
              <Input
                id="university"
                placeholder="University of Science & Technology"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                required
              />
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <Label htmlFor="semester" icon={BookOpen}>Semester</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value) => setFormData({ ...formData, semester: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <SelectItem key={sem} value={sem.toString()}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="shift" icon={Users}>Shift</Label>
                <Select
                  value={formData.shift}
                  onValueChange={(value) => setFormData({ ...formData, shift: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Password Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <Label htmlFor="password" icon={Lock}>Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword" icon={Lock}>Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="pt-4">
                <Button type="submit" className="w-full text-base h-12">
                Create Student Account
                </Button>
            </div>

            <p className="text-sm text-slate-500 text-center pt-2">
              Already have an account?{" "}
              <button type="button" className="text-orange-600 font-semibold hover:underline">
                Sign In
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}