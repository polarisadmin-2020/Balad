"use client";

import React from 'react';
import { ArrowLeft, X, Check, AlertCircle, Info, Clock, Star, User, Heart } from 'lucide-react';
import Link from 'next/link';

// Since we don't have the actual Tag component implementation,
// we'll create a simplified version for demonstration purposes
const Tag = ({ 
  label, 
  color = "gray", 
  size = "md", 
  iconOnly = false, 
  leadIcon, 
  trailIcon, 
  rounded = false, 
  outlined = false,
  onClose,
  ...props 
}) => {
  const colorClasses = {
    gray: outlined 
      ? "bg-transparent text-gray-700 border-gray-300" 
      : "bg-gray-100 text-gray-700",
    success: outlined 
      ? "bg-transparent text-green-700 border-green-300" 
      : "bg-green-100 text-green-700",
    destruct: outlined 
      ? "bg-transparent text-red-700 border-red-300" 
      : "bg-red-100 text-red-700",
    warning: outlined 
      ? "bg-transparent text-amber-700 border-amber-300" 
      : "bg-amber-100 text-amber-700",
    info: outlined 
      ? "bg-transparent text-blue-700 border-blue-300" 
      : "bg-blue-100 text-blue-700",
    purple: outlined 
      ? "bg-transparent text-purple-700 border-purple-300" 
      : "bg-purple-100 text-purple-700",
    pink: outlined 
      ? "bg-transparent text-pink-700 border-pink-300" 
      : "bg-pink-100 text-pink-700",
    orange: outlined 
      ? "bg-transparent text-orange-700 border-orange-300" 
      : "bg-orange-100 text-orange-700",
    "on-color": outlined 
      ? "bg-transparent text-white border-white/30" 
      : "bg-white/20 text-white",
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1",
  };

  return (
    <span 
      className={`
        inline-flex items-center 
        ${colorClasses[color]} 
        ${sizeClasses[size]} 
        ${rounded ? 'rounded-full' : 'rounded-md'} 
        ${outlined ? 'border' : ''}
        ${iconOnly ? 'p-0 aspect-square justify-center' : ''}
      `}
      {...props}
    >
      {leadIcon && <span className={`${label ? 'mr-1' : ''}`}>{leadIcon}</span>}
      {!iconOnly && label}
      {trailIcon && <span className={`${label ? 'ml-1' : ''}`}>{trailIcon}</span>}
      {onClose && (
        <button 
          onClick={onClose} 
          className="ml-1 hover:bg-black/10 rounded-full p-0.5"
          aria-label="Remove"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

export default function TagExamplePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Examples
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">Tag Component</h1>
          <p className="text-muted-foreground mb-8">
            Tags help label, categorize, or organize items using keywords.
          </p>
        </div>

        <div className="space-y-12">
          {/* Basic Tags */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Basic Tags</h2>
            <div className="flex flex-wrap gap-2">
              <Tag label="Default" />
              <Tag label="Success" color="success" />
              <Tag label="Error" color="destruct" />
              <Tag label="Warning" color="warning" />
              <Tag label="Info" color="info" />
              <Tag label="Purple" color="purple" />
              <Tag label="Pink" color="pink" />
              <Tag label="Orange" color="orange" />
            </div>
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
            <div className="flex flex-wrap gap-2 items-center">
              <Tag label="Small" size="sm" />
              <Tag label="Medium" size="md" />
              <Tag label="Large" size="lg" />
            </div>
          </section>

          {/* Outlined Tags */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Outlined Tags</h2>
            <div className="flex flex-wrap gap-2">
              <Tag label="Default" outlined />
              <Tag label="Success" color="success" outlined />
              <Tag label="Error" color="destruct" outlined />
              <Tag label="Warning" color="warning" outlined />
              <Tag label="Info" color="info" outlined />
            </div>
          </section>

          {/* Rounded Tags */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Rounded Tags</h2>
            <div className="flex flex-wrap gap-2">
              <Tag label="Default" rounded />
              <Tag label="Success" color="success" rounded />
              <Tag label="Error" color="destruct" rounded />
              <Tag label="Warning" color="warning" rounded />
              <Tag label="Info" color="info" rounded />
            </div>
          </section>

          {/* With Icons */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
            <div className="flex flex-wrap gap-2">
              <Tag 
                label="Success" 
                color="success" 
                leadIcon={<Check className="h-3 w-3" />} 
              />
              <Tag 
                label="Error" 
                color="destruct" 
                leadIcon={<AlertCircle className="h-3 w-3" />} 
              />
              <Tag 
                label="Warning" 
                color="warning" 
                leadIcon={<AlertCircle className="h-3 w-3" />} 
              />
              <Tag 
                label="Info" 
                color="info" 
                leadIcon={<Info className="h-3 w-3" />} 
              />
              <Tag 
                label="Pending" 
                color="purple" 
                leadIcon={<Clock className="h-3 w-3" />} 
              />
            </div>
          </section>

          {/* Closable Tags */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Closable Tags</h2>
            <div className="flex flex-wrap gap-2">
              <Tag 
                label="Removable" 
                onClose={() => alert('Tag removed')} 
              />
              <Tag 
                label="Success" 
                color="success" 
                onClose={() => alert('Tag removed')} 
              />
              <Tag 
                label="Error" 
                color="destruct" 
                onClose={() => alert('Tag removed')} 
              />
              <Tag 
                label="Warning" 
                color="warning" 
                onClose={() => alert('Tag removed')} 
              />
            </div>
          </section>

          {/* Icon Only Tags */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Icon Only Tags</h2>
            <div className="flex flex-wrap gap-2">
              <Tag 
                iconOnly 
                leadIcon={<Check className="h-3 w-3" />} 
                color="success" 
              />
              <Tag 
                iconOnly 
                leadIcon={<AlertCircle className="h-3 w-3" />} 
                color="destruct" 
              />
              <Tag 
                iconOnly 
                leadIcon={<Info className="h-3 w-3" />} 
                color="info" 
              />
              <Tag 
                iconOnly 
                leadIcon={<Star className="h-3 w-3" />} 
                color="warning" 
              />
              <Tag 
                iconOnly 
                leadIcon={<User className="h-3 w-3" />} 
                color="gray" 
              />
            </div>
          </section>

          {/* On Color Background */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">On Color Background</h2>
            <div className="bg-primary p-4 rounded-lg">
              <div className="flex flex-wrap gap-2">
                <Tag 
                  label="Default" 
                  color="on-color" 
                />
                <Tag 
                  label="With Icon" 
                  color="on-color" 
                  leadIcon={<Info className="h-3 w-3" />} 
                />
                <Tag 
                  label="Outlined" 
                  color="on-color" 
                  outlined 
                />
                <Tag 
                  label="Rounded" 
                  color="on-color" 
                  rounded 
                />
                <Tag 
                  label="Closable" 
                  color="on-color" 
                  onClose={() => alert('Tag removed')} 
                />
              </div>
            </div>
          </section>

          {/* Usage Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
            
            {/* Product Tags */}
            <h3 className="text-xl font-medium mb-4">Product Tags</h3>
            <div className="bg-card border rounded-lg p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                  alt="Headphones"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h4 className="text-lg font-medium">Wireless Headphones</h4>
                  <p className="text-muted-foreground text-sm mb-2">Premium sound quality with noise cancellation</p>
                  <div className="flex flex-wrap gap-2">
                    <Tag label="Electronics" size="sm" />
                    <Tag label="Wireless" size="sm" color="info" />
                    <Tag label="Sale" size="sm" color="destruct" />
                    <Tag label="In Stock" size="sm" color="success" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* User Profile Tags */}
            <h3 className="text-xl font-medium mb-4">User Profile Tags</h3>
            <div className="bg-card border rounded-lg p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">John Doe</h4>
                  <p className="text-muted-foreground text-sm">Software Developer</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Tag label="React" size="sm" color="info" />
                <Tag label="TypeScript" size="sm" color="blue" />
                <Tag label="Node.js" size="sm" color="success" />
                <Tag label="UI/UX" size="sm" color="purple" />
                <Tag label="Figma" size="sm" color="pink" />
              </div>
              <div className="text-sm text-muted-foreground">
                Add your skills:
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Tag 
                  label="Add Skill" 
                  size="sm" 
                  outlined 
                  leadIcon={<Plus className="h-3 w-3" />} 
                />
              </div>
            </div>
            
            {/* Status Tags */}
            <h3 className="text-xl font-medium mb-4">Status Tags</h3>
            <div className="bg-card border rounded-lg p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Task</th>
                    <th className="text-left py-2">Assignee</th>
                    <th className="text-left py-2">Due Date</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Update homepage design</td>
                    <td className="py-3">John Doe</td>
                    <td className="py-3">Oct 15, 2023</td>
                    <td className="py-3">
                      <Tag 
                        label="Completed" 
                        size="sm" 
                        color="success" 
                        leadIcon={<Check className="h-3 w-3" />} 
                      />
                    </td>
                    <td className="py-3">
                      <Tag label="High" size="sm" color="destruct" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Fix login page bug</td>
                    <td className="py-3">Jane Smith</td>
                    <td className="py-3">Oct 18, 2023</td>
                    <td className="py-3">
                      <Tag 
                        label="In Progress" 
                        size="sm" 
                        color="info" 
                        leadIcon={<Clock className="h-3 w-3" />} 
                      />
                    </td>
                    <td className="py-3">
                      <Tag label="Medium" size="sm" color="warning" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">Add payment integration</td>
                    <td className="py-3">Mike Johnson</td>
                    <td className="py-3">Oct 25, 2023</td>
                    <td className="py-3">
                      <Tag 
                        label="Pending" 
                        size="sm" 
                        color="gray" 
                        leadIcon={<Clock className="h-3 w-3" />} 
                      />
                    </td>
                    <td className="py-3">
                      <Tag label="Low" size="sm" color="gray" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}