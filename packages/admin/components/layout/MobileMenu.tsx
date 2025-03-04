"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronDown, X, Users, MapPin } from 'lucide-react';
import { colors } from '@monorepo/shared-ui/src/styles/colors';

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
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  
  if (!isOpen) return null;
  
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    onClose();
  };
  
  const toggleSubmenu = (menu: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
      <div className="fixed inset-y-0 right-0 w-full max-w-xs text-white shadow-lg" style={{ backgroundColor: colors.sa[900] }}>
        <div className="flex items-center justify-between p-4" style={{ borderBottomColor: colors.sa[700], borderBottomWidth: '1px' }}>
          <button 
            onClick={onClose}
            className="p-2 rounded-md"
            style={{ ':hover': { backgroundColor: colors.sa[700] } }}
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
                className="flex items-center gap-3 px-3 py-2 rounded-md"
                style={{ 
                  backgroundColor: activeLink === 'home' ? colors.sa[700] : 'transparent',
                  color: 'white'
                }}
                onClick={() => handleLinkClick('home')}
              >
                <span>الرئيسية</span>
                <Home className="h-5 w-5 mr-auto" />
              </Link>
            </li>
            
            {/* Services with Dropdown */}
            <li>
              <div>
                <button
                  className="flex items-center gap-3 px-3 py-2 rounded-md w-full"
                  style={{ 
                    backgroundColor: activeLink === 'services' ? colors.sa[700] : 'transparent',
                    color: 'white'
                  }}
                  onClick={() => toggleSubmenu('services')}
                >
                  <span>الخدمات</span>
                  <ChevronDown className={`h-5 w-5 mr-auto transition-transform ${expandedMenus['services'] ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedMenus['services'] && (
                  <div className="mt-1 mr-4 pr-4 border-r border-sa-700">
                    <div className="py-2 px-3 mb-2" style={{ backgroundColor: colors.sa[700], borderRadius: '0.25rem' }}>
                      <span className="font-medium">الخدمات</span>
                    </div>
                    <ul className="space-y-1">
                      <li>
                        <Link 
                          href="/services/definition"
                          className="flex items-center gap-3 px-3 py-2 rounded-md"
                          style={{ color: 'white' }}
                          onClick={() => handleLinkClick('services')}
                        >
                          <span>تعريف الخدمات</span>
                          <Home className="h-4 w-4 mr-auto" />
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/services/design"
                          className="flex items-center gap-3 px-3 py-2 rounded-md"
                          style={{ color: 'white' }}
                          onClick={() => handleLinkClick('services')}
                        >
                          <span>تصميم الخدمات</span>
                          <Home className="h-4 w-4 mr-auto" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
            
            {/* Data Reference with Dropdown */}
            <li>
              <div>
                <button
                  className="flex items-center gap-3 px-3 py-2 rounded-md w-full"
                  style={{ 
                    backgroundColor: activeLink === 'data-reference' ? colors.sa[700] : 'transparent',
                    color: 'white'
                  }}
                  onClick={() => toggleSubmenu('data-reference')}
                >
                  <span>مرجع البيانات</span>
                  <ChevronDown className={`h-5 w-5 mr-auto transition-transform ${expandedMenus['data-reference'] ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedMenus['data-reference'] && (
                  <div className="mt-1 mr-4 pr-4 border-r border-sa-700">
                    <div className="py-2 px-3 mb-2" style={{ backgroundColor: colors.sa[700], borderRadius: '0.25rem' }}>
                      <span className="font-medium">مرجع البيانات</span>
                    </div>
                    <ul className="space-y-1">
                      <li>
                        <Link 
                          href="/geographic-location"
                          className="flex items-center gap-3 px-3 py-2 rounded-md"
                          style={{ color: 'white' }}
                          onClick={() => handleLinkClick('data-reference')}
                        >
                          <span>موقع الجغرافي</span>
                          <MapPin className="h-4 w-4 mr-auto" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
            
            {/* Accounts with Dropdown */}
            <li>
              <div>
                <button
                  className="flex items-center gap-3 px-3 py-2 rounded-md w-full"
                  style={{ 
                    backgroundColor: activeLink === 'accounts' ? colors.sa[700] : 'transparent',
                    color: 'white'
                  }}
                  onClick={() => toggleSubmenu('accounts')}
                >
                  <span>الحسابات</span>
                  <ChevronDown className={`h-5 w-5 mr-auto transition-transform ${expandedMenus['accounts'] ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedMenus['accounts'] && (
                  <div className="mt-1 mr-4 pr-4 border-r border-sa-700">
                    <div className="py-2 px-3 mb-2" style={{ backgroundColor: colors.sa[700], borderRadius: '0.25rem' }}>
                      <span className="font-medium">الحسابات</span>
                    </div>
                    <ul className="space-y-1">
                      <li>
                        <Link 
                          href="/users"
                          className="flex items-center gap-3 px-3 py-2 rounded-md"
                          style={{ color: 'white' }}
                          onClick={() => handleLinkClick('accounts')}
                        >
                          <span>المستخدمين</span>
                          <Users className="h-4 w-4 mr-auto" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;