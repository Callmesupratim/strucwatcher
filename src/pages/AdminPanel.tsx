
import React from 'react';
import AppSidebar from '@/components/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import SensorManagement from '@/components/SensorManagement';

const AdminPanel: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <SensorManagement />
      </div>
    </div>
  );
};

export default AdminPanel;
