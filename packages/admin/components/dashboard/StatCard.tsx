"use client";

import React from 'react';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import { cn } from '@monorepo/shared-ui/src/utils/styles';

interface StatCardProps {
  title: string;
  value: string | number;
  change: {
    value: string;
    positive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  className 
}) => {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
          <div className={cn(
            "text-sm mt-2",
            change.positive ? "text-green-500" : "text-red-500"
          )}>
            {change.value}
          </div>
        </div>
        {icon && (
          <div className="p-2 bg-primary/10 rounded-full">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;