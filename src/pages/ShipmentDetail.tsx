import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Shipment } from '../types/shipment';
import { getShipmentById } from '../services/shipmentService';

export default function ShipmentDetail() {
  const { id } = useParams<{ id: string }>();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getShipmentById(id).then(setShipment);
  }, [id]);

  if (!shipment) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => navigate('/')}>← Back</button>

      <h1>{shipment.id}</h1>
      <p>Status: {shipment.status}</p>
      <p>From: {shipment.senderName}, {shipment.senderCity}</p>
      <p>To: {shipment.recipientName}, {shipment.recipientCity}</p>
      <p>Carrier: {shipment.carrier}</p>
      <p>ETA: {shipment.eta}</p>

      <h2>Tracking History</h2>
      <ul>
        {shipment.history.map((h, i) => (
          <li key={i}>
            {h.done ? '✅' : h.active ? '🔵' : '⬜'} {h.event} {h.time && `– ${h.time}`}
          </li>
        ))}
      </ul>
    </div>
  );
}