
import React from 'react';
import { Sensor } from '@/types/sensor';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import SensorFormFields from './SensorFormFields';

interface EditSensorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  sensor: Sensor | null;
  onUpdate: (id: string, sensor: Partial<Sensor>) => void;
}

const EditSensorDialog: React.FC<EditSensorDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  sensor, 
  onUpdate 
}) => {
  const [editingSensor, setEditingSensor] = React.useState<Sensor | null>(null);

  // Update local state when the sensor prop changes
  React.useEffect(() => {
    if (sensor) {
      setEditingSensor({ ...sensor });
    }
  }, [sensor]);

  const handleChange = (updates: Partial<Sensor>) => {
    if (editingSensor) {
      setEditingSensor({ ...editingSensor, ...updates });
    }
  };

  const handleUpdate = () => {
    if (!editingSensor) return;
    
    onUpdate(editingSensor.id, editingSensor);
    toast.success(`Sensor "${editingSensor.name}" updated successfully`);
    onOpenChange(false);
  };

  // If no sensor is being edited, don't render anything
  if (!editingSensor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Sensor</DialogTitle>
          <DialogDescription>
            Update the details of the sensor.
          </DialogDescription>
        </DialogHeader>
        
        <SensorFormFields sensor={editingSensor} onChange={handleChange} />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSensorDialog;
