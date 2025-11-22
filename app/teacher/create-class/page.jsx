"use client"
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

// --- MOCK UI COMPONENTS (Teal Theme) ---

const Button = ({ className = "", variant = "primary", size = "default", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-teal-500 text-white hover:bg-teal-600 shadow-sm shadow-teal-500/20",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
    ghost: "hover:bg-slate-100 text-slate-600",
  };

  const sizes = {
    default: "h-11 px-6 text-sm",
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
  <label className={`text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900 mb-2 block ${className}`} {...props}>
    {children}
  </label>
);

const Card = ({ className = "", children, ...props }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const useToast = () => ({
    toast: ({ title, description }) => alert(`${title}\n${description}`)
});

// --- MAIN COMPONENT ---

const CreateClassroom = ({ onBack }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subject: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Classroom Created!",
      description: `${formData.name} has been successfully created.`,
    });
    if (onBack) onBack();
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
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Create New Classroom</h1>
            <p className="text-xs text-slate-500">Set up a new classroom for your students</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <Card className="p-8 shadow-lg shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Classroom Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Mathematics - Grade 10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics, Physics, Chemistry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add a brief description about this classroom..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={onBack} className="min-w-[100px]">
                Cancel
              </Button>
              <Button type="submit" className="min-w-[180px]">
                <Save className="h-4 w-4 mr-2" />
                Create Classroom
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateClassroom;