import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { GraduationCap, Mail, Lock, Building2, BookOpen } from "lucide-react";
import { useToast } from "../hooks/use-toast";

export function TeacherSignup({ onClose }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    education: "",
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
      description: "Welcome to QuizMaster AI, Teacher!",
    });

    console.log("Teacher signup data:", formData);
    onClose();
  };

  return (
    <Card className="w-full max-w-lg border-primary/20">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Teacher Sign Up</CardTitle>
        </div>
        <CardDescription>
          Create your account to start creating AI-powered quizzes
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Dr. John Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john.smith@university.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* University */}
          <div className="space-y-2">
            <Label htmlFor="university" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" /> University
            </Label>
            <Input
              id="university"
              placeholder="University of Science"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              required
            />
          </div>

          {/* Education Level */}
          <div className="space-y-2">
            <Label htmlFor="education" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Education Level
            </Label>
            <Select
              value={formData.education}
              onValueChange={(value) => setFormData({ ...formData, education: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                <SelectItem value="masters">Master's Degree</SelectItem>
                <SelectItem value="phd">Ph.D.</SelectItem>
                <SelectItem value="postdoc">Post-Doctorate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" /> Password
            </Label>
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
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

          <Button type="submit" className="w-full gradient-primary text-white">
            Create Teacher Account
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <button type="button" className="text-primary hover:underline">
              Sign In
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
