"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { colors } from '../../styles/colors';

interface NavHeaderProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  divider?: boolean;
}

export const NavHeader: React.FC<NavHeaderProps> = ({ 
  children, 
  fullWidth = false, 
  divider = true 
}) => {
  return (
    <header style={{ backgroundColor: colors.sa[950], color: 'white', borderBottomColor: divider ? colors.sa[700] : 'transparent', borderBottomWidth: divider ? '1px' : '0' }}>
      <div className={`${fullWidth ? 'px-4' : 'container mx-auto px-4'}`}>
        {children}
      </div>
    </header>
  );
};

interface NavHeaderMainProps {
  children: React.ReactNode;
  collapsed: boolean;
  toggleCollapsed: (collapsed: boolean) => void;
}

export const NavHeaderMain: React.FC<NavHeaderMainProps> = ({ 
  children, 
  collapsed, 
  toggleCollapsed 
}) => {
  return (
    <div className="flex items-center h-16">
      <div className="flex items-center h-full">
        <button 
          className="md:hidden p-2 mr-2 rounded-md hover:bg-sa-700"
          style={{ color: 'white' }}
          onClick={() => toggleCollapsed(!collapsed)}
          suppressHydrationWarning
        >
          {collapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </button>
        {children}
      </div>
    </div>
  );
};

interface NavHeaderLogosProps {
  logoSrc: string;
  logoAlt?: string;
  logoLink?: string;
  govSrc?: string;
  govAlt?: string;
  govLink?: string;
}

export const NavHeaderLogos: React.FC<NavHeaderLogosProps> = ({ 
  logoSrc, 
  logoAlt, 
  logoLink, 
  govSrc, 
  govAlt, 
  govLink 
}) => {
  return (
    <div className="flex items-center h-full">
      {logoLink ? (
        <Link href={logoLink} className="flex items-center h-full">
          {logoSrc ? (
            <img src={logoSrc} alt={logoAlt || "Logo"} className="h-8" />
          ) : (
            <span className="text-xl font-bold text-white">Logo</span>
          )}
        </Link>
      ) : (
        <div className="flex items-center h-full">
          {logoSrc ? (
            <img src={logoSrc} alt={logoAlt || "Logo"} className="h-8" />
          ) : (
            <span className="text-xl font-bold text-white">Logo</span>
          )}
        </div>
      )}
      
      {govSrc && (
        <div className="mr-4 pr-4 h-full flex items-center" style={{ borderRightColor: colors.sa[700], borderRightWidth: '1px' }}>
          {govLink ? (
            <Link href={govLink}>
              <img src={govSrc} alt={govAlt || "Government Logo"} className="h-6" />
            </Link>
          ) : (
            <img src={govSrc} alt={govAlt || "Government Logo"} className="h-6" />
          )}
        </div>
      )}
    </div>
  );
};

interface NavHeaderMenuProps {
  children: React.ReactNode;
}

export const NavHeaderMenu: React.FC<NavHeaderMenuProps> = ({ children }) => {
  return (
    <nav className="hidden md:flex items-center h-full mr-8 space-x-4 space-x-reverse">
      {children}
    </nav>
  );
};

interface NavHeaderSubMenuItemProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavHeaderLinkProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  subMenuItems?: NavHeaderSubMenuItemProps[];
}

export const NavHeaderLink: React.FC<NavHeaderLinkProps> = ({ 
  label, 
  icon, 
  active = false, 
  onClick, 
  children,
  subMenuItems = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleClick = () => {
    if (subMenuItems.length > 0) {
      setIsOpen(!isOpen);
    }
    onClick();
  };
  
  return (
    <div className="relative h-full flex items-center" ref={dropdownRef}>
      <button 
        className="flex items-center px-3 h-full rounded-none text-sm font-medium relative group"
        style={{ 
          backgroundColor: active ? colors.sa[700] : 'transparent',
          color: 'white',
        }}
        onClick={handleClick}
      >
        {label}
        {icon && <span className="mr-2 text-white">{icon}</span>}
        
        <div className={`absolute bottom-0 left-0 w-full h-1 ${active ? 'bg-white' : ''}`}>
          {!active && (
            <div className="nav-hover-indicator"></div>
          )}
        </div>
      </button>
      
      {subMenuItems.length > 0 && isOpen && (
        <div 
          className="fixed left-0 right-0 z-50"
          style={{ 
            backgroundColor: colors.sa[950],
            top: '64px',
            width: '100%'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="py-3 border-b" style={{ borderColor: colors.sa[700] }}>
              <h2 className="text-white font-medium text-lg">{label}</h2>
            </div>
            
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {subMenuItems.map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-sa-700 rounded-md"
                  >
                    {item.icon && <span className="text-white">{item.icon}</span>}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface NavHeaderActionsProps {
  children: React.ReactNode;
}

export const NavHeaderActions: React.FC<NavHeaderActionsProps> = ({ children }) => {
  return (
    <div className="flex items-center h-full space-x-2 space-x-reverse">
      {children}
    </div>
  );
};

interface NavHeaderActionBtnProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

export const NavHeaderActionBtn: React.FC<NavHeaderActionBtnProps> = ({ 
  label, 
  icon, 
  active = false, 
  onClick 
}) => {
  return (
    <button 
      className="p-2 rounded-md h-full flex items-center"
      style={{ 
        backgroundColor: active ? colors.sa[700] : 'transparent',
        color: 'white'
      }}
      onClick={onClick}
      aria-label={label}
    >
      {icon}
    </button>
  );
};

export default {
  NavHeader,
  NavHeaderMain,
  NavHeaderLogos,
  NavHeaderMenu,
  NavHeaderLink,
  NavHeaderActions,
  NavHeaderActionBtn
};