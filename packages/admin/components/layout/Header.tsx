"use client";

import React from 'react';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import Avatar from '@monorepo/shared-ui/src/components/Avatar/Avatar';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  user?: {
    name: string;
    avatar?: string;
    initials?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ title, user }) => {
  return (
    <header className="bg-card border-b border-border p-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
          />
        </div>
        
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
        </Button>
        
        <Button variant="outline" size="sm">Help</Button>
        
        {user && (
          <div className="flex items-center gap-2">
            <Avatar 
              src={user.avatar}
              initials={user.initials || user.name.charAt(0)}
              size="sm"
            />
            <span className="text-sm font-medium hidden md:block">{user.name}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;