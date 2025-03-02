"use client";

import React from 'react';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import Avatar from '@monorepo/shared-ui/src/components/Avatar/Avatar';
import { ArrowLeft, ArrowRight, Heart, MessageCircle, Share2, MoreHorizontal, Star } from 'lucide-react';
import Link from 'next/link';

export default function CardExamplePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Examples
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">Card Component</h1>
          <p className="text-muted-foreground mb-8">
            Cards contain content and actions about a single subject.
          </p>
        </div>

        <div className="space-y-12">
          {/* Card Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Card Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Default Card</h3>
                  <p className="text-muted-foreground">Basic card with default styling</p>
                </div>
              </Card>
              
              <Card variant="elevated">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Elevated Card</h3>
                  <p className="text-muted-foreground">Card with shadow elevation</p>
                </div>
              </Card>
              
              <Card variant="outlined">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Outlined Card</h3>
                  <p className="text-muted-foreground">Card with border outline</p>
                </div>
              </Card>
              
              <Card selectable onClick={() => alert('Card clicked')}>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Interactive Card</h3>
                  <p className="text-muted-foreground">Clickable card with hover state</p>
                </div>
              </Card>
            </div>
          </section>

          {/* Padding Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Padding Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card padding="sm">
                <h3 className="text-lg font-medium mb-2">Small Padding</h3>
                <p className="text-muted-foreground">Card with small padding</p>
              </Card>
              
              <Card padding="md">
                <h3 className="text-lg font-medium mb-2">Medium Padding</h3>
                <p className="text-muted-foreground">Card with medium padding (default)</p>
              </Card>
              
              <Card padding="lg">
                <h3 className="text-lg font-medium mb-2">Large Padding</h3>
                <p className="text-muted-foreground">Card with large padding</p>
              </Card>
            </div>
          </section>

          {/* Card States */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Card States</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card selectable>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Selectable Card</h3>
                  <p className="text-muted-foreground">Card that can be selected</p>
                </div>
              </Card>
              
              <Card selectable selected>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Selected Card</h3>
                  <p className="text-muted-foreground">Card in selected state</p>
                </div>
              </Card>
              
              <Card disabled>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Disabled Card</h3>
                  <p className="text-muted-foreground">Card in disabled state</p>
                </div>
              </Card>
            </div>
          </section>

          {/* Usage Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
            
            {/* Product Card */}
            <h3 className="text-xl font-medium mb-4">Product Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card variant="elevated">
                <img 
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80" 
                  alt="Product"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">4.0 (12 reviews)</span>
                  </div>
                  <h3 className="text-lg font-medium mb-1">Premium Watch</h3>
                  <p className="text-muted-foreground mb-3">Elegant timepiece for any occasion</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">$199.99</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Profile Card */}
            <h3 className="text-xl font-medium mb-4">Profile Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card variant="outlined">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      size="lg"
                    />
                    <div>
                      <h3 className="text-lg font-medium">John Doe</h3>
                      <p className="text-muted-foreground">Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-sm mb-4">
                    Full-stack developer with expertise in React, Node.js, and cloud infrastructure.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Message</Button>
                    <Button size="sm">Connect</Button>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Social Card */}
            <h3 className="text-xl font-medium mb-4">Social Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                        size="sm"
                      />
                      <div>
                        <h3 className="text-sm font-medium">Sarah Johnson</h3>
                        <p className="text-xs text-muted-foreground">Posted 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" iconOnly aria-label="More options">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm mb-4">
                    Just finished my latest design project! Really happy with how it turned out. What do you think?
                  </p>
                  <img 
                    src="https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80" 
                    alt="Design project"
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <Button variant="ghost" size="sm" startIcon={<Heart className="h-4 w-4" />}>
                        124
                      </Button>
                      <Button variant="ghost" size="sm" startIcon={<MessageCircle className="h-4 w-4" />}>
                        32
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" startIcon={<Share2 className="h-4 w-4" />}>
                      Share
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}