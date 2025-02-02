"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React from "react";

type MiniMapProps = {
  latitude: number;
  longitude: number;
};

const containerStyle = {
  width: "400px",
  height: "300px",
};

export default function MiniMap({ latitude, longitude }: MiniMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBroQ7_kPM2-sU9l10CXHsNbFgskViNqnI", // Reemplaza con tu clave de API
  });

  if (!isLoaded) return <p>Cargando mapa...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: latitude, lng: longitude }}
      zoom={15} // Zoom del mapa
    >
      {/* Agrega un marcador en la posición */}
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
}