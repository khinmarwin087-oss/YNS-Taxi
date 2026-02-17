"use client";
import React, { useState } from 'react';
import { MapPin, Navigation, Car } from 'lucide-react';

export default function UserHomePage() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  return (
    <div className="relative h-screen w-full bg-gray-100">
      {/* ၁။ မြေပုံပြမည့်နေရာ (ယာယီ Background အနေနဲ့ ထားထားပါမယ်) */}
      <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
        <p className="text-gray-400 font-semibold">Google Maps Will Load Here</p>
      </div>

      {/* ၂။ အပေါ်က Search Bar (ဘယ်ကနေ ဘယ်ကိုသွားမလဲ ရွေးရန်) */}
      <div className="absolute top-10 left-4 right-4 z-10">
        <div className="bg-white p-4 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <Navigation className="text-blue-500 w-5 h-5" />
            <input 
              className="bg-transparent w-full outline-none text-sm" 
              placeholder="ဘယ်ကနေ စထွက်မှာလဲ?"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <MapPin className="text-red-500 w-5 h-5" />
            <input 
              className="bg-transparent w-full outline-none text-sm" 
              placeholder="ဘယ်ကို သွားမှာလဲ?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ၃။ အောက်က ခလုတ် (ကားခေါ်ရန်) */}
      <div className="absolute bottom-10 left-4 right-4 z-10">
        <button 
          className="w-full bg-black text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform"
          onClick={() => alert("ကားရှာဖွေနေပါသည်...")}
        >
          <Car className="w-6 h-6" />
          ကားခေါ်မည် (Ride Now)
        </button>
      </div>
    </div>
  );
}

