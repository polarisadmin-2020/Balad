"use client";

import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

// Since we don't have the actual Accordion component implementation,
// we'll create a simplified version for demonstration purposes
const Accordion = ({ 
  title, 
  children, 
  defaultOpen = false,
  iconAlignment = "trailing",
  flush = false,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border ${flush ? 'border-x-0 rounded-none' : 'rounded-md'} ${disabled ? 'opacity-50' : ''}`}>
      <button
        className={`flex items-center justify-between w-full p-4 text-left ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        {iconAlignment === "leading" && (
          <span className="mr-3">
            {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </span>
        )}
        <span className="font-medium">{title}</span>
        {iconAlignment === "trailing" && (
          <span className="ml-3">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 border-t">
          {children}
        </div>
      )}
    </div>
  );
};

const AccordionsList = ({ accordions, flush = false }) => {
  return (
    <div className={`divide-y ${flush ? 'border-t border-b' : 'border rounded-md'}`}>
      {accordions.map((accordion, index) => (
        <Accordion 
          key={index} 
          title={accordion.title} 
          defaultOpen={index === 0}
          iconAlignment="trailing"
          flush={flush}
        >
          {accordion.content}
        </Accordion>
      ))}
    </div>
  );
};

export default function AccordionExamplePage() {
  const faqAccordions = [
    {
      title: "What is a React component?",
      content: "A React component is a reusable piece of code that returns a React element to be rendered to the page. Components can be either function components or class components."
    },
    {
      title: "How do I install React?",
      content: "You can create a new React application using Create React App by running: npx create-react-app my-app. Alternatively, you can add React to an existing project by installing the react and react-dom packages."
    },
    {
      title: "What are props in React?",
      content: "Props (short for properties) are inputs to React components. They are data passed from a parent component to a child component and are read-only."
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Examples
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">Accordion Component</h1>
          <p className="text-muted-foreground mb-8">
            Accordions display an expandable/collapsible list of sections to organize content.
          </p>
        </div>

        <div className="space-y-12">
          {/* Basic Accordion */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Basic Accordion</h2>
            <div className="max-w-2xl">
              <Accordion title="Click to expand">
                <p>This is the content of the accordion. It can contain any type of content, including text, images, and other components.</p>
              </Accordion>
            </div>
          </section>

          {/* Icon Alignment */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Icon Alignment</h2>
            <div className="max-w-2xl space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Trailing Icon (Default)</h3>
                <Accordion title="Trailing icon" iconAlignment="trailing">
                  <p>This accordion has the icon at the end of the header.</p>
                </Accordion>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Leading Icon</h3>
                <Accordion title="Leading icon" iconAlignment="leading">
                  <p>This accordion has the icon at the beginning of the header.</p>
                </Accordion>
              </div>
            </div>
          </section>

          {/* States */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">States</h2>
            <div className="max-w-2xl space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Default (Closed)</h3>
                <Accordion title="Default accordion">
                  <p>This accordion is closed by default.</p>
                </Accordion>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Open by Default</h3>
                <Accordion title="Open accordion" defaultOpen={true}>
                  <p>This accordion is open by default.</p>
                </Accordion>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Disabled</h3>
                <Accordion title="Disabled accordion" disabled={true}>
                  <p>This accordion cannot be interacted with.</p>
                </Accordion>
              </div>
            </div>
          </section>

          {/* Accordion List */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Accordion List</h2>
            <div className="max-w-2xl">
              <AccordionsList accordions={faqAccordions} />
            </div>
          </section>

          {/* Flush Style */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Flush Style</h2>
            <div className="max-w-2xl">
              <AccordionsList accordions={faqAccordions} flush={true} />
            </div>
          </section>

          {/* Usage Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Example: FAQ</h2>
            <div className="max-w-2xl bg-card border rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">Frequently Asked Questions</h3>
              <AccordionsList accordions={[
                {
                  title: "How do I create an account?",
                  content: "To create an account, click on the 'Sign Up' button in the top right corner of the page. Fill out the required information and submit the form. You will receive a confirmation email to verify your account."
                },
                {
                  title: "What payment methods do you accept?",
                  content: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. Payment information is securely processed and stored."
                },
                {
                  title: "How can I reset my password?",
                  content: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password."
                },
                {
                  title: "What is your refund policy?",
                  content: "We offer a 30-day money-back guarantee for all our products. If you're not satisfied with your purchase, please contact our support team to process your refund."
                }
              ]} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}