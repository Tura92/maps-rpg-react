import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

interface Business {
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

const MapWithBusinesses: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  });

  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [businesses, setBusinesses] = useState<Business[]>([]);

  const onMapClick = useCallback(async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPosition({ lat, lng });

      const response = await fetch(
        `/api/places?lat=${lat}&lng=${lng}&radius=500&apiKey=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );

      // Check the status and content type of the response
      if (
        response.ok &&
        response.headers.get("content-type")?.includes("application/json")
      ) {
        const data = await response.json();
        const businessesList: Business[] = data.results.map((result: any) => ({
          name: result.name,
          address: result.vicinity,
          location: {
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
          },
        }));

        setBusinesses(businessesList);
        console.log(businessesList);
      } else {
        console.error(
          "Error fetching data from the server",
          await response.text()
        );
      }
    }
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={15}
      onClick={onMapClick}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  );
};

export default MapWithBusinesses;
