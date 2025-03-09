"use client";

import React from 'react';
import Avatar from '@monorepo/shared-ui/src/components/Avatar/Avatar';
import { ArrowLeft, User, Camera, Settings, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function AvatarExamplePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Examples
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">Avatar Component</h1>
          <p className="text-muted-foreground mb-8">
            Avatars represent users or entities in the interface.
          </p>
        </div>

        <div className="space-y-12">
          {/* Avatar Types */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Avatar Types</h2>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <Avatar 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  alt="Profile"
                />
                <span className="text-sm text-muted-foreground">Image</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Avatar initials="JD" />
                <span className="text-sm text-muted-foreground">Initials</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Avatar fallback={<User className="h-6 w-6" />} />
                <span className="text-sm text-muted-foreground">Icon</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Avatar />
                <span className="text-sm text-muted-foreground">Fallback</span>
              </div>
            </div>
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <Avatar 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  size="xs"
                />
                <span className="text-sm text-muted-foreground">XS</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Avatar 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  size="sm"
                />
                <span className="text-sm text-muted-foreground">SM</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Avatar 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  size="md"
                />
                <span className="text-sm text-muted-foreground">MD</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Avatar 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  size="lg"
                />
                <span className="text-sm text-muted-foreground">LG</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Avatar 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  size="xl"
                />
                <span className="text-sm text-muted-foreground">XL</span>
              </div>
            </div>
          </section>

          {/* Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Variants</h2>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <Avatar 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  variant="circle"
                />
                <span className="text-sm text-muted-foreground">Circle</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Avatar 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  variant="square"
                />
                <span className="text-sm text-muted-foreground">Square</span>
              </div>
            </div>
          </section>

          {/* Background Colors */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Background Colors</h2>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <Avatar 
                  initials="JD" 
                  background="default"
                />
                <span className="text-sm text-muted-foreground">Default</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Avatar 
                  initials="JD" 
                  background="colored"
                />
                <span className="text-sm text-muted-foreground">Colored</span>
              </div>
            </div>
          </section>

          {/* With Icons */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
            <div className="flex flex-wrap gap-6 items-center">
              <Avatar fallback={<User className="h-6 w-6" />} />
              <Avatar fallback={<Camera className="h-6 w-6" />} />
              <Avatar fallback={<Settings className="h-6 w-6" />} />
              <Avatar fallback={<UserPlus className="h-6 w-6" />} />
            </div>
          </section>

          {/* Usage Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Example</h2>
            <div className="bg-card border rounded-lg p-6 max-w-md">
              <div className="flex items-center gap-4 mb-4">
                <Avatar 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  size="lg"
                />
                <div>
                  <h3 className="text-lg font-medium">Jane Doe</h3>
                  <p className="text-muted-foreground">Product Designer</p>
                </div>
              </div>
              <p className="text-sm mb-4">
                Jane is a product designer with over 10 years of experience in creating user-centered designs for web and mobile applications.
              </p>
              <div className="flex gap-2">
                <Avatar size="xs" initials="AB" />
                <Avatar size="xs" initials="CD" />
                <Avatar size="xs" initials="EF" />
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs">+3</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}