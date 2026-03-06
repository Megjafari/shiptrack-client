import type { Shipment, CreateShipmentRequest } from '../types/shipment';

const BASE_URL = 'http://localhost:5141/api/shipments';

export const getShipments = async (status?: string, search?: string): Promise<Shipment[]> => {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (search) params.append('search', search);

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  return res.json();
};

export const getShipmentById = async (id: string): Promise<Shipment> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const createShipment = async (data: CreateShipmentRequest): Promise<Shipment> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getStats = async (): Promise<{ date: string; count: number }[]> => {
  const res = await fetch(`${BASE_URL}/stats`);
  return res.json();
};