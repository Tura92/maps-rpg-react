import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

interface MapProps {
  lat: number;
  lng: number;
  zoom: number;
}

const Map: React.FC<MapProps> = ({ lat, lng, zoom }) => {
  const containerStyle = {
    width: "100%",
    height: "800px",
  };

  const center = {
    lat,
    lng,
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        {/* Add your map markers, overlays, and other components here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
