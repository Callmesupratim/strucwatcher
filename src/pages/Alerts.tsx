
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/Header';
import AppSidebar from '@/components/Sidebar';
import AlertItem from '@/components/AlertItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Filter, CheckCircle, Bell } from 'lucide-react';

// Sample alerts data
const activeAlerts = [
  {
    id: 'a1',
    title: 'High Strain Detected',
    message: 'South support beam strain exceeding threshold (5.1 kN)',
    timestamp: '10 minutes ago',
    status: 'critical',
  },
  {
    id: 'a2',
    title: 'Abnormal Vibration',
    message: 'Abnormal vibration patterns detected in central section',
    timestamp: '32 minutes ago',
    status: 'warning',
  },
  {
    id: 'a3',
    title: 'Temperature Increase',
    message: 'Temperature rising faster than expected in north section',
    timestamp: '1 hour ago',
    status: 'warning',
  },
  {
    id: 'a4',
    title: 'Sensor Connectivity Issue',
    message: 'Displacement sensors in south section are offline',
    timestamp: '3 hours ago',
    status: 'critical',
  },
];

const resolvedAlerts = [
  {
    id: 'r1',
    title: 'Sensor Calibration Required',
    message: 'Temperature sensors showing inconsistent readings',
    timestamp: 'Yesterday, 14:23',
    status: 'info',
    resolved: true,
  },
  {
    id: 'r2',
    title: 'Wind Load Warning',
    message: 'High wind loads detected on exposed sections',
    timestamp: 'Yesterday, 09:41',
    status: 'warning',
    resolved: true,
  },
  {
    id: 'r3',
    title: 'Vibration Threshold Exceeded',
    message: 'Vibration exceeded safety threshold during rush hour',
    timestamp: '2 days ago',
    status: 'critical',
    resolved: true,
  },
  {
    id: 'r4',
    title: 'Battery Level Low',
    message: 'Wireless sensor battery levels below 20%',
    timestamp: '3 days ago',
    status: 'warning',
    resolved: true,
  },
  {
    id: 'r5',
    title: 'System Update Required',
    message: 'Software update available for monitoring system',
    timestamp: '1 week ago',
    status: 'info',
    resolved: true,
  },
];

const Alerts = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-monitor-background">
        <AppSidebar />
        <div className="flex-1">
          <Header title="Alerts" />
          <main className="p-4 md:p-6">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Alert Management</h2>
                <p className="text-muted-foreground">Monitor and manage system alerts</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Configure Alerts
                </Button>
              </div>
            </div>

            <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-monitor-critical rounded-full w-10 h-10 flex items-center justify-center text-white mr-4">
                    <span className="font-bold">{activeAlerts.length}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Active Alerts</h3>
                    <p className="text-sm text-muted-foreground">{activeAlerts.filter(a => a.status === 'critical').length} critical issues require attention</p>
                  </div>
                </div>
                <Button>
                  Acknowledge All
                </Button>
              </div>
            </div>

            <Tabs defaultValue="active" className="mb-6">
              <TabsList>
                <TabsTrigger value="active">Active Alerts</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
                <TabsTrigger value="all">All Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-4">
                <div className="space-y-3">
                  {activeAlerts.map((alert) => (
                    <AlertItem 
                      key={alert.id}
                      title={alert.title}
                      message={alert.message}
                      timestamp={alert.timestamp}
                      status={alert.status as any}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resolved" className="mt-4">
                <div className="space-y-3">
                  {resolvedAlerts.map((alert) => (
                    <AlertItem 
                      key={alert.id}
                      title={alert.title}
                      message={alert.message}
                      timestamp={alert.timestamp}
                      status={alert.status as any}
                      resolved={alert.resolved}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="all" className="mt-4">
                <div className="space-y-3">
                  {activeAlerts.map((alert) => (
                    <AlertItem 
                      key={alert.id}
                      title={alert.title}
                      message={alert.message}
                      timestamp={alert.timestamp}
                      status={alert.status as any}
                    />
                  ))}
                  {resolvedAlerts.map((alert) => (
                    <AlertItem 
                      key={alert.id}
                      title={alert.title}
                      message={alert.message}
                      timestamp={alert.timestamp}
                      status={alert.status as any}
                      resolved={alert.resolved}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center bg-monitor-background p-4 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-monitor-success" />
              </div>
              <h3 className="text-lg font-medium mb-2">Alert Notifications</h3>
              <p className="text-muted-foreground mb-4">You're receiving notifications for critical and warning alerts</p>
              <div className="flex justify-center gap-3">
                <Button variant="outline">Configure Notifications</Button>
                <Button>Generate Alert Report</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Alerts;
