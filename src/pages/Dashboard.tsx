import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Shipment } from '../types/shipment';
import { getShipments } from '../services/shipmentService';

const filters = ['', 'transit', 'delivered', 'delayed', 'pending'];
const filterLabels: Record<string, string> = {
  '': 'ALL', transit: 'IN TRANSIT', delivered: 'DELIVERED', delayed: 'DELAYED', pending: 'PENDING'
};

const statusColors: Record<string, { bg: string; color: string }> = {
  transit: { bg: 'var(--blue-dim)', color: 'var(--blue)' },
  delivered: { bg: 'var(--green-dim)', color: 'var(--green)' },
  delayed: { bg: 'var(--red-dim)', color: 'var(--red)' },
  pending: { bg: 'var(--yellow-dim)', color: 'var(--yellow)' },
};

export default function Dashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getShipments(filter, search).then(setShipments);
  }, [filter, search]);

  const total = shipments.length;
  const transit = shipments.filter(s => s.status === 'transit').length;
  const delivered = shipments.filter(s => s.status === 'delivered').length;
  const delayed = shipments.filter(s => s.status === 'delayed').length;

  return (
    <div>
      {/* TOPBAR */}
      <div style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px', color: 'var(--text2)', letterSpacing: '1px' }}>
          SHIPTRACK / <span style={{ color: 'var(--text)' }}>OVERVIEW</span>
        </div>
        <button
          onClick={() => navigate('/create')}
          style={{
            background: 'var(--accent)',
            color: '#000',
            border: 'none',
            padding: '8px 16px',
            fontFamily: 'IBM Plex Mono',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.5px'
          }}>
          + NEW SHIPMENT
        </button>
      </div>

      <div style={{ padding: '32px' }}>
        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'TOTAL SHIPMENTS', value: total, color: 'var(--accent)' },
            { label: 'IN TRANSIT', value: transit, color: 'var(--blue)' },
            { label: 'DELIVERED', value: delivered, color: 'var(--green)' },
            { label: 'DELAYED', value: delayed, color: 'var(--red)' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: '20px',
            }}>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', letterSpacing: '2px', color: 'var(--text3)', marginBottom: '12px' }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '36px', fontWeight: 600, color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* CONTROLS */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
          <input
            placeholder="Search tracking ID or city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              padding: '9px 12px',
              fontFamily: 'IBM Plex Mono',
              fontSize: '12px',
              outline: 'none',
              width: '300px'
            }}
          />
          <div style={{ display: 'flex', gap: '4px' }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '8px 14px',
                  background: filter === f ? 'var(--accent-dim)' : 'var(--surface)',
                  border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`,
                  color: filter === f ? 'var(--accent)' : 'var(--text2)',
                  fontFamily: 'IBM Plex Mono',
                  fontSize: '11px',
                  cursor: 'pointer',
                  letterSpacing: '0.5px'
                }}>
                {filterLabels[f]}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Tracking ID', 'From', 'To', 'Carrier', 'Status', 'ETA'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left',
                    padding: '12px 20px',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: '10px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--text3)',
                    borderBottom: '1px solid var(--border)',
                    background: 'var(--surface2)'
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shipments.map(s => (
                <tr
                  key={s.id}
                  onClick={() => navigate(`/shipment/${s.id}`)}
                  style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 20px', fontFamily: 'IBM Plex Mono', fontSize: '12px', color: 'var(--accent)' }}>{s.id}</td>
                  <td style={{ padding: '14px 20px' }}>{s.senderCity}</td>
                  <td style={{ padding: '14px 20px' }}>{s.recipientCity}</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text2)' }}>{s.carrier}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      background: statusColors[s.status]?.bg,
                      color: statusColors[s.status]?.color,
                      padding: '4px 10px',
                      fontFamily: 'IBM Plex Mono',
                      fontSize: '10px',
                      letterSpacing: '0.5px'
                    }}>
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontFamily: 'IBM Plex Mono', fontSize: '12px', color: 'var(--text2)' }}>{s.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}