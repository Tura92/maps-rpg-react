import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface MarkerPosition {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: "100%",
  height: "800px",
};

const center = {
  lat: 0,
  lng: 0,
};

const Map: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  const [markerPositions, setMarkerPositions] = useState<MarkerPosition[]>([]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log(`Marker added at (${lat}, ${lng})`);
      setMarkerPositions((positions) => [{ lat, lng }]);
    } else {
      console.log("An issue occured!");
    }
  };

  return isLoaded ? (
    <GoogleMap
      id="marker-example"
      mapContainerStyle={containerStyle}
      zoom={2}
      center={center}
      onClick={handleMapClick}
    >
      {markerPositions.map((position, index) => (
        <Marker key={index} position={position} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
