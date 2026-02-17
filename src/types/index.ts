export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'user' | 'driver' | 'admin';
}

export interface RideRequest {
  id: string;
  userId: string;
  pickup: { lat: number; lng: number; address: string };
  destination: { lat: number; lng: number; address: string };
  status: 'pending' | 'accepted' | 'ongoing' | 'completed' | 'cancelled';
  fare: number;
  driverId?: string;
}
