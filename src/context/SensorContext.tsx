
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Sensor, SensorType } from '@/types/sensor';
import { v4 as uuidv4 } from 'uuid';

interface SensorContextType {
  sensors: Sensor[];
  addSensor: (sensor: Omit<Sensor, 'id'>) => void;
  updateSensor: (id: string, sensor: Partial<Sensor>) => void;
  removeSensor: (id: string) => void;
  getSensor: (id: string) => Sensor | undefined;
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

// Some initial mock sensors for demonstration
const initialSensors: Sensor[] = [
  {
    id: uuidv4(),
    name: 'Bridge Temperature Sensor 1',
    type: 'temperature',
    location: 'North Bridge Connection',
    status: 'active',
    lastReading: '23.5°C',
    lastUpdate: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Strain Gauge 2',
    type: 'strain',
    location: 'Support Column B',
    status: 'active',
    lastReading: '450 μS',
    lastUpdate: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Vibration Sensor 3',
    type: 'vibration',
    location: 'Central Span',
    status: 'maintenance',
    lastReading: '0.15g',
    lastUpdate: new Date().toISOString(),
  },
];

export const SensorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sensors, setSensors] = useState<Sensor[]>(() => {
    // Try to load sensors from localStorage
    const storedSensors = localStorage.getItem('sensors');
    return storedSensors ? JSON.parse(storedSensors) : initialSensors;
  });

  // Save sensors to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sensors', JSON.stringify(sensors));
  }, [sensors]);

  const addSensor = (sensor: Omit<Sensor, 'id'>) => {
    const newSensor: Sensor = {
      ...sensor,
      id: uuidv4(),
      lastUpdate: new Date().toISOString(),
    };
    setSensors([...sensors, newSensor]);
  };

  const updateSensor = (id: string, updatedSensor: Partial<Sensor>) => {
    setSensors(
      sensors.map((sensor) =>
        sensor.id === id
          ? { ...sensor, ...updatedSensor, lastUpdate: new Date().toISOString() }
          : sensor
      )
    );
  };

  const removeSensor = (id: string) => {
    setSensors(sensors.filter((sensor) => sensor.id !== id));
  };

  const getSensor = (id: string) => {
    return sensors.find((sensor) => sensor.id === id);
  };

  return (
    <SensorContext.Provider
      value={{
        sensors,
        addSensor,
        updateSensor,
        removeSensor,
        getSensor,
      }}
    >
      {children}
    </SensorContext.Provider>
  );
};

export const useSensors = () => {
  const context = useContext(SensorContext);
  if (context === undefined) {
    throw new Error('useSensors must be used within a SensorProvider');
  }
  return context;
};
