"use client";
import React, { useState, useEffect } from 'react';
import { db, rtdb } from '@/lib/firebase';
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
          activeDrivers: 12, // လောလောဆယ် Sample အနေနဲ့ ထည့်ထားတာပါ
          pendingRides: allRides.filter((r: any) => r.status === 'pending').length
        });
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Admin Panel</h1>
        <p className="text-gray-500">YNS Taxi တစ်ခုလုံး၏ အခြေအနေကို စောင့်ကြည့်ရန်</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <TrendingUp className="text-blue-600 w-6 h-6" />
          </div>
          <p className="text-gray-500 text-sm font-bold">Total Rides</p>
          <h2 className="text-3xl font-black">{stats.totalRides}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
            <Car className="text-green-600 w-6 h-6" />
          </div>
          <p className="text-gray-500 text-sm font-bold">Active Drivers</p>
          <h2 className="text-3xl font-black">{stats.activeDrivers}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
            <Clock className="text-orange-600 w-6 h-6" />
          </div>
          <p className="text-gray-500 text-sm font-bold">Pending Requests</p>
          <h2 className="text-3xl font-black">{stats.pendingRides}</h2>
        </div>
      </div>

      {/* အနာဂတ်တွင် မြေပုံ သို့မဟုတ် အော်ဒါဇယားများ ထပ်ထည့်ရန် နေရာ */}
      <div className="bg-black text-white p-10 rounded-[40px] flex items-center justify-between overflow-hidden relative">
        <div className="z-10">
          <h2 className="text-2xl font-bold mb-2">Live Tracking Map</h2>
          <p className="text-gray-400 max-w-xs">ယာဉ်မောင်းအားလုံး၏ တည်နေရာကို မြေပုံပေါ်တွင် တိုက်ရိုက်ကြည့်ရှုပါ။</p>
          <button className="mt-6 bg-white text-black px-6 py-3 rounded-2xl font-bold text-sm">Open Map</button>
        </div>
        <MapIcon className="w-40 h-40 absolute -right-10 text-gray-800 opacity-50 rotate-12" />
      </div>
    </div>
  );
}

