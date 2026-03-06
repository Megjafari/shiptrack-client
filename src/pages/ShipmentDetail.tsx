import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Shipment } from '../types/shipment';
import { getShipmentById } from '../services/shipmentService';

const statusColors: Record<string, { bg: string; color: string }> = {
  transit: { bg: 'var(--blue-dim)', color: 'var(--blue)' },
  delivered: { bg: 'var(--green-dim)', color: 'var(--green)' },
  delayed: { bg: 'var(--red-dim)', color: 'var(--red)' },
  pending: { bg: 'var(--yellow-dim)', color: 'var(--yellow)' },
};

export default function ShipmentDetail() {
  const { id } = useParams<{ id: string }>();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getShipmentById(id).then(setShipment);
  }, [id]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!shipment) return (
    <div style={{ padding: '32px', fontFamily: 'IBM Plex Mono', color: 'var(--text3)' }}>
      Loading...
    </div>
  );

  const status = statusColors[shipment.status];

  return (
    <div>
      {/* TOPBAR */}
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
            SHIPTRACK / <span style={{ color: 'var(--text)', cursor: 'pointer' }} onClick={() => navigate('/')}>OVERVIEW</span> / <span style={{ color: 'var(--accent)' }}>{shipment.id}</span>
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: '1px solid var(--border2)',
              color: 'var(--text2)',
              padding: '8px 16px',
              fontFamily: 'IBM Plex Mono',
              fontSize: '12px',
              cursor: 'pointer',
            }}>
            ← BACK
          </button>
        </div>
      )}

      <div style={{
        padding: isMobile ? '16px' : '32px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '16px'
      }}>
        {/* INFO CARD */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: isMobile ? '16px' : '24px' }}>
          <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', letterSpacing: '2px', color: 'var(--text3)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border)', textTransform: 'uppercase' }}>
            Shipment Info
          </div>

          <div style={{ fontFamily: 'IBM Plex Mono', fontSize: isMobile ? '16px' : '20px', fontWeight: 600, color: 'var(--accent)', marginBottom: '12px' }}>
            {shipment.id}
          </div>

          <span style={{
            background: status?.bg,
            color: status?.color,
            padding: '4px 10px',
            fontFamily: 'IBM Plex Mono',
            fontSize: '10px',
            letterSpacing: '0.5px',
            marginBottom: '24px',
            display: 'inline-block'
          }}>
            {shipment.status.toUpperCase()}
          </span>

          {[
            { label: 'From', value: `${shipment.senderName}, ${shipment.senderCity}` },
            { label: 'To', value: `${shipment.recipientName}, ${shipment.recipientCity}` },
            { label: 'Carrier', value: shipment.carrier },
            { label: 'ETA', value: shipment.eta },
          ].map(row => (
            <div key={row.label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '12px 0',
              borderBottom: '1px solid var(--border)',
              fontSize: '13px'
            }}>
              <span style={{ color: 'var(--text3)', flexShrink: 0, minWidth: '60px' }}>{row.label}</span>
              <span style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', textAlign: 'right' }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* TIMELINE CARD */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: isMobile ? '16px' : '24px' }}>
          <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', letterSpacing: '2px', color: 'var(--text3)', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--border)', textTransform: 'uppercase' }}>
            Tracking Timeline
          </div>

          <div style={{ position: 'relative', paddingLeft: '24px' }}>
            <div style={{
              position: 'absolute',
              left: '7px',
              top: '8px',
              bottom: '8px',
              width: '1px',
              background: 'var(--border2)'
            }} />

            {shipment.history.map((h, i) => (
              <div key={i} style={{ position: 'relative', paddingBottom: i < shipment.history.length - 1 ? '24px' : '0', paddingLeft: '16px' }}>
                <div style={{
                  position: 'absolute',
                  left: '-17px',
                  top: '4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: h.done ? 'var(--green)' : h.active ? 'var(--accent)' : 'var(--surface)',
                  border: `2px solid ${h.done ? 'var(--green)' : h.active ? 'var(--accent)' : 'var(--border2)'}`,
                  boxShadow: h.active ? '0 0 8px var(--accent)' : h.done ? '0 0 6px var(--green)' : 'none'
                }} />

                <div style={{
                  fontSize: '13px',
                  color: h.done || h.active ? 'var(--text)' : 'var(--text3)',
                  fontWeight: h.active ? 500 : 400
                }}>
                  {h.event}
                </div>
                {h.time && (
                  <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>
                    {h.time}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}