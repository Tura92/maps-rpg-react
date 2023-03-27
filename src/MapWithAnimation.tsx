import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

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

const MapWithAnimation: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  const [markerPositions, setMarkerPositions] = useState<MarkerPosition[]>([]);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      if (markerPositions.length === 2) {
        setMarkerPositions([{ lat, lng }]);
      } else {
        setMarkerPositions([...markerPositions, { lat, lng }]);
      }
    } else {
      console.log("Error while setting marker!");
    }
  };

  const handleStartButtonClick = () => {
    if (markerPositions.length !== 2) {
      alert("Please select two markers on the map first.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const origin = new google.maps.LatLng(
      markerPositions[0].lat,
      markerPositions[0].lng
    );
    const destination = new google.maps.LatLng(
      markerPositions[1].lat,
      markerPositions[1].lng
    );
    const request = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
      }
    });
  };

  return isLoaded ? (
    <>
      <GoogleMap
        id="animation-example"
        mapContainerStyle={containerStyle}
        zoom={2}
        center={center}
        onClick={handleMapClick}
      >
        {markerPositions.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <button onClick={handleStartButtonClick}>Start</button>
    </>
  ) : (
    <></>
  );
};

export default MapWithAnimation;
