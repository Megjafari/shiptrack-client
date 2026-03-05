import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Shipment } from '../types/shipment';
import { getShipments } from '../services/shipmentService';

export default function Dashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getShipments(filter, search).then(setShipments);
  }, [filter, search]);

  return (
    <div>
      <h1>ShipTrack</h1>

      <input
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div>
        {['', 'transit', 'delivered', 'delayed', 'pending'].map(f => (
          <button key={f} onClick={() => setFilter(f)}>
            {f || 'All'}
          </button>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>From</th>
            <th>To</th>
            <th>Carrier</th>
            <th>Status</th>
            <th>ETA</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map(s => (
            <tr key={s.id} onClick={() => navigate(`/shipment/${s.id}`)} style={{ cursor: 'pointer' }}>
              <td>{s.id}</td>
              <td>{s.senderCity}</td>
              <td>{s.recipientCity}</td>
              <td>{s.carrier}</td>
              <td>{s.status}</td>
              <td>{s.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}