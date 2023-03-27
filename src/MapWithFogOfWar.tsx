import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface MapProps {
  apiKey: string;
}

const MapWithFogOfWar: React.FC<MapProps> = ({ apiKey }) => {
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);
  const [map, setMap] = useState<google.maps.Map>();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const handleMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const handleMarkerClick = (marker: google.maps.Marker) => {
    const markerPosition = marker.getPosition()?.toJSON();
    if (markerPosition) {
      const newMarkers = [...markers, markerPosition];
      setMarkers(newMarkers);
      setFogOfWar(newMarkers);
    }
  };

  const setFogOfWar = (markers: google.maps.LatLngLiteral[]) => {
    if (!map) return;

    const mapCenter = map.getCenter()?.toJSON();

    markers.forEach((marker) => {
      const markerLatLng = new google.maps.LatLng(marker);
      const circle = new google.maps.Circle({
        center: markerLatLng,
        radius: 1000,
        map,
        fillColor: "#000000",
        fillOpacity: 0.8,
        strokeWeight: 0,
      });

      circle.addListener("click", () => {
        circle.setMap(null);
      });

      const bounds = circle.getBounds();

      if (mapCenter && bounds) {
        if (bounds.contains(mapCenter)) {
          map.panTo(markerLatLng);
        }
      }
    });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 51.5074, lng: 0.1278 }}
      zoom={10}
      onLoad={handleMapLoad}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker}
          // onClick={() => handleMarkerClick(marker)}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapWithFogOfWar;
