"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import { colors } from '@monorepo/shared-ui/src/styles/colors';

export default function AdminDashboard() {
  const router = useRouter();

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-4xl mb-4">إعدادات النظام</h1>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card 
            className="h-80 overflow-hidden transition-transform hover:scale-105 hover:shadow-lg cursor-pointer relative"
            onClick={() => handleCardClick('/services/definition')}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
              }}
            />
            <div 
              className="absolute inset-0 flex items-end"
              style={{ 
                background: `linear-gradient(0deg, ${colors.sa[500]} 0%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0) 100%)`,
                opacity: 0.95
              }}
            >
              <h2 className="text-white text-3xl font-bold p-6">تعريف الخدمات</h2>
            </div>
          </Card>
          
          <Card 
            className="h-80 overflow-hidden transition-transform hover:scale-105 hover:shadow-lg cursor-pointer relative"
            onClick={() => handleCardClick('/services/design')}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
              }}
            />
            <div 
              className="absolute inset-0 flex items-end"
              style={{ 
                background: `linear-gradient(0deg, ${colors.sa[500]} 0%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0) 100%)`,
                opacity: 0.95
              }}
            >
              <h2 className="text-white text-3xl font-bold p-6">تصميم الخدمات</h2>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}