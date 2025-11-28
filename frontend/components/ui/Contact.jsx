"use client"
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

// --- UI COMPONENTS (Teal Theme) ---

const Button = ({ className = "", variant = "primary", size = "default", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-teal-400 text-white hover:bg-teal-500 shadow-sm shadow-teal-500/20", // Matches screenshot button
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
  };

  const sizes = {
    default: "h-12 px-6 text-base", // Slightly taller for the main action
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
      className={`flex h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/20 focus-visible:border-teal-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
      {...props}
    />
  </div>
);

const Textarea = ({ className = "", ...props }) => (
  <div className="relative">
    <textarea 
      className={`flex min-h-[160px] w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/20 focus-visible:border-teal-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-y ${className}`}
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
  <div className={`bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/40 ${className}`} {...props}>
    {children}
  </div>
);

// --- MAIN COMPONENT ---

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (Demo)");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="pt-20 bg-gradient-to-br from-slate-50 via-white to-teal-50/20 font-sans text-slate-900" id="contact">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">Touch</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <Card className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                placeholder="How can we help you?" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Tell us more about your inquiry..." 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            {/* Submit Button */}
            <Button className="w-full text-base font-semibold tracking-wide">
              Send Message
            </Button>
          </form>

          {/* Divider */}
          <div className="my-10 border-t border-slate-100"></div>

          {/* Contact Info Grid */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            
            {/* Email */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
              <p className="text-sm text-slate-500">support@quizmaster.ai</p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
              <p className="text-sm text-slate-500">+1 (555) 123-4567</p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Location</h3>
              <p className="text-sm text-slate-500">Global Platform</p>
            </div>

          </div>
        </Card>

      </div>
    </section>
  );
};

export default ContactSection;