"use client";
import React from 'react';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { LogIn, Car } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        // Login အောင်မြင်ရင် Home Page ကို သွားမယ်
        alert("Login အောင်မြင်ပါသည်။");
        router.push('/home');
      }
    } catch (error) {
      console.error(error);
      alert("Login ဝင်ရာတွင် အမှားအယွင်းရှိခဲ့ပါသည်။");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* App Logo & Welcome Text */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Car className="text-white w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">YNS Taxi</h1>
        <p className="text-gray-500 mt-2 font-medium">မြန်မြန်ဆန်ဆန်နဲ့ စိတ်ချစွာ သွားလာပါ</p>
      </div>

      {/* Login Options */}
      <div className="w-full max-w-sm space-y-4">
        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 p-4 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Color_Icon.svg" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>

        <button 
          className="w-full flex items-center justify-center gap-3 bg-black text-white p-4 rounded-2xl font-bold active:scale-95 transition-all shadow-lg"
        >
          <LogIn className="w-5 h-5" />
          Login with Phone
        </button>
      </div>

      <p className="mt-8 text-xs text-gray-400 text-center px-10">
        ဆက်လက်လုပ်ဆောင်ခြင်းအားဖြင့် ကျွန်ုပ်တို့၏ <span className="underline">Terms of Service</span> ကို သဘောတူပြီးဖြစ်ပါသည်။
      </p>
    </div>
  );
}

