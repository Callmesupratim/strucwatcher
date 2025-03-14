
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/Header';
import AppSidebar from '@/components/Sidebar';
import DashboardCard from '@/components/DashboardCard';
import SensorChart from '@/components/SensorChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample data for demonstration
const temperatureData = [
  { timestamp: 'Jan', sensor1: 22.3, sensor2: 21.5, sensor3: 23.1 },
  { timestamp: 'Feb', sensor1: 23.1, sensor2: 22.0, sensor3: 23.8 },
  { timestamp: 'Mar', sensor1: 24.2, sensor2: 23.1, sensor3: 24.5 },
  { timestamp: 'Apr', sensor1: 25.7, sensor2: 24.9, sensor3: 26.2 },
  { timestamp: 'May', sensor1: 27.3, sensor2: 26.5, sensor3: 27.9 },
  { timestamp: 'Jun', sensor1: 28.8, sensor2: 28.0, sensor3: 29.5 },
  { timestamp: 'Jul', sensor1: 29.5, sensor2: 28.7, sensor3: 30.2 },
  { timestamp: 'Aug', sensor1: 29.1, sensor2: 28.3, sensor3: 29.7 },
  { timestamp: 'Sep', sensor1: 27.6, sensor2: 26.8, sensor3: 28.2 },
  { timestamp: 'Oct', sensor1: 25.9, sensor2: 25.1, sensor3: 26.5 },
  { timestamp: 'Nov', sensor1: 24.0, sensor2: 23.2, sensor3: 24.6 },
  { timestamp: 'Dec', sensor1: 22.7, sensor2: 21.9, sensor3: 23.3 },
];

const vibrationData = [
  { timestamp: 'Jan', sensor1: 0.03, sensor2: 0.04, sensor3: 0.03 },
  { timestamp: 'Feb', sensor1: 0.04, sensor2: 0.05, sensor3: 0.04 },
  { timestamp: 'Mar', sensor1: 0.05, sensor2: 0.06, sensor3: 0.05 },
  { timestamp: 'Apr', sensor1: 0.07, sensor2: 0.08, sensor3: 0.07 },
  { timestamp: 'May', sensor1: 0.09, sensor2: 0.10, sensor3: 0.09 },
  { timestamp: 'Jun', sensor1: 0.12, sensor2: 0.14, sensor3: 0.13 },
  { timestamp: 'Jul', sensor1: 0.14, sensor2: 0.16, sensor3: 0.15 },
  { timestamp: 'Aug', sensor1: 0.13, sensor2: 0.15, sensor3: 0.14 },
  { timestamp: 'Sep', sensor1: 0.10, sensor2: 0.12, sensor3: 0.11 },
  { timestamp: 'Oct', sensor1: 0.08, sensor2: 0.09, sensor3: 0.08 },
  { timestamp: 'Nov', sensor1: 0.06, sensor2: 0.07, sensor3: 0.06 },
  { timestamp: 'Dec', sensor1: 0.04, sensor2: 0.05, sensor3: 0.04 },
];

const strainData = [
  { timestamp: 'Jan', sensor1: 3.5, sensor2: 3.7, sensor3: 3.6 },
  { timestamp: 'Feb', sensor1: 3.6, sensor2: 3.8, sensor3: 3.7 },
  { timestamp: 'Mar', sensor1: 3.8, sensor2: 4.0, sensor3: 3.9 },
  { timestamp: 'Apr', sensor1: 4.1, sensor2: 4.3, sensor3: 4.2 },
  { timestamp: 'May', sensor1: 4.4, sensor2: 4.6, sensor3: 4.5 },
  { timestamp: 'Jun', sensor1: 4.7, sensor2: 4.9, sensor3: 4.8 },
  { timestamp: 'Jul', sensor1: 5.0, sensor2: 5.2, sensor3: 5.1 },
  { timestamp: 'Aug', sensor1: 4.9, sensor2: 5.1, sensor3: 5.0 },
  { timestamp: 'Sep', sensor1: 4.6, sensor2: 4.8, sensor3: 4.7 },
  { timestamp: 'Oct', sensor1: 4.3, sensor2: 4.5, sensor3: 4.4 },
  { timestamp: 'Nov', sensor1: 4.0, sensor2: 4.2, sensor3: 4.1 },
  { timestamp: 'Dec', sensor1: 3.7, sensor2: 3.9, sensor3: 3.8 },
];

const Monitoring = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-monitor-background">
        <AppSidebar />
        <div className="flex-1">
          <Header title="Monitoring" />
          <main className="p-4 md:p-6">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Sensor Data Analysis</h2>
                <p className="text-muted-foreground">View and analyze sensor data over time</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Select defaultValue="yearly">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="north">North Structure</SelectItem>
                    <SelectItem value="south">South Structure</SelectItem>
                    <SelectItem value="central">Central Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-8">
              <Tabs defaultValue="temperature">
                <TabsList className="mb-4">
                  <TabsTrigger value="temperature">Temperature</TabsTrigger>
                  <TabsTrigger value="vibration">Vibration</TabsTrigger>
                  <TabsTrigger value="strain">Strain</TabsTrigger>
                  <TabsTrigger value="displacement">Displacement</TabsTrigger>
                </TabsList>
                
                <TabsContent value="temperature">
                  <SensorChart 
                    title="Temperature Data (°C)" 
                    data={temperatureData}
                    dataKeys={[
                      { key: 'sensor1', name: 'North Sensor', color: '#8B5CF6' },
                      { key: 'sensor2', name: 'South Sensor', color: '#0EA5E9' },
                      { key: 'sensor3', name: 'Central Sensor', color: '#10B981' }
                    ]}
                    yAxisLabel="°C"
                    height={400}
                  />
                </TabsContent>
                
                <TabsContent value="vibration">
                  <SensorChart 
                    title="Vibration Data (g)" 
                    data={vibrationData}
                    dataKeys={[
                      { key: 'sensor1', name: 'North Sensor', color: '#F97316' },
                      { key: 'sensor2', name: 'South Sensor', color: '#EA384C' },
                      { key: 'sensor3', name: 'Central Sensor', color: '#0EA5E9' }
                    ]}
                    yAxisLabel="g"
                    height={400}
                  />
                </TabsContent>
                
                <TabsContent value="strain">
                  <SensorChart 
                    title="Strain Data (kN)" 
                    data={strainData}
                    dataKeys={[
                      { key: 'sensor1', name: 'North Sensor', color: '#EA384C' },
                      { key: 'sensor2', name: 'South Sensor', color: '#F97316' },
                      { key: 'sensor3', name: 'Central Sensor', color: '#8B5CF6' }
                    ]}
                    yAxisLabel="kN"
                    height={400}
                  />
                </TabsContent>
                
                <TabsContent value="displacement">
                  <div className="bg-white p-10 rounded-lg flex items-center justify-center text-center">
                    <div>
                      <p className="text-muted-foreground mb-2">Displacement sensor data will be available soon</p>
                      <p className="text-xs text-muted-foreground">Data collection in progress</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCard title="Sensor Health Status" description="Operational status of all sensors">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span>Temperature Sensors</span>
                    <span className="text-monitor-success font-medium">All Operational (8/8)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span>Vibration Sensors</span>
                    <span className="text-monitor-success font-medium">All Operational (12/12)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span>Strain Gauges</span>
                    <span className="text-monitor-warning font-medium">Partial (14/16)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span>Displacement Sensors</span>
                    <span className="text-monitor-critical font-medium">Offline (0/6)</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>Connectivity Status</span>
                    <span className="text-monitor-success font-medium">Online</span>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="Data Collection Summary" description="Statistics for the current month">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Measurements</p>
                    <p className="text-2xl font-bold text-monitor-primary">246,892</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Data Points Today</p>
                    <p className="text-2xl font-bold text-monitor-primary">8,744</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Triggered Alerts</p>
                    <p className="text-2xl font-bold text-monitor-warning">12</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Critical Events</p>
                    <p className="text-2xl font-bold text-monitor-critical">3</p>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Monitoring;
