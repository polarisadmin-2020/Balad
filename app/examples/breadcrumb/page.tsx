"use client";

import React from 'react';
import Breadcrumb, { BreadcrumbItem } from '@monorepo/shared-ui/src/components/Breadcrumb/Breadcrumb';
import { ArrowLeft, ChevronRight, Home, ChevronLeft, Slash } from 'lucide-react';
import Link from 'next/link';

export default function BreadcrumbExamplePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Examples
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">Breadcrumb Component</h1>
          <p className="text-muted-foreground mb-8">
            Breadcrumbs help users navigate hierarchical paths and understand their current location.
          </p>
        </div>

        <div className="space-y-12">
          {/* Basic Breadcrumb */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Basic Breadcrumb</h2>
            <div className="p-4 border rounded-lg">
              <Breadcrumb>
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                <BreadcrumbItem href="/products/electronics">Electronics</BreadcrumbItem>
                <BreadcrumbItem>Smartphones</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <Breadcrumb size="sm">
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                  <BreadcrumbItem>Category</BreadcrumbItem>
                </Breadcrumb>
                <p className="text-sm text-muted-foreground mt-2">Small</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <Breadcrumb size="md">
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                  <BreadcrumbItem>Category</BreadcrumbItem>
                </Breadcrumb>
                <p className="text-sm text-muted-foreground mt-2">Medium (Default)</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <Breadcrumb size="lg">
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                  <BreadcrumbItem>Category</BreadcrumbItem>
                </Breadcrumb>
                <p className="text-sm text-muted-foreground mt-2">Large</p>
              </div>
            </div>
          </section>

          {/* Custom Separators */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Custom Separators</h2>
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <Breadcrumb separator={<ChevronRight className="h-4 w-4" />}>
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                  <BreadcrumbItem>Category</BreadcrumbItem>
                </Breadcrumb>
                <p className="text-sm text-muted-foreground mt-2">Chevron (Default)</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <Breadcrumb separator={<Slash className="h-4 w-4" />}>
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                  <BreadcrumbItem>Category</BreadcrumbItem>
                </Breadcrumb>
                <p className="text-sm text-muted-foreground mt-2">Slash</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <Breadcrumb separator={<span className="mx-1">•</span>}>
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                  <BreadcrumbItem>Category</BreadcrumbItem>
                </Breadcrumb>
                <p className="text-sm text-muted-foreground mt-2">Dot</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <Breadcrumb separator={<span className="mx-2">|</span>}>
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                  <BreadcrumbItem>Category</BreadcrumbItem>
                </Breadcrumb>
                <p className="text-sm text-muted-foreground mt-2">Pipe</p>
              </div>
            </div>
          </section>

          {/* Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Variants</h2>
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <Breadcrumb variant="default">
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                  <BreadcrumbItem>Category</BreadcrumbItem>
                </Breadcrumb>
                <p className="text-sm text-muted-foreground mt-2">Default</p>
              </div>
              
              <div className="p-4 bg-primary rounded-lg">
                <Breadcrumb variant="onColor">
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                  <BreadcrumbItem>Category</BreadcrumbItem>
                </Breadcrumb>
                <p className="text-sm text-primary-foreground mt-2">On Color</p>
              </div>
            </div>
          </section>

          {/* RTL Support */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">RTL Support</h2>
            <div className="p-4 border rounded-lg">
              <Breadcrumb rtl separator={<ChevronLeft className="h-4 w-4" />}>
                <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
                <BreadcrumbItem href="/products">المنتجات</BreadcrumbItem>
                <BreadcrumbItem>الفئة</BreadcrumbItem>
              </Breadcrumb>
              <p className="text-sm text-muted-foreground mt-2">Right-to-Left</p>
            </div>
          </section>

          {/* With Icons */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
            <div className="p-4 border rounded-lg">
              <Breadcrumb>
                <BreadcrumbItem href="/">
                  <div className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </div>
                </BreadcrumbItem>
                <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                <BreadcrumbItem>Category</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </section>

          {/* Usage Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Example</h2>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4">
                <Breadcrumb>
                  <BreadcrumbItem href="/">
                    <div className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </div>
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/shop">Shop</BreadcrumbItem>
                  <BreadcrumbItem href="/shop/electronics">Electronics</BreadcrumbItem>
                  <BreadcrumbItem href="/shop/electronics/computers">Computers</BreadcrumbItem>
                  <BreadcrumbItem>Laptops</BreadcrumbItem>
                </Breadcrumb>
              </div>
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">Laptops</h1>
                <p className="text-muted-foreground mb-4">
                  Browse our selection of high-performance laptops for work, gaming, and everyday use.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded p-4">
                    <h3 className="font-medium">Gaming Laptops</h3>
                  </div>
                  <div className="border rounded p-4">
                    <h3 className="font-medium">Business Laptops</h3>
                  </div>
                  <div className="border rounded p-4">
                    <h3 className="font-medium">Ultrabooks</h3>
                  </div>
                  <div className="border rounded p-4">
                    <h3 className="font-medium">Budget Laptops</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}