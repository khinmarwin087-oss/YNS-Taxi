"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// ခရီးစဉ်တစ်ခုမှာ ပါဝင်မယ့် အချက်အလက်များကို သတ်မှတ်ခြင်း
interface RideContextType {
  pickupLocation: string;
  setPickupLocation: (loc: string) => void;
  destination: string;
  setDestination: (loc: string) => void;
  rideStatus: 'idle' | 'searching' | 'accepted' | 'started' | 'completed';
  setRideStatus: (status: 'idle' | 'searching' | 'accepted' | 'started' | 'completed') => void;
}

const RideContext = createContext<RideContextType | undefined>(undefined);

export function RideProvider({ children }: { children: ReactNode }) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [rideStatus, setRideStatus] = useState<'idle' | 'searching' | 'accepted' | 'started' | 'completed'>('idle');

  return (
    <RideContext.Provider value={{ 
      pickupLocation, setPickupLocation, 
      destination, setDestination, 
      rideStatus, setRideStatus 
    }}>
      {children}
    </RideContext.Provider>
  );
}

// ဒီ Context ကို တခြားနေရာမှာ လွယ်လွယ်သုံးလို့ရအောင် useRide ဆိုတဲ့ hook လေး လုပ်ထားမယ်
export function useRide() {
  const context = useContext(RideContext);
  if (context === undefined) {
    throw new Error('useRide must be used within a RideProvider');
  }
  return context;
}

