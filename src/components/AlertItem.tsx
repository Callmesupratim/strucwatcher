
import React from 'react';
import { AlertTriangle, AlertOctagon, CheckCircle, Info, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusType } from './StatusIndicator';

interface AlertItemProps {
  title: string;
  message: string;
  timestamp: string;
  status: StatusType;
  resolved?: boolean;
  className?: string;
}

const AlertItem: React.FC<AlertItemProps> = ({
  title,
  message,
  timestamp,
  status,
  resolved = false,
  className
}) => {
  const getStatusIcon = (status: StatusType) => {
    const commonClasses = "h-5 w-5 mr-2";

    switch (status) {
      case 'critical':
        return <AlertOctagon className={cn(commonClasses, "text-monitor-critical")} />;
      case 'warning':
        return <AlertTriangle className={cn(commonClasses, "text-monitor-warning")} />;
      case 'normal':
        return <CheckCircle className={cn(commonClasses, "text-monitor-success")} />;
      case 'info':
        return <Info className={cn(commonClasses, "text-monitor-info")} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "border rounded-md p-4 mb-3 bg-white shadow-sm transition-all",
      resolved && "opacity-70",
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className="mt-0.5">
            {getStatusIcon(status)}
          </div>
          <div>
            <h3 className="font-medium mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5 mr-1" />
          {timestamp}
        </div>
      </div>
      {resolved && (
        <div className="mt-2 flex items-center text-xs text-monitor-success">
          <CheckCircle className="h-3.5 w-3.5 mr-1" />
          Resolved
        </div>
      )}
    </div>
  );
};

export default AlertItem;
