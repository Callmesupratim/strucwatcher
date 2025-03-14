
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataPoint {
  timestamp: string;
  [key: string]: number | string;
}

interface SensorChartProps {
  title: string;
  data: DataPoint[];
  dataKeys: { key: string; name: string; color: string }[];
  yAxisLabel?: string;
  height?: number;
}

const SensorChart: React.FC<SensorChartProps> = ({
  title,
  data,
  dataKeys,
  yAxisLabel,
  height = 300
}) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fontSize: 12 }} 
                tickMargin={10}
                className="text-xs"
              />
              <YAxis 
                label={yAxisLabel ? { 
                  value: yAxisLabel, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                } : undefined}
                tick={{ fontSize: 12 }}
                className="text-xs"
              />
              <Tooltip />
              <Legend />
              {dataKeys.map((entry) => (
                <Line
                  key={entry.key}
                  type="monotone"
                  dataKey={entry.key}
                  name={entry.name}
                  stroke={entry.color}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorChart;
