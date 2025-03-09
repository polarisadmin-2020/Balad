"use client";

import React from 'react';
import Link from 'next/link';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

export default function ExamplesIndex() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Shared UI Components</h1>
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ComponentCard 
            title="Button" 
            description="Interactive button component with multiple variants"
            href="/examples/button"
          />
          <ComponentCard 
            title="Checkbox" 
            description="Form control for selecting options"
            href="/examples/checkbox"
          />
          <ComponentCard 
            title="Avatar" 
            description="User or entity representation"
            href="/examples/avatar"
          />
          <ComponentCard 
            title="Card" 
            description="Container for related content and actions"
            href="/examples/card"
          />
          <ComponentCard 
            title="Breadcrumb" 
            description="Navigation component showing hierarchy"
            href="/examples/breadcrumb"
          />
          <ComponentCard 
            title="ButtonClose" 
            description="Button for closing dialogs or panels"
            href="/examples/button-close"
          />
        </div>
      </div>
    </div>
  );
}

interface ComponentCardProps {
  title: string;
  description: string;
  href: string;
}

function ComponentCard({ title, description, href }: ComponentCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}