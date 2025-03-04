"use client";

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Package, FileText, BarChart3, Settings, X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeLink: string;
  setActiveLink: (link: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  activeLink, 
  setActiveLink 
}) => {
  if (!isOpen) return null;
  
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#104631] text-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-[#166A45]">
          <button 
            onClick={onClose}
            className="p-2 rounded-md hover:bg-[#166A45]"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold">القائمة</h2>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  activeLink === 'dashboard' 
                    ? 'bg-[#166A45] text-white' 
                    : 'hover:bg-[#166A45] text-white'
                }`}
                onClick={() => handleLinkClick('dashboard')}
              >
                <span>لوحة التحكم</span>
                <LayoutDashboard className="h-5 w-5 mr-auto" />
              </Link>
            </li>
            <li>
              <Link 
                href="/users"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  activeLink === 'users' 
                    ? 'bg-[#166A45] text-white' 
                    : 'hover:bg-[#166A45] text-white'
                }`}
                onClick={() => handleLinkClick('users')}
              >
                <span>المستخدمين</span>
                <Users className="h-5 w-5 mr-auto" />
              </Link>
            </li>
            <li>
              <Link 
                href="/products"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  activeLink === 'products' 
                    ? 'bg-[#166A45] text-white' 
                    : 'hover:bg-[#166A45] text-white'
                }`}
                onClick={() => handleLinkClick('products')}
              >
                <span>المنتجات</span>
                <Package className="h-5 w-5 mr-auto" />
              </Link>
            </li>
            <li>
              <Link 
                href="/reports"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  activeLink === 'reports' 
                    ? 'bg-[#166A45] text-white' 
                    : 'hover:bg-[#166A45] text-white'
                }`}
                onClick={() => handleLinkClick('reports')}
              >
                <span>التقارير</span>
                <FileText className="h-5 w-5 mr-auto" />
              </Link>
            </li>
            <li>
              <Link 
                href="/analytics"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  activeLink === 'analytics' 
                    ? 'bg-[#166A45] text-white' 
                    : 'hover:bg-[#166A45] text-white'
                }`}
                onClick={() => handleLinkClick('analytics')}
              >
                <span>التحليلات</span>
                <BarChart3 className="h-5 w-5 mr-auto" />
              </Link>
            </li>
            <li>
              <Link 
                href="/settings"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  activeLink === 'settings' 
                    ? 'bg-[#166A45] text-white' 
                    : 'hover:bg-[#166A45] text-white'
                }`}
                onClick={() => handleLinkClick('settings')}
              >
                <span>الإعدادات</span>
                <Settings className="h-5 w-5 mr-auto" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;