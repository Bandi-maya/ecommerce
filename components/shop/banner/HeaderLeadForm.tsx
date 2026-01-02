'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Smile, 
  Phone, 
  Mail, 
  Loader2, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function HeaderLeadForm() {
  // --- State ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    parent: "",
    child: "",
    phone: "",
    email: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // --- Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; 

    if (!formData.parent.trim()) newErrors.parent = "Parent name is required";
    if (!formData.child.trim()) newErrors.child = "Child name is required";
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Enter a valid 10-digit number"; 
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API Call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- Animations ---
  const shakeVariants = {
    idle: { x: 0 },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="lead-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            // LIGHT THEME GLASS EFFECT:
            // bg-white/80 creates the semi-transparent white look
            // backdrop-blur-md blurs the image behind the form
            className="w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/50"
          >
            {/* Header Section */}
            <div className="px-6 py-6 text-center border-b border-gray-100/50 bg-white/40">
              <div className="flex justify-center items-center gap-2 mb-1">
                <div className="bg-orange-100 p-1.5 rounded-full">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                  Unlock Their Potential
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                Book a <span className="text-orange-600 font-semibold">Free Counseling Session</span> now!
              </p>
            </div>

            {/* Form Section */}
            <motion.form
              onSubmit={handleSubmit}
              className="px-6 py-6 space-y-4"
              variants={shakeVariants}
              animate={Object.keys(errors).length > 0 ? "shake" : "idle"}
            >
              {/* Parent Name */}
              <InputField 
                id="parent"
                name="parent"
                label="Parent's Name"
                icon={User}
                value={formData.parent}
                onChange={handleChange}
                error={errors.parent}
              />

              {/* Child Name */}
              <InputField 
                id="child"
                name="child"
                label="Child's Name"
                icon={Smile}
                value={formData.child}
                onChange={handleChange}
                error={errors.child}
              />

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField 
                  id="phone"
                  name="phone"
                  label="Phone No."
                  icon={Phone}
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  type="tel"
                />
                
                <InputField 
                  id="email"
                  name="email"
                  label="Email ID"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  type="email"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full h-12 flex items-center justify-center text-base font-bold text-white rounded-xl overflow-hidden
                  bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
                  shadow-lg shadow-orange-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Book Free Session</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </button>
                <p className="text-xs text-center text-gray-500 mt-3 font-medium">
                  No credit card required • Limited spots available
                </p>
              </div>
            </motion.form>
          </motion.div>
        ) : (
          /* Success State - Light Theme */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-white/50"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              Thanks <strong className="text-gray-900">{formData.parent}</strong>! We have booked a spot for <strong className="text-gray-900">{formData.child}</strong>. We'll call you shortly at <span className="text-gray-900 font-medium">{formData.phone}</span>.
            </p>
            <button 
              onClick={() => {
                setSuccess(false);
                setFormData({ parent: "", child: "", phone: "", email: "" });
              }}
              className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center justify-center gap-2 mx-auto uppercase tracking-wide"
            >
              Submit another response
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Styled Input Component - LIGHT THEME OPTIMIZED
const InputField = ({ 
  id, name, label, icon: Icon, value, onChange, error, type = "text" 
}: any) => (
  <div className="relative">
    <div className="relative group">
      {/* Icon Color: Gray by default, Orange on focus */}
      <Icon className={`absolute left-3.5 top-3.5 w-5 h-5 transition-colors duration-200 z-10
        ${error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-orange-500'}`} 
      />
      
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        // Input Styles: White/Light Gray background, Dark text
        className={`peer w-full pl-10 pr-3 pt-5 pb-2 rounded-xl outline-none text-gray-900 font-medium transition-all duration-200
          placeholder-transparent border-2
          ${error
            ? "border-red-200 bg-red-50 focus:border-red-500"
            : "bg-white/50 border-gray-200 focus:bg-white focus:border-orange-500 focus:shadow-[0_4px_10px_rgba(249,115,22,0.1)] hover:border-gray-300"
          }`}
      />
      
      {/* Floating Label: Gray text */}
      <label
        htmlFor={id}
        className={`absolute left-10 top-3.5 text-gray-500 text-sm transition-all duration-200 origin-[0] pointer-events-none
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
          peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-orange-600 peer-focus:font-semibold
          peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-2.5
          ${error ? "text-red-500 peer-focus:text-red-500" : ""}
        `}
      >
        {label}
      </label>
    </div>
    {error && (
      <p className="text-xs text-red-500 mt-1 ml-1 font-semibold flex items-center animate-pulse">
        {error}
      </p>
    )}
  </div>
);