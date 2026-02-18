"use client";
import React, { useState, useEffect } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import { Users, Car, Map as MapIcon, TrendingUp, Clock } from 'lucide-react';

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
          activeDrivers: 12, // Sample data
          pendingRides: allRides.filter((r: any) => r.status === 'pending').length
        });
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Admin Panel</h1>
        <p className="text-xs text-gray-500">YNS Taxi အခြေအနေ စောင့်ကြည့်ရန်</p>
      </div>

      {/* Stats Grid - တစ်တန်း နှစ်ကွက်တွဲ ပုံစံ */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Total Rides */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-2">
            <TrendingUp className="text-blue-600 w-5 h-5" />
          </div>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Total Rides</p>
          <h2 className="text-xl font-black text-gray-900">{stats.totalRides}</h2>
        </div>

        {/* Active Drivers */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-2">
            <Car className="text-green-600 w-5 h-5" />
          </div>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Active Drivers</p>
          <h2 className="text-xl font-black text-gray-900">{stats.activeDrivers}</h2>
        </div>

        {/* Pending Requests - ဒီကောင်က အောက်တစ်တန်းမှာ တစ်ခုတည်း grid-span လုပ်လို့ရတယ် */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <Clock className="text-orange-600 w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Pending Requests</p>
              <h2 className="text-xl font-black text-gray-900">{stats.pendingRides}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section - ပိုသေးပြီး သေသပ်သော ဒီဇိုင်း */}
      <div className="bg-black text-white p-6 rounded-[30px] relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-lg font-bold mb-1">Live Tracking</h2>
          <p className="text-gray-400 text-xs max-w-[150px]">ယာဉ်မောင်းအားလုံးကို မြေပုံပေါ်တွင် ကြည့်မည်</p>
          <button className="mt-4 bg-white text-black px-5 py-2 rounded-xl font-black text-xs hover:bg-gray-200 transition-colors">
            Open Map
          </button>
        </div>
        <MapIcon className="w-24 h-24 absolute -right-4 -bottom-4 text-white opacity-10 rotate-12" />
      </div>
    </div>
  );
}
