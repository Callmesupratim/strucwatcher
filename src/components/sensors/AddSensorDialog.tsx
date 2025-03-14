
import React, { useState } from 'react';
import { Sensor } from '@/types/sensor';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import SensorFormFields from './SensorFormFields';

interface AddSensorDialogProps {
  onAddSensor: (sensor: Omit<Sensor, 'id'>) => void;
}

const AddSensorDialog: React.FC<AddSensorDialogProps> = ({ onAddSensor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSensor, setNewSensor] = useState<Omit<Sensor, 'id'>>({
    name: '',
    type: 'temperature',
    location: '',
    status: 'active',
  });

  const handleAddSensor = () => {
    if (!newSensor.name || !newSensor.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    onAddSensor(newSensor);
    toast.success(`Sensor "${newSensor.name}" added successfully`);
    
    // Reset form and close dialog
    setNewSensor({
      name: '',
      type: 'temperature',
      location: '',
      status: 'active',
    });
    setIsOpen(false);
  };

  const handleChange = (updates: Partial<Sensor>) => {
    setNewSensor({ ...newSensor, ...updates });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Sensor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Sensor</DialogTitle>
          <DialogDescription>
            Enter the details of the new sensor to add to the monitoring system.
          </DialogDescription>
        </DialogHeader>
        
        <SensorFormFields sensor={newSensor} onChange={handleChange} />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddSensor}>Add Sensor</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSensorDialog;
