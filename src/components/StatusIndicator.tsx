
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertTriangle, AlertOctagon, Info } from 'lucide-react';

export type StatusType = 'critical' | 'warning' | 'normal' | 'info';
export type SensorStatus = 'active' | 'inactive' | 'maintenance';

interface StatusIndicatorProps {
  status: StatusType | SensorStatus;
  label?: string;
  value?: string | number;
  animate?: boolean;
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  value,
  animate = false,
  className
}) => {
  const getStatusClasses = (status: StatusType | SensorStatus) => {
    switch (status) {
      case 'critical':
        return 'bg-monitor-critical text-white';
      case 'warning':
        return 'bg-monitor-warning text-white';
      case 'normal':
      case 'active':
        return 'bg-monitor-success text-white';
      case 'info':
        return 'bg-monitor-info text-white';
      case 'inactive':
        return 'bg-gray-400 text-white';
      case 'maintenance':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const getStatusIcon = (status: StatusType | SensorStatus) => {
    switch (status) {
      case 'critical':
        return <AlertOctagon className="h-5 w-5" />;
      case 'warning':
      case 'maintenance':
        return <AlertTriangle className="h-5 w-5" />;
      case 'normal':
      case 'active':
        return <CheckCircle className="h-5 w-5" />;
      case 'info':
      case 'inactive':
        return <Info className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("rounded-lg overflow-hidden shadow-sm", className)}>
      <div className={cn(
        "p-4 flex items-center justify-between",
        getStatusClasses(status),
        animate && status === 'critical' && "animate-pulse-slow"
      )}>
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          <span className="font-medium">{label}</span>
        </div>
        {value && <span className="text-xl font-bold">{value}</span>}
      </div>
    </div>
  );
};

export default StatusIndicator;
