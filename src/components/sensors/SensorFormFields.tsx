
import React from 'react';
import { Sensor, SensorType, sensorTypeOptions } from '@/types/sensor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SensorFormFieldsProps {
  sensor: Partial<Sensor>;
  onChange: (updates: Partial<Sensor>) => void;
}

const SensorFormFields: React.FC<SensorFormFieldsProps> = ({ sensor, onChange }) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name*
        </Label>
        <Input
          id="name"
          value={sensor.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}
          className="col-span-3"
          placeholder="Bridge Temperature Sensor 1"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type" className="text-right">
          Type*
        </Label>
        <Select
          value={sensor.type}
          onValueChange={(value) => onChange({ type: value as SensorType })}
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
          value={sensor.location || ''}
          onChange={(e) => onChange({ location: e.target.value })}
          className="col-span-3"
          placeholder="North Bridge Connection"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          Status
        </Label>
        <Select
          value={sensor.status}
          onValueChange={(value) => 
            onChange({ 
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
  );
};

export default SensorFormFields;
