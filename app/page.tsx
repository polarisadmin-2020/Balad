"use client";

import React, { useEffect } from 'react';
import { useTheme } from "./hooks/useTheme";
import { Moon, Sun, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  
  // Force light theme on initial load
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
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
        
        <main>
          <section className="mb-16">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-4">Component Library</h2>
              <p className="text-xl text-muted-foreground mb-8">
                A collection of reusable UI components built with React, TypeScript, and Tailwind CSS.
                These components are designed to be accessible, customizable, and easy to use.
              </p>
              <Link 
                href="/examples" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                View Components
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Figma Integration" 
              description="Components are generated from Figma designs, ensuring consistency between design and implementation."
            />
            <FeatureCard 
              title="Accessibility" 
              description="All components are built with accessibility in mind, following WCAG guidelines."
            />
            <FeatureCard 
              title="Customization" 
              description="Components can be customized using variants, props, and Tailwind CSS classes."
            />
            <FeatureCard 
              title="TypeScript" 
              description="Full TypeScript support with proper type definitions for all components and props."
            />
            <FeatureCard 
              title="Responsive" 
              description="Components are designed to work on all screen sizes and devices."
            />
            <FeatureCard 
              title="Dark Mode" 
              description="Built-in support for light and dark modes with seamless transitions."
            />
          </section>
        </main>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}