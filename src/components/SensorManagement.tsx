
import React, { useState } from 'react';
import { useSensors } from '@/context/SensorContext';
import { Sensor } from '@/types/sensor';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import SensorTable from './sensors/SensorTable';
import AddSensorDialog from './sensors/AddSensorDialog';
import EditSensorDialog from './sensors/EditSensorDialog';

const SensorManagement: React.FC = () => {
  const { sensors, addSensor, updateSensor, removeSensor } = useSensors();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSensor, setEditingSensor] = useState<Sensor | null>(null);

  const handleEditSensor = (sensor: Sensor) => {
    setEditingSensor(sensor);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    removeSensor(id);
    toast.success('Sensor removed successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Sensor Management</h2>
        <AddSensorDialog onAddSensor={addSensor} />
      </div>

      <Card>
        <CardContent className="p-0">
          <SensorTable
            sensors={sensors}
            onEdit={handleEditSensor}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <EditSensorDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        sensor={editingSensor}
        onUpdate={updateSensor}
      />
    </div>
  );
};

export default SensorManagement;
