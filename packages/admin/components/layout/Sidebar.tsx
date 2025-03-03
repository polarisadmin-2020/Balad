"use client";

import React from 'react';
import { useTheme } from '@monorepo/shared-ui/src/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href, active }) => {
  return (
    <li>
      <a 
        href={href} 
        className={`flex items-center gap-3 px-3 py-2 rounded-md ${
          active 
            ? 'bg-primary text-primary-foreground' 
            : 'hover:bg-muted'
        }`}
      >
        {icon}
        <span>{label}</span>
      </a>
    </li>
  );
};

interface SidebarProps {
  items: SidebarItemProps[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="w-64 bg-card border-r border-border h-full">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-muted"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <SidebarItem 
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={item.active}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;