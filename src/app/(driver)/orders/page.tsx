"use client";
import React, { useState, useEffect } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, onValue, update } from 'firebase/database';
import { MapPin, Check, X, Navigation2 } from 'lucide-react';

export default function DriverOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Database ထဲက အော်ဒါအသစ် (Pending) တွေကို စောင့်ကြည့်မယ်
    const ordersRef = ref(rtdb, 'rides');
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      const pendingOrders = [];
      for (let id in data) {
        if (data[id].status === 'pending') {
          pendingOrders.push({ id, ...data[id] });
        }
      }
      setOrders(pendingOrders);
    });
  }, []);

  const acceptOrder = (orderId: string) => {
    // အော်ဒါလက်ခံလိုက်ရင် status ကို 'accepted' ပြောင်းမယ်
    update(ref(rtdb, `rides/${orderId}`), {
      status: 'accepted',
      driverId: 'DRIVER_123' // လက်ရှိမှာ ယာယီ ID ပေးထားပါမယ်
    });
    alert("အော်ဒါလက်ခံလိုက်ပါပြီ။ ခရီးသည်ဆီသို့ သွားပါတော့။");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-extrabold mb-6">New Requests</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Navigation2 className="w-12 h-12 mx-auto mb-4 animate-bounce" />
          <p>အော်ဒါအသစ်များ စောင့်နေပါသည်...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full uppercase">Pending Request</span>
                  <h3 className="text-lg font-bold mt-2 text-gray-800">{order.customerName || 'Unknown User'}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-green-600">{order.fare || 0} Ks</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Navigation2 className="w-4 h-4 text-blue-500" />
                  <span>{order.pickup?.address || 'Pickup Point'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>{order.destination?.address || 'Destination Point'}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-gray-100 text-gray-600 p-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                  <X className="w-5 h-5" /> Ignore
                </button>
                <button 
                  onClick={() => acceptOrder(order.id)}
                  className="flex-1 bg-black text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Check className="w-5 h-5 text-green-400" /> Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

