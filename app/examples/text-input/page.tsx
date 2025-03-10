"use client";

import React, { useState } from 'react';
import { ArrowLeft, Search, Mail, Lock, Eye, EyeOff, AlertCircle, Check, User, DollarSign } from 'lucide-react';
import Link from 'next/link';

// Since we don't have the actual TextInput component implementation,
// we'll create a simplified version for demonstration purposes
const TextInput = ({ 
  placeholder, 
  size = "md", 
  type = "text", 
  style = "default", 
  error = false, 
  feedbackIcon = false, 
  feedbackIconType, 
  prefix = false, 
  suffix = false, 
  icon, 
  disabled = false, 
  readonly = false,
  value: initialValue = "",
  onChange,
  ...props 
}) => {
  const [value, setValue] = useState(initialValue);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const sizeClasses = {
    sm: "h-8 text-xs px-3",
    md: "h-10 text-sm px-4",
    lg: "h-12 text-base px-4"
  };
  
  const styleClasses = {
    default: "bg-background border-input",
    lighter: "bg-gray-50 border-gray-200",
    darker: "bg-gray-100 border-gray-300"
  };
  
  const feedbackIconMap = {
    success: <Check className="h-4 w-4 text-green-500" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />,
    warning: <AlertCircle className="h-4 w-4 text-amber-500" />
  };
  
  const actualType = type === "password" && showPassword ? "text" : type;
  
  return (
    <div className="space-y-2">
      <div className={`
        flex items-center relative rounded-md 
        ${sizeClasses[size]} 
        ${styleClasses[style]} 
        ${error ? 'border-red-500' : 'border'} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
        ${readonly ? 'bg-gray-100' : ''}
        ${feedbackIcon ? 'pr-10' : ''}
        ${prefix ? 'pl-10' : ''}
      `}>
        {prefix && icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        
        <input
          type={actualType}
          className={`
            w-full h-full bg-transparent border-none focus:outline-none focus:ring-0
            ${prefix ? 'pl-7' : ''}
            ${suffix || type === "password" ? 'pr-10' : ''}
            ${disabled || readonly ? 'cursor-not-allowed' : ''}
          `}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readonly}
          {...props}
        />
        
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
        
        {suffix && icon && type !== "password" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        
        {feedbackIcon && feedbackIconType && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {feedbackIconMap[feedbackIconType]}
          </div>
        )}
      </div>
      
      {error && typeof error === 'string' && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
};

export default function TextInputExamplePage() {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    search: '',
    amount: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const handleChange = (field) => (e) => {
    setFormValues({
      ...formValues,
      [field]: e.target.value
    });
    
    // Clear error when typing
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formValues.username) {
      errors.username = 'Username is required';
    }
    
    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formValues.password) {
      errors.password = 'Password is required';
    } else if (formValues.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  };
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Examples
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">TextInput Component</h1>
          <p className="text-muted-foreground mb-8">
            Text inputs allow users to enter and edit text.
          </p>
        </div>

        <div className="space-y-12">
          {/* Basic Text Inputs */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Basic Text Inputs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <TextInput placeholder="Default input" />
              </div>
              <div>
                <TextInput placeholder="Disabled input" disabled />
              </div>
              <div>
                <TextInput placeholder="Read-only input" readonly value="Read-only value" />
              </div>
              <div>
                <TextInput placeholder="With error" error="This field is required" />
              </div>
            </div>
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
            <div className="space-y-4">
              <TextInput placeholder="Small input" size="sm" />
              <TextInput placeholder="Medium input" size="md" />
              <TextInput placeholder="Large input" size="lg" />
            </div>
          </section>

          {/* Styles */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Styles</h2>
            <div className="space-y-4">
              <TextInput placeholder="Default style" style="default" />
              <TextInput placeholder="Lighter style" style="lighter" />
              <TextInput placeholder="Darker style" style="darker" />
            </div>
          </section>

          {/* Input Types */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Input Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <TextInput placeholder="Text input" type="text" />
              </div>
              <div>
                <TextInput placeholder="Password input" type="password" />
              </div>
              <div>
                <TextInput placeholder="Number input" type="number" />
              </div>
              <div>
                <TextInput placeholder="Email input" type="email" />
              </div>
            </div>
          </section>

          {/* With Icons */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
            <div className="space-y-4">
              <TextInput 
                placeholder="Search..." 
                prefix={true} 
                icon={<Search className="h-4 w-4" />} 
              />
              <TextInput 
                placeholder="Enter email" 
                prefix={true} 
                icon={<Mail className="h-4 w-4" />} 
              />
              <TextInput 
                placeholder="Enter password" 
                type="password" 
                prefix={true} 
                icon={<Lock className="h-4 w-4" />} 
              />
              <TextInput 
                placeholder="Enter amount" 
                prefix={true} 
                icon={<DollarSign className="h-4 w-4" />} 
              />
            </div>
          </section>

          {/* With Feedback Icons */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">With Feedback Icons</h2>
            <div className="space-y-4">
              <TextInput 
                placeholder="Valid input" 
                feedbackIcon={true} 
                feedbackIconType="success" 
                value="john.doe@example.com"
              />
              <TextInput 
                placeholder="Invalid input" 
                feedbackIcon={true} 
                feedbackIconType="error" 
                error="Please enter a valid email"
                value="invalid-email"
              />
              <TextInput 
                placeholder="Warning input" 
                feedbackIcon={true} 
                feedbackIconType="warning" 
                value="Password is weak"
              />
            </div>
          </section>

          {/* Usage Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Example: Sign Up Form</h2>
            <div className="bg-card border rounded-lg p-6 max-w-md">
              <h3 className="text-xl font-medium mb-4">Create an Account</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <TextInput 
                    placeholder="Enter username" 
                    prefix={true} 
                    icon={<User className="h-4 w-4" />}
                    value={formValues.username}
                    onChange={handleChange('username')}
                    error={formErrors.username}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <TextInput 
                    placeholder="Enter email" 
                    type="email"
                    prefix={true} 
                    icon={<Mail className="h-4 w-4" />}
                    value={formValues.email}
                    onChange={handleChange('email')}
                    error={formErrors.email}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <TextInput 
                    placeholder="Enter password" 
                    type="password"
                    prefix={true} 
                    icon={<Lock className="h-4 w-4" />}
                    value={formValues.password}
                    onChange={handleChange('password')}
                    error={formErrors.password}
                  />
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}