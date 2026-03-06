import ShipmentChart from '../components/ShipmentChart';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    getShipments(filter, search).then(setShipments);
  }, [filter, search]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = shipments.length;
  const transit = shipments.filter(s => s.status === 'transit').length;
  const delivered = shipments.filter(s => s.status === 'delivered').length;
  const delayed = shipments.filter(s => s.status === 'delayed').length;

  return (
    <div>
      {/* TOPBAR – desktop only */}
      {!isMobile && (
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
      )}

      <div style={{ padding: isMobile ? '16px' : '32px' }}>

        {/* NEW SHIPMENT button – mobile */}
        {isMobile && (
          <button
            onClick={() => navigate('/create')}
            style={{
              background: 'var(--accent)',
              color: '#000',
              border: 'none',
              padding: '10px 16px',
              fontFamily: 'IBM Plex Mono',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.5px',
              width: '100%',
              marginBottom: '16px'
            }}>
            + NEW SHIPMENT
          </button>
        )}

        {/* STATS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '10px' : '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'TOTAL SHIPMENTS', value: total, color: 'var(--accent)' },
            { label: 'IN TRANSIT', value: transit, color: 'var(--blue)' },
            { label: 'DELIVERED', value: delivered, color: 'var(--green)' },
            { label: 'DELAYED', value: delayed, color: 'var(--red)' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: isMobile ? '14px' : '20px',
            }}>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', letterSpacing: '2px', color: 'var(--text3)', marginBottom: '8px' }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: isMobile ? '28px' : '36px', fontWeight: 600, color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* CHART */}
        <ShipmentChart />

        {/* CONTROLS */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '12px',
          marginBottom: '20px',
          alignItems: isMobile ? 'stretch' : 'center'
        }}>
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
              width: isMobile ? '100%' : '300px'
            }}
          />
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '8px 12px',
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
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '0' : '600px' }}>
            <thead>
              <tr>
                {(isMobile
                  ? ['Tracking ID', 'From', 'To', 'Status']
                  : ['Tracking ID', 'From', 'To', 'Carrier', 'Status', 'ETA']
                ).map(h => (
                  <th key={h} style={{
                    textAlign: 'left',
                    padding: isMobile ? '10px 12px' : '12px 20px',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: '10px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--text3)',
                    borderBottom: '1px solid var(--border)',
                    background: 'var(--surface2)',
                    whiteSpace: 'nowrap'
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
                  <td style={{ padding: isMobile ? '12px' : '14px 20px', fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{s.id}</td>
                  <td style={{ padding: isMobile ? '12px' : '14px 20px', fontSize: '13px', whiteSpace: 'nowrap' }}>{s.senderCity}</td>
                  <td style={{ padding: isMobile ? '12px' : '14px 20px', fontSize: '13px', whiteSpace: 'nowrap' }}>{s.recipientCity}</td>
                  {!isMobile && <td style={{ padding: '14px 20px', color: 'var(--text2)' }}>{s.carrier}</td>}
                  <td style={{ padding: isMobile ? '12px' : '14px 20px' }}>
                    {isMobile ? (
                      <span style={{
                        display: 'inline-block',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: statusColors[s.status]?.color,
                        boxShadow: `0 0 6px ${statusColors[s.status]?.color}`
                      }} />
                    ) : (
                      <span style={{
                        background: statusColors[s.status]?.bg,
                        color: statusColors[s.status]?.color,
                        padding: '4px 8px',
                        fontFamily: 'IBM Plex Mono',
                        fontSize: '10px',
                        letterSpacing: '0.5px',
                        whiteSpace: 'nowrap'
                      }}>
                        {s.status.toUpperCase()}
                      </span>
                    )}
                  </td>
                  {!isMobile && <td style={{ padding: '14px 20px', fontFamily: 'IBM Plex Mono', fontSize: '12px', color: 'var(--text2)' }}>{s.eta}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}