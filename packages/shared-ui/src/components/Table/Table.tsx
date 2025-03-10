"use client";

import React from 'react';
import { cn } from '../../utils/styles';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  error = null,
  emptyMessage = 'No data available',
  className = '',
  headerClassName = '',
  bodyClassName = ''
}: TableProps<T>) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full">
        <thead className={headerClassName}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  "py-4 px-4 text-sm font-medium text-gray-600",
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right',
                  column.align === 'left' && 'text-left'
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={bodyClassName}>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={cn(
                    "py-4 px-4",
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.align === 'left' && 'text-left'
                  )}
                >
                  {typeof column.accessor === 'function'
                    ? column.accessor(row)
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;