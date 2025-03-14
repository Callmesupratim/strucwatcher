
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/Header';
import AppSidebar from '@/components/Sidebar';
import DashboardCard from '@/components/DashboardCard';
import StatusIndicator from '@/components/StatusIndicator';
import SensorChart from '@/components/SensorChart';
import { Progress } from '@/components/ui/progress';
import { Building, ThermometerSun, Waves, Expand, Settings, HelpCircle } from 'lucide-react';

// Sample data for demonstration
const sensorData = [
  { timestamp: '08:00', temperature: 25.2, vibration: 0.05, strain: 4.2 },
  { timestamp: '09:00', temperature: 26.1, vibration: 0.07, strain: 4.3 },
  { timestamp: '10:00', temperature: 27.3, vibration: 0.06, strain: 4.4 },
  { timestamp: '11:00', temperature: 28.0, vibration: 0.12, strain: 4.8 },
  { timestamp: '12:00', temperature: 28.5, vibration: 0.14, strain: 5.1 },
  { timestamp: '13:00', temperature: 28.7, vibration: 0.09, strain: 5.0 },
  { timestamp: '14:00', temperature: 28.3, vibration: 0.11, strain: 4.9 },
  { timestamp: '15:00', temperature: 27.9, vibration: 0.08, strain: 4.7 },
  { timestamp: '16:00', temperature: 27.4, vibration: 0.06, strain: 4.5 },
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-monitor-background">
        <AppSidebar />
        <div className="flex-1">
          <Header title="Dashboard" />
          <main className="p-4 md:p-6">
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-4">System Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatusIndicator 
                  status="normal" 
                  label="Bridge Structural Integrity" 
                  value="94%" 
                />
                <StatusIndicator 
                  status="warning" 
                  label="Vibration Levels" 
                  value="0.14 g" 
                />
                <StatusIndicator 
                  status="normal" 
                  label="Temperature" 
                  value="28.7°C" 
                />
                <StatusIndicator 
                  status="critical" 
                  label="Strain Sensors" 
                  value="5.1 kN" 
                  animate 
                />
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Sensor Readings</h2>
              <div className="mb-6">
                <SensorChart 
                  title="Key Sensor Metrics (Last 8 Hours)" 
                  data={sensorData}
                  dataKeys={[
                    { key: 'temperature', name: 'Temperature (°C)', color: '#8B5CF6' },
                    { key: 'vibration', name: 'Vibration (g)', color: '#F97316' },
                    { key: 'strain', name: 'Strain (kN)', color: '#EA384C' }
                  ]}
                  height={350}
                />
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4">Monitoring Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DashboardCard title="Structural Load" description="Current load distribution">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-monitor-primary mr-2" />
                      <span>South Pillar</span>
                    </div>
                    <span className="font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2 mb-4" />
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-monitor-primary mr-2" />
                      <span>North Pillar</span>
                    </div>
                    <span className="font-medium">64%</span>
                  </div>
                  <Progress value={64} className="h-2 mb-4" />
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-monitor-primary mr-2" />
                      <span>Central Support</span>
                    </div>
                    <span className="font-medium">51%</span>
                  </div>
                  <Progress value={51} className="h-2" />
                </DashboardCard>

                <DashboardCard title="Environment" description="Environmental conditions">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ThermometerSun className="h-5 w-5 text-monitor-warning mr-2" />
                        <span>Temperature</span>
                      </div>
                      <span className="font-medium">28.7°C</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Waves className="h-5 w-5 text-monitor-info mr-2" />
                        <span>Humidity</span>
                      </div>
                      <span className="font-medium">62%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Waves className="h-5 w-5 text-monitor-info mr-2" />
                        <span>Wind Speed</span>
                      </div>
                      <span className="font-medium">12 km/h</span>
                    </div>
                  </div>
                </DashboardCard>

                <DashboardCard title="Deformation" description="Structural shifts">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Expand className="h-5 w-5 text-monitor-primary mr-2" />
                        <span>Lateral Movement</span>
                      </div>
                      <span className="font-medium">3.2 mm</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Expand className="h-5 w-5 text-monitor-primary mr-2" />
                        <span>Vertical Deflection</span>
                      </div>
                      <span className="font-medium">5.7 mm</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Expand className="h-5 w-5 text-monitor-primary mr-2" />
                        <span>Torsional Rotation</span>
                      </div>
                      <span className="font-medium">0.08°</span>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
