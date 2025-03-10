"use client";

import React from 'react';
import { Check, Circle, ChevronDown, File, Image, Lock } from 'lucide-react';

// Field type components
export const FieldTypeIcon = ({ type }) => {
  switch (type) {
    case 'checkbox':
      return <Check className="h-4 w-4" />;
    case 'radio':
      return <Circle className="h-4 w-4" />;
    case 'select':
      return <ChevronDown className="h-4 w-4" />;
    case 'file':
      return <File className="h-4 w-4" />;
    case 'image':
      return <Image className="h-4 w-4" />;
    case 'password':
      return <Lock className="h-4 w-4" />;
    default:
      return null;
  }
};

// Field card components
export const FieldCard = ({ children }) => {
  return <div className="field-card">{children}</div>;
};

export const FieldCardHeader = ({ children }) => {
  return <div className="field-card-header">{children}</div>;
};

export const FieldCardTitle = ({ children }) => {
  return <div className="field-card-title">{children}</div>;
};

export const FieldCardTitleIcon = ({ children }) => {
  return <div className="field-card-title-icon">{children}</div>;
};

export const FieldCardTitleText = ({ children }) => {
  return <div className="field-card-title-text">{children}</div>;
};

export const FieldCardActions = ({ children }) => {
  return <div className="field-card-actions">{children}</div>;
};

export const FieldCardActionButton = ({ children, onClick }) => {
  return (
    <button className="field-card-action-button" onClick={onClick}>
      {children}
    </button>
  );
};

export const FieldCardBody = ({ children }) => {
  return <div className="field-card-body">{children}</div>;
};

export const FieldInput = ({ type, placeholder }) => {
  return (
    <input 
      type={type || 'text'} 
      className="form-input" 
      placeholder={placeholder}
    />
  );
};

export const SelectTodayButton = ({ children }) => {
  return (
    <button className="btn btn-outline mt-2 w-full text-sm">
      {children}
    </button>
  );
};

// Layout components
export const Container = ({ children, dir }) => {
  return <div className="service-design-container" dir={dir}>{children}</div>;
};

export const ContentContainer = ({ children }) => {
  return <div className="flex min-h-[calc(100vh-64px)]">{children}</div>;
};

export const ThreeColumnLayout = ({ children }) => {
  return <div className="flex min-h-[calc(100vh-64px)]">{children}</div>;
};

export const LeftSidebar = ({ children }) => {
  return <div className="service-design-sidebar service-design-sidebar-left">{children}</div>;
};

export const MainContent = ({ children }) => {
  return <div className="service-design-content">{children}</div>;
};

export const RightSidebar = ({ children }) => {
  return <div className="service-design-sidebar service-design-sidebar-right">{children}</div>;
};

export const RightSidebarInner = ({ children }) => {
  return <div>{children}</div>;
};

export const RightSidebarTitle = ({ children }) => {
  return <div className="sidebar-title">{children}</div>;
};

export const RightSidebarTitleText = ({ children }) => {
  return <span>{children}</span>;
};

export const RightSidebarItems = ({ children }) => {
  return <div>{children}</div>;
};

export const RightSidebarItem = ({ children, active }) => {
  return (
    <div className={`category-item ${active ? 'bg-[#166A45]' : ''}`} style={{ position: 'relative' }}>
      {children}
    </div>
  );
};

export const RightSidebarItemTitle = ({ children }) => {
  return <div>{children}</div>;
};

export const RightSidebarItemText = ({ children }) => {
  return <span>{children}</span>;
};

export const RightSidebarItemIndicator = ({ children }) => {
  return <div className="absolute top-0 bottom-0 right-0 w-1 bg-green-500">{children}</div>;
};

export const RightSidebarItemSelector = () => {
  return <div className="h-full w-full bg-green-500"></div>;
};

export const RightSidebarSubItem = ({ children }) => {
  return <div className="category-item" style={{ position: 'relative' }}>{children}</div>;
};

export const RightSidebarSubItemTitle = ({ children }) => {
  return <div>{children}</div>;
};

export const RightSidebarSubItemText = ({ children }) => {
  return <span>{children}</span>;
};

export const NestingIndicator = ({ children }) => {
  return <div className="absolute left-0 top-0 bottom-0 w-1">{children}</div>;
};

export const NestingIndicatorLine = () => {
  return <div className="h-full w-full bg-gray-300"></div>;
};

export const FieldsContainer = ({ children }) => {
  return <div>{children}</div>;
};

export const FieldsGrid = ({ children }) => {
  return <div className="field-grid">{children}</div>;
};

export const PaginationContainer = ({ children }) => {
  return <div className="pagination">{children}</div>;
};

export const PaginationButton = ({ children }) => {
  return <button className="pagination-button">{children}</button>;
};

export const PaginationNumber = ({ children, active }) => {
  return <div className={`pagination-number ${active ? 'active' : ''}`}>{children}</div>;
};

export const PaginationNumberText = ({ children }) => {
  return <span>{children}</span>;
};

export const PaginationIndicator = () => {
  return <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500"></div>;
};