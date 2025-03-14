
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FileText, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

type TimeRange = 'hourly' | 'daily' | 'weekly' | 'custom';

interface ReportButtonProps {
  onGenerate?: (timeRange: TimeRange, startDate?: Date, endDate?: Date) => void;
  className?: string;
}

const ReportButton: React.FC<ReportButtonProps> = ({ 
  onGenerate, 
  className 
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const handleGenerate = () => {
    if (timeRange === 'custom') {
      if (!dateRange.from || !dateRange.to) {
        toast({
          title: "Date range required",
          description: "Please select both start and end dates for custom report",
          variant: "destructive",
        });
        return;
      }
      
      onGenerate?.('custom', dateRange.from, dateRange.to);
      toast({
        title: "Generating custom report",
        description: `From ${format(dateRange.from, 'MMM d, yyyy')} to ${format(dateRange.to, 'MMM d, yyyy')}`,
      });
    } else {
      onGenerate?.(timeRange);
      toast({
        title: "Generating report",
        description: `${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} report is being generated`,
      });
    }
  };

  const selectTimeRange = (range: TimeRange) => {
    setTimeRange(range);
    if (range === 'custom') {
      setShowCustomDatePicker(true);
    } else {
      setShowCustomDatePicker(false);
    }
  };

  let dateDisplay = 'Select time period';
  
  if (timeRange === 'hourly') dateDisplay = 'Hourly Report';
  if (timeRange === 'daily') dateDisplay = 'Daily Report';
  if (timeRange === 'weekly') dateDisplay = 'Weekly Report';
  if (timeRange === 'custom' && dateRange.from && dateRange.to) {
    dateDisplay = `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d, yyyy')}`;
  } else if (timeRange === 'custom') {
    dateDisplay = 'Custom Period';
  }

  return (
    <div className={cn("flex flex-col sm:flex-row gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[180px] justify-between">
            <span>{dateDisplay}</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[180px]">
          <DropdownMenuItem onSelect={() => selectTimeRange('hourly')}>
            Hourly
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => selectTimeRange('daily')}>
            Daily
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => selectTimeRange('weekly')}>
            Weekly
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => selectTimeRange('custom')}>
            Custom Period
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {timeRange === 'custom' && (
        <Popover open={showCustomDatePicker} onOpenChange={setShowCustomDatePicker}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-[220px] justify-between">
              {dateRange.from && dateRange.to ? (
                <span>
                  {format(dateRange.from, 'MMM d')} - {format(dateRange.to, 'MMM d, yyyy')}
                </span>
              ) : (
                <span>Select date range</span>
              )}
              <CalendarIcon className="h-4 w-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      )}

      <Button onClick={handleGenerate} className="gap-2">
        <FileText className="h-4 w-4" />
        Generate Report
      </Button>
    </div>
  );
};

export default ReportButton;
