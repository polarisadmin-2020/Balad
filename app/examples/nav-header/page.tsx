"use client";

import React, { useState } from 'react';
import { ArrowLeft, Menu, X, ChevronDown, User, ShoppingCart, Search, Bell, Home, Package, Settings, HelpCircle } from 'lucide-react';
import Link from 'next/link';

// Since we don't have the actual NavHeader component implementation,
// we'll create a simplified version for demonstration purposes
const NavHeader = ({ 
  fullWidth = false, 
  divider = true, 
  children 
}) => {
  return (
    <header className={`bg-white ${divider ? 'border-b' : ''}`}>
      <div className={`${fullWidth ? 'px-4' : 'container mx-auto px-4'}`}>
        {children}
      </div>
    </header>
  );
};

const NavHeaderMain = ({ children, collapsed, toggleCollapsed }) => {
  return (
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
        <button 
          className="md:hidden p-2 mr-2 rounded-md hover:bg-gray-100"
          onClick={() => toggleCollapsed(!collapsed)}
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </button>
        {children}
      </div>
    </div>
  );
};

const NavHeaderLogos = ({ logoSrc, logoAlt, logoLink, govSrc, govAlt, govLink }) => {
  return (
    <div className="flex items-center">
      {logoLink ? (
        <a href={logoLink} className="flex items-center">
          {logoSrc ? (
            <img src={logoSrc} alt={logoAlt || "Logo"} className="h-8" />
          ) : (
            <span className="text-xl font-bold">Logo</span>
          )}
        </a>
      ) : (
        <div className="flex items-center">
          {logoSrc ? (
            <img src={logoSrc} alt={logoAlt || "Logo"} className="h-8" />
          ) : (
            <span className="text-xl font-bold">Logo</span>
          )}
        </div>
      )}
      
      {govSrc && (
        <div className="ml-4 pl-4 border-l">
          {govLink ? (
            <a href={govLink}>
              <img src={govSrc} alt={govAlt || "Government Logo"} className="h-6" />
            </a>
          ) : (
            <img src={govSrc} alt={govAlt || "Government Logo"} className="h-6" />
          )}
        </div>
      )}
    </div>
  );
};

const NavHeaderMenu = ({ children }) => {
  return (
    <nav className="hidden md:flex items-center ml-8 space-x-4">
      {children}
    </nav>
  );
};

const NavHeaderLink = ({ label, icon, active = false, onClick, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };
  
  return (
    <div className="relative">
      <button 
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
        onClick={handleClick}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        {children && <ChevronDown className="ml-1 h-4 w-4" />}
      </button>
      
      {children && isOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          {children}
        </div>
      )}
    </div>
  );
};

const NavHeaderSubMenu = ({ children, active = false }) => {
  if (!active) return null;
  
  return (
    <div className="py-1">
      {children}
    </div>
  );
};

const NavHeaderSubMenuLink = ({ label, helperText, icon, link = "#" }) => {
  return (
    <a 
      href={link}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <div className="flex items-start">
        {icon && <span className="mr-3 mt-0.5">{icon}</span>}
        <div>
          <div className="font-medium">{label}</div>
          {helperText && <div className="text-xs text-gray-500 mt-0.5">{helperText}</div>}
        </div>
      </div>
    </a>
  );
};

const NavHeaderActions = ({ children }) => {
  return (
    <div className="flex items-center ml-auto space-x-2">
      {children}
    </div>
  );
};

const NavHeaderActionBtn = ({ label, icon, active = false, onClick }) => {
  return (
    <button 
      className={`p-2 rounded-md ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
      onClick={onClick}
      aria-label={label}
    >
      {icon}
    </button>
  );
};

export default function NavHeaderExamplePage() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeLink, setActiveLink] = useState('home');
  
  return (
    <div className="min-h-screen bg-background">
      <div className="mb-8 p-8">
        <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Examples
        </Link>
        <h1 className="text-4xl font-bold mt-4 mb-2">NavHeader Component</h1>
        <p className="text-muted-foreground mb-8">
          Navigation headers provide consistent navigation across the application.
        </p>
      </div>

      <div className="space-y-12">
        {/* Basic NavHeader */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 px-8">Basic NavHeader</h2>
          <NavHeader>
            <NavHeaderMain collapsed={collapsed} toggleCollapsed={setCollapsed}>
              <NavHeaderLogos logoSrc="https://via.placeholder.com/120x40" logoAlt="Company Logo" />
              
              <NavHeaderMenu>
                <NavHeaderLink 
                  label="Home" 
                  icon={<Home className="h-4 w-4" />} 
                  active={activeLink === 'home'}
                  onClick={() => setActiveLink('home')}
                />
                <NavHeaderLink 
                  label="Products" 
                  icon={<Package className="h-4 w-4" />} 
                  active={activeLink === 'products'}
                  onClick={() => setActiveLink('products')}
                />
                <NavHeaderLink 
                  label="Settings" 
                  icon={<Settings className="h-4 w-4" />} 
                  active={activeLink === 'settings'}
                  onClick={() => setActiveLink('settings')}
                />
              </NavHeaderMenu>
              
              <NavHeaderActions>
                <NavHeaderActionBtn 
                  label="Search" 
                  icon={<Search className="h-5 w-5" />} 
                />
                <NavHeaderActionBtn 
                  label="Notifications" 
                  icon={<Bell className="h-5 w-5" />} 
                />
                <NavHeaderActionBtn 
                  label="Profile" 
                  icon={<User className="h-5 w-5" />} 
                  active={activeLink === 'profile'}
                  onClick={() => setActiveLink('profile')}
                />
              </NavHeaderActions>
            </NavHeaderMain>
          </NavHeader>
        </section>

        {/* With Dropdown Menus */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 px-8">With Dropdown Menus</h2>
          <NavHeader>
            <NavHeaderMain collapsed={collapsed} toggleCollapsed={setCollapsed}>
              <NavHeaderLogos logoSrc="https://via.placeholder.com/120x40" logoAlt="Company Logo" />
              
              <NavHeaderMenu>
                <NavHeaderLink 
                  label="Home" 
                  active={activeLink === 'home'}
                  onClick={() => setActiveLink('home')}
                />
                <NavHeaderLink 
                  label="Products" 
                  active={activeLink === 'products'}
                  onClick={() => setActiveLink('products')}
                >
                  <NavHeaderSubMenu active={true}>
                    <NavHeaderSubMenuLink 
                      label="Electronics" 
                      helperText="Computers, phones, and more" 
                      icon={<Package className="h-4 w-4" />}
                    />
                    <NavHeaderSubMenuLink 
                      label="Clothing" 
                      helperText="Shirts, pants, and accessories" 
                      icon={<Package className="h-4 w-4" />}
                    />
                    <NavHeaderSubMenuLink 
                      label="Home Goods" 
                      helperText="Furniture and decor" 
                      icon={<Package className="h-4 w-4" />}
                    />
                  </NavHeaderSubMenu>
                </NavHeaderLink>
                <NavHeaderLink 
                  label="Services" 
                  active={activeLink === 'services'}
                  onClick={() => setActiveLink('services')}
                >
                  <NavHeaderSubMenu active={true}>
                    <NavHeaderSubMenuLink 
                      label="Consulting" 
                      helperText="Expert advice for your business" 
                      icon={<HelpCircle className="h-4 w-4" />}
                    />
                    <NavHeaderSubMenuLink 
                      label="Development" 
                      helperText="Custom software solutions" 
                      icon={<Settings className="h-4 w-4" />}
                    />
                  </NavHeaderSubMenu>
                </NavHeaderLink>
              </NavHeaderMenu>
              
              <NavHeaderActions>
                <NavHeaderActionBtn 
                  label="Cart" 
                  icon={<ShoppingCart className="h-5 w-5" />} 
                />
                <NavHeaderActionBtn 
                  label="Profile" 
                  icon={<User className="h-5 w-5" />} 
                />
              </NavHeaderActions>
            </NavHeaderMain>
          </NavHeader>
        </section>

        {/* Full Width */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 px-8">Full Width</h2>
          <NavHeader fullWidth={true}>
            <NavHeaderMain collapsed={collapsed} toggleCollapsed={setCollapsed}>
              <NavHeaderLogos logoSrc="https://via.placeholder.com/120x40" logoAlt="Company Logo" />
              
              <NavHeaderMenu>
                <NavHeaderLink label="Home" active={true} />
                <NavHeaderLink label="Products" />
                <NavHeaderLink label="Services" />
                <NavHeaderLink label="About" />
                <NavHeaderLink label="Contact" />
              </NavHeaderMenu>
              
              <NavHeaderActions>
                <NavHeaderActionBtn 
                  label="Search" 
                  icon={<Search className="h-5 w-5" />} 
                />
                <NavHeaderActionBtn 
                  label="Profile" 
                  icon={<User className="h-5 w-5" />} 
                />
              </NavHeaderActions>
            </NavHeaderMain>
          </NavHeader>
        </section>

        {/* With Government Identifier */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 px-8">With Government Identifier</h2>
          <NavHeader>
            <NavHeaderMain collapsed={collapsed} toggleCollapsed={setCollapsed}>
              <NavHeaderLogos 
                logoSrc="https://via.placeholder.com/120x40" 
                logoAlt="Company Logo"
                govSrc="https://via.placeholder.com/80x30"
                govAlt="Government Logo"
              />
              
              <NavHeaderMenu>
                <NavHeaderLink label="Home" active={true} />
                <NavHeaderLink label="Services" />
                <NavHeaderLink label="Information" />
                <NavHeaderLink label="Contact" />
              </NavHeaderMenu>
              
              <NavHeaderActions>
                <NavHeaderActionBtn 
                  label="Search" 
                  icon={<Search className="h-5 w-5" />} 
                />
              </NavHeaderActions>
            </NavHeaderMain>
          </NavHeader>
        </section>

        {/* Without Divider */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 px-8">Without Divider</h2>
          <NavHeader divider={false}>
            <NavHeaderMain collapsed={collapsed} toggleCollapsed={setCollapsed}>
              <NavHeaderLogos logoSrc="https://via.placeholder.com/120x40" logoAlt="Company Logo" />
              
              <NavHeaderMenu>
                <NavHeaderLink label="Home" active={true} />
                <NavHeaderLink label="Products" />
                <NavHeaderLink label="Services" />
                <NavHeaderLink label="About" />
              </NavHeaderMenu>
              
              <NavHeaderActions>
                <NavHeaderActionBtn 
                  label="Profile" 
                  icon={<User className="h-5 w-5" />} 
                />
              </NavHeaderActions>
            </NavHeaderMain>
          </NavHeader>
          <div className="bg-gray-100 p-8">
            <p className="text-center">Content below header without divider</p>
          </div>
        </section>

        {/* Usage Example */}
        <section className="pb-12">
          <h2 className="text-2xl font-semibold mb-4 px-8">Usage Example: E-commerce Header</h2>
          <NavHeader>
            <NavHeaderMain collapsed={collapsed} toggleCollapsed={setCollapsed}>
              <NavHeaderLogos logoSrc="https://via.placeholder.com/120x40" logoAlt="ShopSmart" />
              
              <NavHeaderMenu>
                <NavHeaderLink 
                  label="Home" 
                  active={true}
                />
                <NavHeaderLink 
                  label="Categories"
                >
                  <NavHeaderSubMenu active={true}>
                    <NavHeaderSubMenuLink 
                      label="Electronics" 
                      helperText="Computers, phones, and more" 
                    />
                    <NavHeaderSubMenuLink 
                      label="Clothing" 
                      helperText="Shirts, pants, and accessories" 
                    />
                    <NavHeaderSubMenuLink 
                      label="Home & Kitchen" 
                      helperText="Furniture, appliances, and decor" 
                    />
                    <NavHeaderSubMenuLink 
                      label="Books" 
                      helperText="Fiction, non-fiction, and textbooks" 
                    />
                  </NavHeaderSubMenu>
                </NavHeaderLink>
                <NavHeaderLink 
                  label="Deals"
                />
                <NavHeaderLink 
                  label="Services"
                >
                  <NavHeaderSubMenu active={true}>
                    <NavHeaderSubMenuLink 
                      label="Prime Membership" 
                      helperText="Free shipping and more" 
                    />
                    <NavHeaderSubMenuLink 
                      label="Gift Cards" 
                      helperText="Give the perfect gift" 
                    />
                    <NavHeaderSubMenuLink 
                      label="Customer Service" 
                      helperText="Help with orders and returns" 
                    />
                  </NavHeaderSubMenu>
                </NavHeaderLink>
              </NavHeaderMenu>
              
              <NavHeaderActions>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Search className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                <NavHeaderActionBtn 
                  label="Cart" 
                  icon={
                    <div className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                    </div>
                  } 
                />
                <NavHeaderActionBtn 
                  label="Profile" 
                  icon={<User className="h-5 w-5" />} 
                />
              </NavHeaderActions>
            </NavHeaderMain>
          </NavHeader>
        </section>
      </div>
    </div>
  );
}