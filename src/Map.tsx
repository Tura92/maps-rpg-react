import React, { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

interface MapProps {
  lat: number;
  lng: number;
  zoom: number;
}

const Map: React.FC<MapProps> = ({ lat, lng, zoom }) => {
  useEffect(() => {
    const map = new window.google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat, lng },
        zoom,
      }
    );
  }, [lat, lng, zoom]);

  return <div id="map" style={{ height: "1000px", width: "100%" }}></div>;
};

export default Map;
