"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { rtdb } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import { Users, Car, Map as MapIcon, TrendingUp, Clock, Bell, ChevronRight } from 'lucide-react';

// Map ကို SSR ပိတ်ပြီး ပိုလှတဲ့ Loading နဲ့ ခေါ်ယူခြင်း
const MapComponent = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => (
    <div className="h-[350px] w-full bg-slate-100 animate-pulse rounded-[2.5rem] flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-200">
      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
         <MapIcon className="text-slate-400 animate-bounce" />
      </div>
      <p className="text-slate-400 font-medium text-sm">Initializing Premium Map...</p>
    </div>
  )
});

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRides: 0,
    activeDrivers: 0,
    pendingRides: 0
  });

  useEffect(() => {
    const ridesRef = ref(rtdb, 'rides');
    onValue(ridesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allRides = Object.values(data);
        setStats({
          totalRides: allRides.length,
          activeDrivers: 12,
          pendingRides: allRides.filter((r: any) => r.status === 'pending').length
        });
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10">
      {/* Header Section */}
      <div className="bg-white px-6 pt-8 pb-12 rounded-b-[3rem] shadow-sm border-b border-slate-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-[900] text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 text-sm font-medium mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              YNS Taxi Premium System
            </p>
          </div>
          <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
            <Bell size={24} />
          </button>
        </div>

        {/* Highlight Card */}
        <div className="bg-slate-900 p-6 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-slate-200">
          <div className="relative z-10 flex flex-col gap-4">
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                   <TrendingUp className="text-white w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Live Performance</p>
                  <h2 className="text-white text-2xl font-black">{stats.totalRides} Total Rides</h2>
                </div>
             </div>
             <button className="bg-white text-slate-900 w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
                Monthly Reports <ChevronRight size={16} />
             </button>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Stats Grid - Premium Compact Style */}
      <div className="px-6 -mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-3">
              <Car className="text-indigo-600 w-5 h-5" />
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Active Fleet</p>
            <h2 className="text-2xl font-black text-slate-900">{stats.activeDrivers}</h2>
          </div>

          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center mb-3">
              <Clock className="text-rose-600 w-5 h-5" />
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Pending</p>
            <h2 className="text-2xl font-black text-slate-900">{stats.pendingRides}</h2>
          </div>
        </div>
      </div>

      {/* Map Section - The Main Focus */}
      <div className="px-6 mt-8">
        <div className="bg-white p-2 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-white">
          <div className="px-6 py-4 flex justify-between items-center">
             <h3 className="font-black text-slate-900 flex items-center gap-2">
                <MapIcon size={18} className="text-indigo-600" /> Live Tracking
             </h3>
             <span className="bg-indigo-50 text-indigo-600 text-[10px] px-3 py-1 rounded-full font-bold">Realtime</span>
          </div>
          <div className="overflow-hidden rounded-[2.5rem]">
             <MapComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
