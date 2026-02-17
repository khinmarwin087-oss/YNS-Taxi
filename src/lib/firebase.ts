import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "သင်၏_API_KEY",
    authDomain: "သင်၏_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://သင်၏_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "သင်၏_PROJECT_ID",
    storageBucket: "သင်၏_PROJECT_ID.appspot.com",
    messagingSenderId: "သင်၏_SENDER_ID",
    appId: "သင်၏_APP_ID"
};

// Next.js မှာ Firebase ကို double initialize မဖြစ်အောင် စစ်ပြီးမှ သုံးမယ်
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const rtdb = getDatabase(app);
export const db = getFirestore(app);
export default app;
