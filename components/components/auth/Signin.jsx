
import { useState } from "react";
import { Mail, Lock, LogIn, X, GraduationCap, Users } from "lucide-react";

// --- UI COMPONENTS (Shared styles) ---
const Button = ({ className = "", variant = "primary", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none disabled:opacity-50 shadow-sm";
  const variants = {
      primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/25",
      outline: "border border-slate-200 hover:bg-slate-50 text-slate-700",
      ghost: "hover:bg-slate-100 text-slate-700",
      teal: "bg-teal-500 text-white hover:bg-teal-600 shadow-teal-500/25",
      orange: "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/25",
  };
  return <button className={`${base} ${variants[variant] || variants.primary} h-11 px-8 w-full ${className}`} {...props}>{children}</button>;
};

const Input = ({ className = "", icon: Icon, ...props }) => (
  <div className="relative">
    <input 
      className={`flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:border-slate-900 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
      {...props}
    />
  </div>
);

const Label = ({ className = "", children, icon: Icon, ...props }) => (
  <label className={`text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 flex items-center gap-2 mb-2 ${className}`} {...props}>
    {Icon && <Icon className="w-4 h-4 text-slate-900" />}
    {children}
  </label>
);

export default function SignIn({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (role) => {
    // In a real app, you'd validate credentials here
    console.log("Logging in as:", role, { email, password });
    onLogin(role);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-2xl shadow-slate-900/10 relative">
      {onClose && (
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200">
            <LogIn className="w-7 h-7 text-slate-700" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-1">Sign in to access your account</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email" icon={Mail}>Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" icon={Lock}>Password</Label>
              <button type="button" className="text-xs font-medium text-slate-500 hover:text-slate-900 hover:underline">
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button 
            variant="teal" 
            onClick={() => handleSubmit('teacher')}
            className="text-xs md:text-sm"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Teacher Login
          </Button>
          <Button 
            variant="orange" 
            onClick={() => handleSubmit('student')}
            className="text-xs md:text-sm"
          >
            <Users className="w-4 h-4 mr-2" />
            Student Login
          </Button>
        </div>
      </div>
    </div>
  );
}