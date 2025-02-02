/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import MiniMap from "../map/googleMap";

export default function PlotMap({ latitude, longitude }: any) {
  return (
    <div className="map-container">
      <MiniMap latitude={latitude} longitude={longitude} />
    </div>
  );
}