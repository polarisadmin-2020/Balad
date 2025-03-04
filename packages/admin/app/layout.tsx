"use client";

import './globals.css';
import { useState } from 'react';
import { Bell, Search, User, Home, ChevronDown, MapPin } from 'lucide-react';
import { useTheme } from '@monorepo/shared-ui/src/hooks/useTheme';
import { 
  NavHeader, 
  NavHeaderMain, 
  NavHeaderLogos, 
  NavHeaderMenu, 
  NavHeaderLink, 
  NavHeaderActions, 
  NavHeaderActionBtn 
} from '../components/layout/NavHeader';
import MobileMenu from '../components/layout/MobileMenu';
import { useRouter } from 'next/navigation';
import { LanguageProvider, useLanguage } from '../hooks/useLanguage';

function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const [activeLink, setActiveLink] = useState('home');
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const router = useRouter();

  // Define dropdown menu items - only keeping موقع الجغرافي
  const dataReferenceItems = [
    { label: 'موقع الجغرافي', href: '/geographic-location', icon: <MapPin className="h-4 w-4" /> }
  ];

  const servicesItems = [
    { label: 'تعريف الخدمات', href: '/services/definition', icon: <Home className="h-4 w-4" /> },
    { label: 'تصميم الخدمات', href: '/services/design', icon: <Home className="h-4 w-4" /> }
  ];

  const accountsItems = [
    { label: 'المستخدمين', href: '/users', icon: <User className="h-4 w-4" /> }
  ];

  const handleNavigation = (link: string, path: string) => {
    setActiveLink(link);
    router.push(path);
  };

  return (
    <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="min-h-screen bg-background flex flex-col">
          <NavHeader>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <NavHeaderMain collapsed={collapsed} toggleCollapsed={setCollapsed}>
                  <NavHeaderLogos 
                    logoSrc="/images/polaris-logo3.png" 
                    logoAlt="Polaris Logo" 
                  />
                  
                  <NavHeaderMenu>
                    <NavHeaderLink 
                      label="الرئيسية" 
                      active={activeLink === 'home'}
                      onClick={() => handleNavigation('home', '/')}
                    />
                    <NavHeaderLink 
                      label="الخدمات" 
                      icon={<ChevronDown className="h-4 w-4" />} 
                      active={activeLink === 'services'}
                      onClick={() => setActiveLink('services')}
                      subMenuItems={servicesItems}
                    />
                    <NavHeaderLink 
                      label="مرجع البيانات" 
                      icon={<ChevronDown className="h-4 w-4" />} 
                      active={activeLink === 'data-reference'}
                      onClick={() => setActiveLink('data-reference')}
                      subMenuItems={dataReferenceItems}
                    />
                    <NavHeaderLink 
                      label="الحسابات" 
                      icon={<ChevronDown className="h-4 w-4" />} 
                      active={activeLink === 'accounts'}
                      onClick={() => setActiveLink('accounts')}
                      subMenuItems={accountsItems}
                    />
                  </NavHeaderMenu>
                </NavHeaderMain>
              </div>
              
              <NavHeaderActions>
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center justify-center p-2 rounded-md text-white hover:bg-sa-700 transition-colors"
                  aria-label="Toggle language"
                >
                  <span className="text-sm font-medium">
                    {language === 'ar' ? 'English' : 'العربية'}
                  </span>
                </button>
                <NavHeaderActionBtn 
                  label="إشعارات" 
                  icon={<Bell className="h-5 w-5" />} 
                  onClick={() => {}}
                />
                <NavHeaderActionBtn 
                  label="الملف الشخصي" 
                  icon={<User className="h-5 w-5" />} 
                  onClick={() => {}}
                />
              </NavHeaderActions>
            </div>
          </NavHeader>
          
          <MobileMenu 
            isOpen={!collapsed} 
            onClose={() => setCollapsed(true)}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
          />
          
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <AppLayout>{children}</AppLayout>
    </LanguageProvider>
  );
}