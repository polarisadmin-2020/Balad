"use client";

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/styles';

export interface ModalProps {
  show?: boolean;
  title?: string;
  closeButton?: boolean;
  onClose?: () => void;
  featuredIconColor?: "brand" | "gray" | "error" | "warning" | "success" | "info";
  featuredIconStyle?: "light" | "outlined" | "hard";
  featuredIconType?: "infoCircle" | "error";
  featuredIconCircle?: boolean;
  featuredIconSize?: "xl" | "lg" | "md" | "sm";
  alignmentCenter?: boolean;
  actionStack?: boolean;
  actionFillContainer?: boolean;
  secondBtnPosition?: "left" | "right";
  position?: "start" | "end" | "center";
  children?: React.ReactNode;
  staticModal?: boolean;
  buttonsList?: {
    id?: string;
    label: string;
    onClick: (event?: any) => void;
    extraClass?: string;
    title?: string;
  }[];
}

const Modal: React.FC<ModalProps> = ({
  show = false,
  title,
  closeButton = true,
  onClose,
  children,
  alignmentCenter = false,
  buttonsList = [],
  position = "center",
}) => {
  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        "fixed z-50 transition-all duration-200",
        position === "center" ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :
        position === "start" ? "top-4 left-4" :
        "top-4 right-4"
      )}>
        <div className="bg-background rounded-lg shadow-lg w-full max-w-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className={cn(
              "text-lg font-semibold",
              alignmentCenter && "w-full text-center"
            )}>
              {title}
            </h2>
            {closeButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {children}
          </div>

          {/* Footer */}
          {buttonsList.length > 0 && (
            <div className="flex justify-end gap-2 p-4 border-t">
              {buttonsList.map((button) => (
                <button
                  key={button.id}
                  onClick={button.onClick}
                  className={cn(
                    "px-4 py-2 rounded-md transition-colors",
                    button.extraClass
                  )}
                >
                  {button.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;