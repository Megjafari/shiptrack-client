import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ShipmentDetail from './pages/ShipmentDetail';
import CreateShipment from './pages/CreateShipment';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shipment/:id" element={<ShipmentDetail />} />
          <Route path="/create" element={<CreateShipment />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;