"use client";

import React from 'react';
import Avatar from '@monorepo/shared-ui/src/components/Avatar/Avatar';
import { cn } from '@monorepo/shared-ui/src/utils/styles';

export interface ActivityItemProps {
  avatar?: {
    src?: string;
    initials?: string;
    icon?: React.ReactNode;
  };
  title: string;
  description: string;
  timestamp: string;
  className?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  avatar,
  title,
  description,
  timestamp,
  className
}) => {
  return (
    <div className={cn("flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0", className)}>
      {avatar && (
        <Avatar 
          size="sm"
          src={avatar.src}
          initials={avatar.initials}
          fallback={avatar.icon}
        />
      )}
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityItem;