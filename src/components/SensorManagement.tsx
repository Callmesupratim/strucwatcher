
import React, { useState } from 'react';
import { useSensors } from '@/context/SensorContext';
import { Sensor, SensorType, sensorTypeOptions } from '@/types/sensor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import {
  Plus,
  Trash2,
  Edit,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { format } from 'date-fns';
import StatusIndicator from '@/components/StatusIndicator';

const SensorManagement: React.FC = () => {
  const { sensors, addSensor, updateSensor, removeSensor } = useSensors();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [newSensor, setNewSensor] = useState<Omit<Sensor, 'id'>>({
    name: '',
    type: 'temperature',
    location: '',
    status: 'active',
  });

  const [editingSensor, setEditingSensor] = useState<Sensor | null>(null);

  const handleAddSensor = () => {
    if (!newSensor.name || !newSensor.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    addSensor(newSensor);
    toast.success(`Sensor "${newSensor.name}" added successfully`);
    setNewSensor({
      name: '',
      type: 'temperature',
      location: '',
      status: 'active',
    });
    setIsAddDialogOpen(false);
  };

  const handleEditSensor = () => {
    if (!editingSensor) return;
    
    updateSensor(editingSensor.id, editingSensor);
    toast.success(`Sensor "${editingSensor.name}" updated successfully`);
    setIsEditDialogOpen(false);
    setEditingSensor(null);
  };

  const handleDelete = (id: string) => {
    removeSensor(id);
    toast.success('Sensor removed successfully');
    setDeleteId(null);
  };

  const openEditDialog = (sensor: Sensor) => {
    setEditingSensor({ ...sensor });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Sensor Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name*
                </Label>
                <Input
                  id="name"
                  value={newSensor.name}
                  onChange={(e) => setNewSensor({ ...newSensor, name: e.target.value })}
                  className="col-span-3"
                  placeholder="Bridge Temperature Sensor 1"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type*
                </Label>
                <Select
                  value={newSensor.type}
                  onValueChange={(value) => setNewSensor({ ...newSensor, type: value as SensorType })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select sensor type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sensorTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location*
                </Label>
                <Input
                  id="location"
                  value={newSensor.location}
                  onChange={(e) => setNewSensor({ ...newSensor, location: e.target.value })}
                  className="col-span-3"
                  placeholder="North Bridge Connection"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newSensor.status}
                  onValueChange={(value) => 
                    setNewSensor({ 
                      ...newSensor, 
                      status: value as 'active' | 'inactive' | 'maintenance' 
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSensor}>Add Sensor</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
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
                        onClick={() => openEditDialog(sensor)}
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
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Sensor</DialogTitle>
            <DialogDescription>
              Update the details of the sensor.
            </DialogDescription>
          </DialogHeader>
          {editingSensor && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name*
                </Label>
                <Input
                  id="edit-name"
                  value={editingSensor.name}
                  onChange={(e) => setEditingSensor({ ...editingSensor, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type*
                </Label>
                <Select
                  value={editingSensor.type}
                  onValueChange={(value) => setEditingSensor({ ...editingSensor, type: value as SensorType })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sensorTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">
                  Location*
                </Label>
                <Input
                  id="edit-location"
                  value={editingSensor.location}
                  onChange={(e) => setEditingSensor({ ...editingSensor, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editingSensor.status}
                  onValueChange={(value) => 
                    setEditingSensor({ 
                      ...editingSensor, 
                      status: value as 'active' | 'inactive' | 'maintenance' 
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSensor}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SensorManagement;
