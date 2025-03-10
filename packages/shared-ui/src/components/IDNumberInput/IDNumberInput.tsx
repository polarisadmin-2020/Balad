"use client";

import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import { cn } from '../../utils/styles';

export interface IDNumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: {
    ar?: string;
    en?: string;
  };
  showIcons?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  error?: boolean;
  className?: string;
}

const IDNumberInput = React.forwardRef<HTMLInputElement, IDNumberInputProps>(
  ({ 
    label = { ar: 'الرقم الوطني', en: 'ID Number' },
    showIcons = true,
    onEdit,
    onDelete,
    error,
    className,
    ...props 
  }, ref) => {
    return (
      <div className={cn(
        "bg-white rounded-lg border border-gray-200 p-4",
        error && "border-red-500",
        className
      )}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{label.ar}</span>
            <span className="text-xs text-gray-500">{label.en}</span>
          </div>
          {showIcons && (
            <div className="flex gap-2">
              {onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              {onEdit && (
                <button
                  type="button"
                  onClick={onEdit}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
        <input
          type="text"
          ref={ref}
          className={cn(
            "w-full px-3 py-2 border rounded-md bg-gray-50",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            error ? "border-red-500" : "border-gray-300",
            "placeholder-gray-400",
            "disabled:bg-gray-100 disabled:cursor-not-allowed"
          )}
          placeholder="حقل نص"
          {...props}
        />
      </div>
    );
  }
);

IDNumberInput.displayName = 'IDNumberInput';

export default IDNumberInput;