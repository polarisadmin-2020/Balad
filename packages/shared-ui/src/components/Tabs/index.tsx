"use client";

import React, { useState } from 'react';
import { cn } from '../../utils/styles';

export interface IIconMapping {
  [key: string]: JSX.Element;
}

export interface ITab {
  label: string;
  link?: string;
  tabIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export interface ITabsComponentProps {
  size: string;
  orientation: "horizontal" | "vertical";
  external: boolean;
  flush?: boolean;
  divider?: boolean;
  tabsList: ITab[];
  extraClass?: string;
}

export interface ITabComponentProps {
  label: string;
  link?: string;
  external?: boolean;
  size: string;
  tabIcon?: React.ReactNode;
  active: boolean;
  setActive: () => void;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const TabComponent: React.FC<ITabComponentProps> = ({
  label,
  link,
  external,
  size,
  tabIcon,
  active,
  setActive,
  onClick
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    } else {
      e.preventDefault();
      setActive();
    }
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-2.5'
  };

  return (
    <a
      href={link || '#'}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      className={cn(
        'flex items-center rounded-md transition-colors',
        sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.md,
        active ? 'active' : '',
      )}
    >
      {tabIcon && <span className="mr-2">{tabIcon}</span>}
      {label}
    </a>
  );
};

const TabsComponent: React.FC<ITabsComponentProps> = ({
  size = 'md',
  orientation = 'horizontal',
  external = false,
  flush = false,
  divider = true,
  tabsList = [],
  extraClass = ''
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div 
      className={cn(
        'tabs-component',
        orientation === 'vertical' ? 'flex flex-col' : 'flex',
        flush ? 'space-x-0' : 'space-x-2',
        extraClass
      )}
    >
      {tabsList.map((tab, index) => (
        <TabComponent
          key={index}
          label={tab.label}
          link={tab.link}
          external={external}
          size={size}
          tabIcon={tab.tabIcon}
          active={index === activeTabIndex}
          setActive={() => setActiveTabIndex(index)}
          onClick={tab.onClick}
        />
      ))}
    </div>
  );
};

export default TabsComponent;