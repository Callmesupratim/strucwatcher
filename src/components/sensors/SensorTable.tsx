
import React from 'react';
import { Sensor, sensorTypeOptions } from '@/types/sensor';
import { format } from 'date-fns';
import StatusIndicator from '@/components/StatusIndicator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface SensorTableProps {
  sensors: Sensor[];
  onEdit: (sensor: Sensor) => void;
  onDelete: (id: string) => void;
}

const SensorTable: React.FC<SensorTableProps> = ({ sensors, onEdit, onDelete }) => {
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const handleDelete = (id: string) => {
    onDelete(id);
    setDeleteId(null);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sensors.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              No sensors found. Add a sensor to get started.
            </TableCell>
          </TableRow>
        ) : (
          sensors.map((sensor) => (
            <TableRow key={sensor.id}>
              <TableCell className="font-medium">{sensor.name}</TableCell>
              <TableCell>
                {sensorTypeOptions.find(opt => opt.value === sensor.type)?.label || sensor.type}
              </TableCell>
              <TableCell>{sensor.location}</TableCell>
              <TableCell>
                <StatusIndicator status={sensor.status} />
              </TableCell>
              <TableCell>
                {sensor.lastUpdate 
                  ? format(new Date(sensor.lastUpdate), 'MMM d, yyyy HH:mm') 
                  : '-'}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(sensor)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog open={deleteId === sensor.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteId(sensor.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the sensor "{sensor.name}" and remove all associated data.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(sensor.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default SensorTable;
