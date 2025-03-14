
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  className, 
  children 
}) => {
  return (
    <Card className={cn("h-full shadow-sm", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
