import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CreateShipmentRequest } from '../types/shipment';
import { createShipment } from '../services/shipmentService';

const carriers = ['PostNord', 'DHL', 'Bring', 'Budbee'];

export default function CreateShipment() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateShipmentRequest>({
    senderName: '',
    senderCity: '',
    recipientName: '',
    recipientCity: '',
    carrier: 'PostNord',
    eta: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    await createShipment(form);
    navigate('/');
  };

  const inputStyle = {
    background: 'var(--surface2)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    padding: '9px 12px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
  };

  const labelStyle = {
    fontFamily: 'IBM Plex Mono',
    fontSize: '10px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    color: 'var(--text3)',
    marginBottom: '6px',
    display: 'block',
  };

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
          SHIPTRACK / <span style={{ color: 'var(--text)', cursor: 'pointer' }} onClick={() => navigate('/')}>OVERVIEW</span> / <span style={{ color: 'var(--accent)' }}>NEW SHIPMENT</span>
        </div>
        <button onClick={() => navigate('/')} style={{
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

      <div style={{ padding: '32px', maxWidth: '600px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '24px' }}>
          <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', letterSpacing: '2px', color: 'var(--text3)', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--border)', textTransform: 'uppercase' }}>
            New Shipment
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Sender Name</label>
              <input style={inputStyle} name="senderName" value={form.senderName} onChange={handleChange} placeholder="Företag AB" />
            </div>
            <div>
              <label style={labelStyle}>Sender City</label>
              <input style={inputStyle} name="senderCity" value={form.senderCity} onChange={handleChange} placeholder="Stockholm" />
            </div>
            <div>
              <label style={labelStyle}>Recipient Name</label>
              <input style={inputStyle} name="recipientName" value={form.recipientName} onChange={handleChange} placeholder="Kund AB" />
            </div>
            <div>
              <label style={labelStyle}>Recipient City</label>
              <input style={inputStyle} name="recipientCity" value={form.recipientCity} onChange={handleChange} placeholder="Göteborg" />
            </div>
            <div>
              <label style={labelStyle}>Carrier</label>
              <select style={inputStyle} name="carrier" value={form.carrier} onChange={handleChange}>
                {carriers.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>ETA</label>
              <input style={inputStyle} name="eta" type="date" value={form.eta} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button onClick={() => navigate('/')} style={{
              background: 'none',
              border: '1px solid var(--border2)',
              color: 'var(--text2)',
              padding: '8px 16px',
              fontFamily: 'IBM Plex Mono',
              fontSize: '12px',
              cursor: 'pointer',
            }}>
              CANCEL
            </button>
            <button onClick={handleSubmit} style={{
              background: 'var(--accent)',
              color: '#000',
              border: 'none',
              padding: '8px 16px',
              fontFamily: 'IBM Plex Mono',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}>
              CREATE SHIPMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}