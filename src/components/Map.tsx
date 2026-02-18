"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Marker Icon လေးတွေ ပေါ်အောင် လုပ်ပေးခြင်း
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map() {
  const position: [number, number] = [16.8409, 96.1735]; // ရန်ကုန် တည်နေရာ

  return (
    <div className="h-[300px] w-full rounded-2xl overflow-hidden border border-gray-200">
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            YNS Taxi ရုံးချုပ် <br /> ရန်ကုန်မြို့။
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
