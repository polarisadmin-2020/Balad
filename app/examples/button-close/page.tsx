"use client";

import React from 'react';
import ButtonClose from '@monorepo/shared-ui/src/components/ButtonClose/ButtonClose';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ButtonCloseExamplePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Examples
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">ButtonClose Component</h1>
          <p className="text-muted-foreground mb-8">
            Close buttons are used to dismiss or close UI elements like modals, alerts, and panels.
          </p>
        </div>

        <div className="space-y-12">
          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <ButtonClose size="xs" />
                <span className="text-sm text-muted-foreground">Extra Small</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <ButtonClose size="sm" />
                <span className="text-sm text-muted-foreground">Small</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <ButtonClose size="md" />
                <span className="text-sm text-muted-foreground">Medium</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <ButtonClose size="lg" />
                <span className="text-sm text-muted-foreground">Large</span>
              </div>
            </div>
          </section>

          {/* Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Variants</h2>
            <div className="space-y-6">
              <div className="p-4 border rounded-lg flex items-center gap-6">
                <ButtonClose variant="default" />
                <span className="text-sm text-muted-foreground">Default</span>
              </div>
              
              <div className="p-4 bg-primary rounded-lg flex items-center gap-6">
                <ButtonClose variant="onColor" />
                <span className="text-sm text-primary-foreground">On Color</span>
              </div>
            </div>
          </section>

          {/* States */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">States</h2>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <ButtonClose />
                <span className="text-sm text-muted-foreground">Default</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <ButtonClose disabled />
                <span className="text-sm text-muted-foreground">Disabled</span>
              </div>
            </div>
          </section>

          {/* Usage Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
            
            {/* Modal */}
            <h3 className="text-xl font-medium mb-4">Modal</h3>
            <div className="border rounded-lg overflow-hidden mb-8 max-w-md">
              <div className="bg-card p-4 flex justify-between items-center border-b">
                <h4 className="font-medium">Modal Title</h4>
                <ButtonClose size="sm" />
              </div>
              <div className="p-6">
                <p className="mb-6">This is the content of the modal dialog. It can contain any type of content.</p>
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </div>
              </div>
            </div>
            
            {/* Alert */}
            <h3 className="text-xl font-medium mb-4">Alert</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex mb-8 max-w-md">
              <div className="flex-1">
                <h4 className="text-blue-800 font-medium mb-1">Information</h4>
                <p className="text-blue-700 text-sm">This is an informational message with important details.</p>
              </div>
              <ButtonClose size="sm" className="text-blue-700 hover:bg-blue-100" />
            </div>
            
            {/* Card */}
            <h3 className="text-xl font-medium mb-4">Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-lg p-6 relative">
                <ButtonClose size="sm" className="absolute top-3 right-3" />
                <h4 className="font-medium mb-2">Dismissible Card</h4>
                <p className="text-muted-foreground">This card can be dismissed using the close button.</p>
              </div>
            </div>
          </section>

          {/* Customization */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Customization</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border rounded-lg p-6 flex flex-col items-center gap-2">
                <ButtonClose className="bg-red-100 hover:bg-red-200 text-red-600" />
                <span className="text-sm text-muted-foreground">Custom Color</span>
              </div>
              
              <div className="bg-card border rounded-lg p-6 flex flex-col items-center gap-2">
                <ButtonClose className="rounded-full" />
                <span className="text-sm text-muted-foreground">Rounded</span>
              </div>
              
              <div className="bg-card border rounded-lg p-6 flex flex-col items-center gap-2">
                <ButtonClose className="border border-gray-300" />
                <span className="text-sm text-muted-foreground">With Border</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}