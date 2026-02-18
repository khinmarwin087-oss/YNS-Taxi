import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YNS Taxi",
  description: "Taxi Booking App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Leaflet မြေပုံအတွက် CSS ပါ တစ်ခါတည်း ထည့်ထားပေးပါတယ် */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
