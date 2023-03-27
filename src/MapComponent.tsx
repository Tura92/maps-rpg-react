import React, { useEffect } from "react";

const MapComponent: React.FC = () => {
  let map: google.maps.Map;

  const initMap = (): void => {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  };

  return <div id="map" />;
};

export default MapComponent;
