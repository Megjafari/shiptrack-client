import { useNavigate } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* SIDEBAR */}
      <aside style={{
        width: '220px',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        position: 'fixed',
        height: '100vh'
      }}>
        <div style={{ padding: '0 20px 28px', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
          <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '18px', fontWeight: 600, color: 'var(--accent)' }}>
            ShipTrack
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>
            Logistics Platform
          </div>
        </div>

        <nav>
          {[{ label: 'Dashboard', path: '/' }, { label: 'Shipments', path: '/' }].map(item => (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                padding: '10px 20px',
                color: 'var(--text2)',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid var(--border)' }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--green)', borderRadius: '50', marginRight: '6px', boxShadow: '0 0 6px var(--green)' }}></span>
          <span style={{ fontSize: '11px', color: 'var(--text3)' }}>All systems operational</span>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ marginLeft: '220px', flex: 1 }}>
        {children}
      </main>
    </div>
  );
}