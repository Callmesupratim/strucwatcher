
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FileText, ChevronDown, Calendar as CalendarIcon, Download } from 'lucide-react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';
import { format, subDays, subHours, subWeeks, startOfDay, endOfDay } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import type { DateRange } from 'react-day-picker';

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
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [generatingReport, setGeneratingReport] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
      
      setShowConfirmDialog(true);
    } else {
      generateReport();
    }
  };

  const generateReport = () => {
    setGeneratingReport(true);
    
    // Determine dates based on selected timeRange
    let startDate: Date | undefined;
    let endDate: Date | undefined;
    
    const now = new Date();
    
    if (timeRange === 'hourly') {
      startDate = subHours(now, 24);
      endDate = now;
    } else if (timeRange === 'daily') {
      startDate = startOfDay(subDays(now, 7));
      endDate = endOfDay(now);
    } else if (timeRange === 'weekly') {
      startDate = startOfDay(subWeeks(now, 4));
      endDate = endOfDay(now);
    } else if (timeRange === 'custom' && dateRange.from && dateRange.to) {
      startDate = startOfDay(dateRange.from);
      endDate = endOfDay(dateRange.to);
    }

    // Simulate report generation
    setTimeout(() => {
      onGenerate?.(timeRange, startDate, endDate);
      
      // Show success toast
      if (timeRange === 'custom' && dateRange.from && dateRange.to) {
        toast({
          title: "Report generated successfully",
          description: `Custom report from ${format(dateRange.from, 'MMM d, yyyy')} to ${format(dateRange.to, 'MMM d, yyyy')} is ready for download`,
        });
      } else {
        const reportTypes = {
          hourly: 'Last 24 hours',
          daily: 'Last 7 days',
          weekly: 'Last 4 weeks',
        };
        
        toast({
          title: "Report generated successfully",
          description: `${reportTypes[timeRange]} report is ready for download`,
        });
      }
      
      setGeneratingReport(false);
      setShowConfirmDialog(false);
    }, 1500);
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
    <>
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

        <Button 
          onClick={handleGenerate} 
          className="gap-2" 
          disabled={generatingReport}
        >
          {generatingReport ? (
            <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          {generatingReport ? "Generating..." : "Generate Report"}
        </Button>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Generate Custom Report</AlertDialogTitle>
            <AlertDialogDescription>
              {dateRange.from && dateRange.to ? (
                <>
                  Generate a report for the period from{" "}
                  <strong>{format(dateRange.from, 'MMMM d, yyyy')}</strong> to{" "}
                  <strong>{format(dateRange.to, 'MMMM d, yyyy')}</strong>?
                </>
              ) : (
                "Please select a date range for your custom report."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={generateReport} className="gap-2">
              <Download className="h-4 w-4" />
              Generate Report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ReportButton;
