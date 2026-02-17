"use client";
import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.log(err)
    );
  }, []);

  return coords;
};

