import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDe5bR1dlr_CD5pI8JE7RF0fJ9qJ0FL2Ew",
  authDomain: "yns-taxi.firebaseapp.com",
  databaseURL: "https://yns-taxi-default-rtdb.asia-southeast1.firebasedatabase.app/", 
  projectId: "yns-taxi",
  storageBucket: "yns-taxi.firebasestorage.app",
  messagingSenderId: "390164927701",
  appId: "1:390164927701:web:4769bafcc71d440e5b3e5c",
  measurementId: "G-LYHNB3B9HZ"
};


// Next.js မှာ Firebase တစ်ကြိမ်ထက်ပိုပြီး initialize မဖြစ်အောင် စစ်ဆေးခြင်း
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const rtdb = getDatabase(app);
export const db = getFirestore(app);

export default app;
