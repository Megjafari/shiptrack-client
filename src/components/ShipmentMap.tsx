import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const cityCoords: Record<string, [number, number]> = {
  'Stockholm': [59.3293, 18.0686],
  'Göteborg': [57.7089, 11.9746],
  'Malmö': [55.6050, 13.0038],
  'Uppsala': [59.8586, 17.6389],
  'Linköping': [58.4108, 15.6214],
  'Norrköping': [58.5877, 16.1924],
  'Helsingborg': [56.0465, 12.6945],
  'Örebro': [59.2741, 15.2066],
  'Västerås': [59.6099, 16.5448],
  'Umeå': [63.8258, 20.2630],
  'Sundsvall': [62.3908, 17.3069],
  'Luleå': [65.5848, 22.1567],
  'Gävle': [60.6749, 17.1413],
  'Borås': [57.7210, 12.9401],
  'Eskilstuna': [59.3666, 16.5077],
  'Jönköping': [57.7826, 14.1618],
  'Halmstad': [56.6745, 12.8578],
  'Växjö': [56.8777, 14.8091],
  'Karlstad': [59.4022, 13.5115],
  'Mölndal': [57.6554, 12.0140],
  'Nacka': [59.3109, 18.1589],
  'Sandviken': [60.6167, 16.7667],
  'Älmhult': [56.5500, 14.1333],
  'Mölnlycke': [57.6589, 12.1161],
  'Lund': [55.7047, 13.1910],
  'Solna': [59.3600, 18.0010],
};

const createDotIcon = (color: string) => L.divIcon({
  className: '',
  html: `<div style="
    width: 14px;
    height: 14px;
    background: ${color};
    border-radius: 50%;
    border: 2px solid #0a0c0f;
    box-shadow: 0 0 8px ${color};
  "></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const statusColor: Record<string, string> = {
  transit: '#448aff',
  delivered: '#00e676',
  delayed: '#ff5252',
  pending: '#ffd740',
};

// Auto-fit bounds component
function FitBounds({ from, to }: { from: [number, number]; to: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds([from, to]);
    map.fitBounds(bounds, { padding: [60, 60] });
  }, [map, from, to]);
  return null;
}

interface ShipmentMapProps {
  senderCity: string;
  recipientCity: string;
  status: string;
}

export default function ShipmentMap({ senderCity, recipientCity, status }: ShipmentMapProps) {
  const from = cityCoords[senderCity];
  const to = cityCoords[recipientCity];

  if (!from || !to) return null;

  const center: [number, number] = [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
  ];

  const color = statusColor[status] || '#00d4ff';

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      padding: '24px',
    }}>
      <div style={{
        fontFamily: 'IBM Plex Mono',
        fontSize: '10px',
        letterSpacing: '2px',
        color: 'var(--text3)',
        textTransform: 'uppercase',
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--border)'
      }}>
        Route Map
      </div>

      <MapContainer
        center={center}
        zoom={5}
        style={{ height: '300px', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <FitBounds from={from} to={to} />
        <Marker position={from} icon={createDotIcon('#00d4ff')}>
          <Popup>{senderCity}</Popup>
        </Marker>
        <Marker position={to} icon={createDotIcon(color)}>
          <Popup>{recipientCity}</Popup>
        </Marker>
        <Polyline
          positions={[from, to]}
          pathOptions={{ color, weight: 2, dashArray: '6 6', opacity: 0.8 }}
        />
      </MapContainer>

      <div style={{ display: 'flex', gap: '24px', marginTop: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }} />
          <span style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'var(--text3)' }}>{senderCity}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
          <span style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'var(--text3)' }}>{recipientCity}</span>
        </div>
      </div>
    </div>
  );
}