import { rtdb } from '@/lib/firebase';
import { ref, push, set } from 'firebase/database';

export const createRideRequest = async (rideData: any) => {
  const ridesRef = ref(rtdb, 'rides');
  const newRideRef = push(ridesRef);
  return set(newRideRef, { ...rideData, id: newRideRef.key });
};

