import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getStats } from '../services/shipmentService';

export default function ShipmentChart() {
  const [data, setData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    getStats().then(setData);
  }, []);

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      padding: '24px',
      marginBottom: '32px',
      minWidth: 0,
      overflow: 'hidden'
    }}>
      <div style={{
        fontFamily: 'IBM Plex Mono',
        fontSize: '10px',
        letterSpacing: '2px',
        color: 'var(--text3)',
        textTransform: 'uppercase',
        marginBottom: '24px'
      }}>
        Shipments per day – last 30 days
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontFamily: 'IBM Plex Mono', fontSize: 11, fill: 'var(--text3)' }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontFamily: 'IBM Plex Mono', fontSize: 11, fill: 'var(--text3)' }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--surface2)',
              border: '1px solid var(--border2)',
              fontFamily: 'IBM Plex Mono',
              fontSize: '12px',
              color: 'var(--text)'
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={{ fill: 'var(--accent)', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}