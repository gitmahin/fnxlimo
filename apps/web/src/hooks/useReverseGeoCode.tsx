import { useState, useEffect } from "react";

export const useReverseGeocode = (lat?: number, lng?: number) => {
  const [placeName, setPlaceName] = useState<string>("Loading...");

  useEffect(() => {
    if (lat == null || lng == null) {
      setPlaceName("Unknown location");
      return;
    }

    if (!window.google || !window.google.maps) {
      console.error("Google Maps JS API not loaded");
      setPlaceName("Unknown location");
      return;
    }

    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setPlaceName(results[0].formatted_address);
      } else {
        setPlaceName("Unknown location");
      }
    });
  }, [lat, lng]);

  return placeName;
};
