export interface TrackingEvent {
  event: string;
  time: string;
  done: boolean;
  active: boolean;
}

export interface Shipment {
  id: string;
  senderName: string;
  senderCity: string;
  recipientName: string;
  recipientCity: string;
  carrier: string;
  status: 'transit' | 'delivered' | 'delayed' | 'pending';
  eta: string;
  history: TrackingEvent[];
}

export interface CreateShipmentRequest {
  senderName: string;
  senderCity: string;
  recipientName: string;
  recipientCity: string;
  carrier: string;
  eta: string;
}