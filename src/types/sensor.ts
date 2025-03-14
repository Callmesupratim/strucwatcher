
export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  location: string;
  status: SensorStatus;
  lastReading?: string;
  lastUpdate?: string;
}

export type SensorStatus = 'active' | 'inactive' | 'maintenance';
export type SensorType = 'temperature' | 'humidity' | 'pressure' | 'vibration' | 'strain' | 'displacement';

export const sensorTypeOptions: { label: string; value: SensorType }[] = [
  { label: 'Temperature', value: 'temperature' },
  { label: 'Humidity', value: 'humidity' },
  { label: 'Pressure', value: 'pressure' },
  { label: 'Vibration', value: 'vibration' },
  { label: 'Strain', value: 'strain' },
  { label: 'Displacement', value: 'displacement' },
];
