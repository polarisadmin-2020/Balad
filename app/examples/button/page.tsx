"use client";

import React from 'react';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import { ArrowLeft, ArrowRight, Plus, Trash, Mail, Home } from 'lucide-react';
import Link from 'next/link';

export default function ButtonExamplePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Examples
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">Button Component</h1>
          <p className="text-muted-foreground mb-8">
            Buttons allow users to trigger an action or event with a single click.
          </p>
        </div>

        <div className="space-y-12">
          {/* Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </section>

          {/* With Icons */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
            <div className="flex flex-wrap gap-4">
              <Button startIcon={<Mail className="h-4 w-4" />}>
                Email
              </Button>
              <Button endIcon={<ArrowRight className="h-4 w-4" />}>
                Next
              </Button>
              <Button variant="outline" startIcon={<Plus className="h-4 w-4" />}>
                Add New
              </Button>
              <Button variant="destructive" startIcon={<Trash className="h-4 w-4" />}>
                Delete
              </Button>
            </div>
          </section>

          {/* Icon Only */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Icon Only</h2>
            <div className="flex flex-wrap gap-4">
              <Button iconOnly aria-label="Home">
                <Home className="h-4 w-4" />
              </Button>
              <Button variant="outline" iconOnly aria-label="Add">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="secondary" iconOnly aria-label="Mail">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="destructive" iconOnly aria-label="Delete">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* States */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">States</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
              <Button variant="outline">Default Outline</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>
          </section>

          {/* Full Width */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Full Width</h2>
            <div className="space-y-4 max-w-md">
              <Button className="w-full">Full Width Button</Button>
              <Button variant="outline" className="w-full">Full Width Outline</Button>
            </div>
          </section>

          {/* Usage Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Example</h2>
            <div className="bg-card border rounded-lg p-6 max-w-md">
              <h3 className="text-xl font-medium mb-4">Confirm Action</h3>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to proceed with this action? This cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline">Cancel</Button>
                <Button variant="primary">Confirm</Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}