"use client";

import React from 'react';
import { cn } from '../../utils/styles';

interface Column {
  key: string;
  header: string;
  width?: string;
}

interface TabType {
  Name: string;
  Target: string;
  Children?: TabType[];
  [key: string]: any; // Allow additional properties for column data
}

interface TableOfContentProps {
  sections: TabType[];
  title: string;
  subTitle: string;
  columns?: Column[];
}

const TableOfContent: React.FC<TableOfContentProps> = ({
  sections,
  columns = []
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
     
        {sections.map((section, index) => (
          <div key={index} className="mb-6 last:mb-0">
            {section.Children && section.Children.length > 0 ? (
              <div className="space-y-3">
                {columns.length > 0 ? (
                  <div className=" border rounded-lg">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          {columns.map((column, colIndex) => (
                            <th
                              key={colIndex}
                              className="px-4 py-3 text-right text-sm font-medium text-gray-600"
                              style={column.width ? { width: column.width } : {}}
                            >
                              {column.header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {section.Children.map((child, childIndex) => (
                          <tr key={childIndex} className="hover:bg-gray-50">
                            {columns.map((column, colIndex) => (
                              <td key={colIndex} className="px-4 py-3 text-sm">
                                {child[column.key]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  section.Children.map((child, childIndex) => (
                    <div
                      key={childIndex}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{child.Name}</span>
                        {child.Children && child.Children.length > 0 && (
                          <span className="text-sm text-gray-500">
                            {child.Children.length} items
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No items available
              </div>
            )}
          </div>
        ))}
     
    </div>
  );
};

export default TableOfContent;