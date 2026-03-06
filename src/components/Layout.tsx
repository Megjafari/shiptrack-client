import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: 'Shipments', path: '/' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>

      {/* SIDEBAR – desktop only */}
      {!isMobile && (
        <aside style={{
          width: '220px',
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 0',
          position: 'fixed',
          height: '100vh',
          zIndex: 100,
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
            {navItems.map(item => (
              <div
                key={item.label}
                onClick={() => navigate(item.path)}
                style={{ padding: '10px 20px', color: 'var(--text2)', cursor: 'pointer', fontSize: '13px' }}
              >
                {item.label}
              </div>
            ))}
          </nav>
          <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid var(--border)' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--green)', borderRadius: '50%', marginRight: '6px', boxShadow: '0 0 6px var(--green)' }}></span>
            <span style={{ fontSize: '11px', color: 'var(--text3)' }}>All systems operational</span>
          </div>
        </aside>
      )}

      {/* MOBILE TOPBAR */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '56px',
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          zIndex: 300,
        }}>
          <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '16px', fontWeight: 600, color: 'var(--accent)' }}>
            ShipTrack
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
          >
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--text2)', borderRadius: '2px', transition: '0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--text2)', borderRadius: '2px', transition: '0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--text2)', borderRadius: '2px', transition: '0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      )}

      {/* MOBILE MENU */}
      {isMobile && menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200 }}
          />
          <div style={{
            position: 'fixed',
            top: '56px', left: 0, right: 0,
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            zIndex: 300,
            padding: '8px 0 16px',
          }}>
            {navItems.map(item => (
              <div
                key={item.label}
                onClick={() => { navigate(item.path); setMenuOpen(false); }}
                style={{ padding: '12px 20px', color: 'var(--text2)', cursor: 'pointer', fontSize: '14px' }}
              >
                {item.label}
              </div>
            ))}
            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', marginTop: '8px' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--green)', borderRadius: '50%', marginRight: '6px', boxShadow: '0 0 6px var(--green)' }}></span>
              <span style={{ fontSize: '11px', color: 'var(--text3)' }}>All systems operational</span>
            </div>
          </div>
        </>
      )}

      {/* MAIN */}
      <main style={{
        flex: 1,
        marginLeft: isMobile ? '0' : '220px',
        width: isMobile ? '100%' : 'calc(100% - 220px)',
        paddingTop: isMobile ? '56px' : '0',
        minWidth: 0,
      }}>
        {children}
      </main>

    </div>
  );
}