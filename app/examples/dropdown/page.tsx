"use client";

import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Check, User, Globe, Flag, CreditCard } from 'lucide-react';
import Link from 'next/link';

// Since we don't have the actual Dropdown component implementation,
// we'll create a simplified version for demonstration purposes
const Dropdown = ({ 
  id,
  placeholder = "Select an option", 
  size = "md", 
  style = "default", 
  error = false, 
  disabled = false, 
  readonly = false,
  multiSelect = false,
  options = [],
  optionLabel = "label",
  trackBy = "value",
  getSelectedOptions,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const toggleDropdown = () => {
    if (disabled || readonly) return;
    setIsOpen(!isOpen);
  };
  
  const handleOptionClick = (option) => {
    if (multiSelect) {
      const isSelected = selectedOptions.some(item => item[trackBy] === option[trackBy]);
      
      let newSelectedOptions;
      if (isSelected) {
        newSelectedOptions = selectedOptions.filter(item => item[trackBy] !== option[trackBy]);
      } else {
        newSelectedOptions = [...selectedOptions, option];
      }
      
      setSelectedOptions(newSelectedOptions);
      if (getSelectedOptions) getSelectedOptions(newSelectedOptions);
    } else {
      setSelectedOptions([option]);
      if (getSelectedOptions) getSelectedOptions(option);
      setIsOpen(false);
    }
  };
  
  const sizeClasses = {
    sm: "h-8 text-xs",
    md: "h-10 text-sm",
    lg: "h-12 text-base"
  };
  
  const styleClasses = {
    default: "bg-background border-input",
    lighter: "bg-gray-50 border-gray-200",
    darker: "bg-gray-100 border-gray-300"
  };
  
  const getDisplayValue = () => {
    if (selectedOptions.length === 0) {
      return placeholder;
    }
    
    if (multiSelect) {
      if (selectedOptions.length === 1) {
        return selectedOptions[0][optionLabel];
      }
      return `${selectedOptions.length} items selected`;
    }
    
    return selectedOptions[0][optionLabel];
  };
  
  const isOptionSelected = (option) => {
    return selectedOptions.some(item => item[trackBy] === option[trackBy]);
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        className={`
          flex items-center justify-between w-full px-4 rounded-md 
          ${sizeClasses[size]} 
          ${styleClasses[style]} 
          ${error ? 'border-red-500' : 'border'} 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} 
          ${readonly ? 'bg-gray-100 cursor-default' : ''}
        `}
        onClick={toggleDropdown}
        disabled={disabled}
        {...props}
      >
        <span className={`truncate ${selectedOptions.length === 0 ? 'text-muted-foreground' : ''}`}>
          {getDisplayValue()}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <div
              key={option[trackBy] || index}
              className={`
                px-4 py-2 cursor-pointer flex items-center justify-between
                ${isOptionSelected(option) ? 'bg-primary/10' : 'hover:bg-muted'}
              `}
              onClick={() => handleOptionClick(option)}
            >
              <span>{option[optionLabel]}</span>
              {isOptionSelected(option) && <Check className="h-4 w-4 text-primary" />}
            </div>
          ))}
          
          {options.length === 0 && (
            <div className="px-4 py-2 text-muted-foreground">No options available</div>
          )}
        </div>
      )}
      
      {error && typeof error === 'string' && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default function DropdownExamplePage() {
  const countries = [
    { label: 'United States', value: 'us', icon: '🇺🇸' },
    { label: 'United Kingdom', value: 'uk', icon: '🇬🇧' },
    { label: 'Canada', value: 'ca', icon: '🇨🇦' },
    { label: 'Australia', value: 'au', icon: '🇦🇺' },
    { label: 'Germany', value: 'de', icon: '🇩🇪' },
    { label: 'France', value: 'fr', icon: '🇫🇷' },
    { label: 'Japan', value: 'jp', icon: '🇯🇵' },
    { label: 'Brazil', value: 'br', icon: '🇧🇷' },
    { label: 'India', value: 'in', icon: '🇮🇳' },
    { label: 'China', value: 'cn', icon: '🇨🇳' },
  ];
  
  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Arabic', value: 'ar' },
  ];
  
  const paymentMethods = [
    { label: 'Credit Card', value: 'credit', icon: <CreditCard className="h-4 w-4" /> },
    { label: 'PayPal', value: 'paypal', icon: 'PayPal' },
    { label: 'Bank Transfer', value: 'bank', icon: 'Bank' },
    { label: 'Apple Pay', value: 'apple', icon: 'Apple' },
    { label: 'Google Pay', value: 'google', icon: 'Google' },
  ];
  
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Examples
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">Dropdown Component</h1>
          <p className="text-muted-foreground mb-8">
            Dropdowns allow users to select an option from a list of choices.
          </p>
        </div>

        <div className="space-y-12">
          {/* Basic Dropdown */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Basic Dropdown</h2>
            <div className="max-w-xs">
              <Dropdown 
                placeholder="Select a country" 
                options={countries}
                getSelectedOptions={setSelectedCountry}
              />
            </div>
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
            <div className="space-y-4 max-w-xs">
              <Dropdown 
                placeholder="Small dropdown" 
                size="sm"
                options={countries}
              />
              <Dropdown 
                placeholder="Medium dropdown" 
                size="md"
                options={countries}
              />
              <Dropdown 
                placeholder="Large dropdown" 
                size="lg"
                options={countries}
              />
            </div>
          </section>

          {/* Styles */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Styles</h2>
            <div className="space-y-4 max-w-xs">
              <Dropdown 
                placeholder="Default style" 
                style="default"
                options={countries}
              />
              <Dropdown 
                placeholder="Lighter style" 
                style="lighter"
                options={countries}
              />
              <Dropdown 
                placeholder="Darker style" 
                style="darker"
                options={countries}
              />
            </div>
          </section>

          {/* States */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">States</h2>
            <div className="space-y-4 max-w-xs">
              <Dropdown 
                placeholder="Disabled dropdown" 
                disabled
                options={countries}
              />
              <Dropdown 
                placeholder="Read-only dropdown" 
                readonly
                options={countries}
                selectedOptions={[countries[0]]}
              />
              <Dropdown 
                placeholder="Error state" 
                error="Please select a country"
                options={countries}
              />
            </div>
          </section>

          {/* Multi-select */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Multi-select</h2>
            <div className="max-w-xs">
              <Dropdown 
                placeholder="Select languages" 
                multiSelect
                options={languages}
                getSelectedOptions={setSelectedLanguages}
              />
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">Selected: {selectedLanguages.map(lang => lang.label).join(', ')}</p>
              </div>
            </div>
          </section>

          {/* Usage Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Example: User Profile Form</h2>
            <div className="bg-card border rounded-lg p-6 max-w-md">
              <h3 className="text-xl font-medium mb-4">Profile Settings</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Name</label>
                  <div className="flex items-center border rounded-md px-4 py-2">
                    <User className="h-4 w-4 text-muted-foreground mr-2" />
                    <input 
                      type="text" 
                      className="w-full bg-transparent border-none focus:outline-none" 
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <Dropdown 
                    placeholder="Select your country" 
                    options={countries}
                    getSelectedOptions={setSelectedCountry}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Languages</label>
                  <Dropdown 
                    placeholder="Select languages" 
                    multiSelect
                    options={languages}
                    getSelectedOptions={setSelectedLanguages}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Payment Method</label>
                  <Dropdown 
                    placeholder="Select payment method" 
                    options={paymentMethods}
                    getSelectedOptions={setSelectedPayment}
                  />
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Save Settings
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