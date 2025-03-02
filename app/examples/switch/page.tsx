"use client";

import React, { useState } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Since we don't have the actual Switch component implementation,
// we'll create a simplified version for demonstration purposes
const Switch = ({ 
  checked = false, 
  onChange, 
  disabled = false, 
  label, 
  helperText,
  alertMessage = false,
  alertText,
  color = "default"
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  
  const handleChange = (e) => {
    if (disabled) return;
    
    setIsChecked(!isChecked);
    if (onChange) onChange(e);
  };
  
  const colorClasses = {
    default: "bg-primary",
    brand: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-amber-600",
    error: "bg-red-600",
  };
  
  return (
    <div className="flex flex-col space-y-2">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
          />
          <div
            className={`block w-10 h-6 rounded-full ${
              isChecked 
                ? disabled 
                  ? "bg-gray-400" 
                  : colorClasses[color] 
                : "bg-gray-300"
            } transition-colors duration-200`}
          ></div>
          <div
            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${
              isChecked ? "translate-x-4" : "translate-x-0"
            } ${disabled ? "opacity-90" : ""}`}
          ></div>
        </div>
        {label && (
          <span className={`ml-3 ${disabled ? "opacity-50" : ""}`}>
            {label}
          </span>
        )}
      </label>
      
      {helperText && !alertMessage && (
        <p className="text-sm text-muted-foreground ml-13">
          {helperText}
        </p>
      )}
      
      {alertMessage && alertText && (
        <div className="flex items-start mt-1">
          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
          <p className="text-sm text-red-500">
            {alertText}
          </p>
        </div>
      )}
    </div>
  );
};

export default function SwitchExamplePage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    updates: false
  });
  
  const handleChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Examples
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">Switch Component</h1>
          <p className="text-muted-foreground mb-8">
            Switches toggle the state of a single setting on or off.
          </p>
        </div>

        <div className="space-y-12">
          {/* Basic Switch */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Basic Switch</h2>
            <div className="space-y-4">
              <Switch label="Default Switch" />
              <Switch label="Checked Switch" checked={true} />
            </div>
          </section>

          {/* Colors */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Colors</h2>
            <div className="space-y-4">
              <Switch label="Default" checked={true} color="default" />
              <Switch label="Brand" checked={true} color="brand" />
              <Switch label="Success" checked={true} color="success" />
              <Switch label="Warning" checked={true} color="warning" />
              <Switch label="Error" checked={true} color="error" />
            </div>
          </section>

          {/* With Helper Text */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">With Helper Text</h2>
            <div className="space-y-4">
              <Switch 
                label="Email notifications" 
                helperText="Receive email notifications when someone mentions you"
                checked={true}
              />
              <Switch 
                label="Push notifications" 
                helperText="Receive push notifications on your mobile device"
                checked={false}
              />
            </div>
          </section>

          {/* With Error Message */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">With Error Message</h2>
            <div className="space-y-4">
              <Switch 
                label="Accept terms and conditions" 
                alertMessage={true}
                alertText="You must accept the terms and conditions to continue"
              />
            </div>
          </section>

          {/* Disabled State */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Disabled State</h2>
            <div className="space-y-4">
              <Switch 
                label="Disabled unchecked" 
                disabled={true}
              />
              <Switch 
                label="Disabled checked" 
                checked={true}
                disabled={true}
              />
            </div>
          </section>

          {/* Usage Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Example: Notification Settings</h2>
            <div className="bg-card border rounded-lg p-6 max-w-md">
              <h3 className="text-xl font-medium mb-4">Notification Preferences</h3>
              <div className="space-y-6">
                <Switch 
                  label="Email notifications" 
                  helperText="Receive updates and alerts via email"
                  checked={notifications.email}
                  onChange={() => handleChange('email')}
                />
                <Switch 
                  label="Push notifications" 
                  helperText="Receive updates and alerts on your device"
                  checked={notifications.push}
                  onChange={() => handleChange('push')}
                />
                <Switch 
                  label="Marketing emails" 
                  helperText="Receive promotional offers and newsletters"
                  checked={notifications.marketing}
                  onChange={() => handleChange('marketing')}
                />
                <Switch 
                  label="Product updates" 
                  helperText="Be notified about new features and improvements"
                  checked={notifications.updates}
                  onChange={() => handleChange('updates')}
                />
                <div className="pt-4 border-t">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}