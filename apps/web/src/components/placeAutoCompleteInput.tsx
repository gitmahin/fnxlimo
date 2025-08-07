"use client"
import { Input } from "@fnx/ui";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef } from "react";

type Props = {
  value: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const PlaceAutocompleteInput = ({ value, onChange, onPlaceSelect, placeholder }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete>(null);
  const placesLib = useMapsLibrary("places"); // 🟢 Wait for the places lib

  useEffect(() => {
    if (!inputRef.current || autocompleteRef.current || !placesLib) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current!, {
      types: ["geocode"], // Or '(cities)' or leave blank
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place) {
        onChange(place.formatted_address || "");
        onPlaceSelect(place);
      }
    });

    autocompleteRef.current = autocomplete;
  }, [placesLib]); // 🔁 Wait until 'places' is loaded

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Search location"}
      className="w-full border px-2 py-1 rounded"
    />
  );
};
