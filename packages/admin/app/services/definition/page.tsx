"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServiceDefinitionPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            العودة إلى الرئيسية
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">تعريف الخدمات</h1>
          <p className="text-muted-foreground">إدارة وتعريف الخدمات المقدمة في النظام</p>
        </div>
        
        {/* Content removed as requested */}
      </main>
    </div>
  );
}