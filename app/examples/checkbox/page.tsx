"use client";

import React, { useState } from 'react';
import Checkbox from '@monorepo/shared-ui/src/components/Checkbox/Checkbox';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckboxExamplePage() {
  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: true,
    item3: false,
    terms: false,
    newsletter: true,
    indeterminate: false
  });
  
  const [indeterminate, setIndeterminate] = useState(true);
  
  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({
      ...checkedItems,
      [name]: e.target.checked
    });
  };
  
  const toggleIndeterminate = () => {
    setIndeterminate(!indeterminate);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Examples
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">Checkbox Component</h1>
          <p className="text-muted-foreground mb-8">
            Checkboxes allow users to select one or more items from a set of options.
          </p>
        </div>

        <div className="space-y-12">
          {/* Basic Checkboxes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Basic Checkboxes</h2>
            <div className="space-y-4">
              <Checkbox 
                label="Unchecked checkbox" 
                checked={checkedItems.item1}
                onChange={handleChange('item1')}
              />
              <Checkbox 
                label="Checked checkbox" 
                checked={checkedItems.item2}
                onChange={handleChange('item2')}
              />
              <Checkbox 
                label="Disabled checkbox" 
                disabled
              />
              <Checkbox 
                label="Disabled checked checkbox" 
                checked
                disabled
              />
            </div>
          </section>

          {/* Indeterminate State */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Indeterminate State</h2>
            <div className="space-y-4">
              <Checkbox 
                label="Indeterminate checkbox" 
                indeterminate={indeterminate}
                checked={checkedItems.indeterminate}
                onChange={handleChange('indeterminate')}
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleIndeterminate}
              >
                Toggle Indeterminate
              </Button>
            </div>
          </section>

          {/* With Helper Text */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">With Helper Text</h2>
            <div className="space-y-4">
              <Checkbox 
                label="Terms and Conditions" 
                helperText="I agree to the terms of service and privacy policy"
                checked={checkedItems.terms}
                onChange={handleChange('terms')}
              />
              <Checkbox 
                label="Subscribe to newsletter" 
                helperText="Receive updates about new products and features"
                checked={checkedItems.newsletter}
                onChange={handleChange('newsletter')}
              />
            </div>
          </section>

          {/* Error State */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Error State</h2>
            <div className="space-y-4">
              <Checkbox 
                label="Required field" 
                helperText="This field is required"
                error
              />
              <Checkbox 
                label="Invalid selection" 
                helperText="Please select a valid option"
                error
                checked
              />
            </div>
          </section>

          {/* Usage Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Example</h2>
            <div className="bg-card border rounded-lg p-6 max-w-md">
              <h3 className="text-xl font-medium mb-4">Notification Preferences</h3>
              <div className="space-y-4 mb-6">
                <Checkbox 
                  label="Email notifications" 
                  helperText="Receive updates via email"
                  checked={checkedItems.item1}
                  onChange={handleChange('item1')}
                />
                <Checkbox 
                  label="Push notifications" 
                  helperText="Receive updates via push notifications"
                  checked={checkedItems.item2}
                  onChange={handleChange('item2')}
                />
                <Checkbox 
                  label="SMS notifications" 
                  helperText="Receive updates via SMS"
                  checked={checkedItems.item3}
                  onChange={handleChange('item3')}
                />
              </div>
              <Button>Save Preferences</Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}