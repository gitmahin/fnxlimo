"use client";
import { Input, Label } from "@fnx/ui";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef } from "react";

type Props = {
  value: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  id: string
};

type LocationType = {
  label: string;
  value: string;
};

const LOCATION_TYPE: LocationType[] = [
  {
    label: "Search all",
    value: "search-all",
  },
  {
    label: "Airport",
    value: "airport",
  },
  {
    label: "Address",
    value: "address",
  },
  {
    label: "Landmark",
    value: "landmark",
  },
];

export const PlaceAutocompleteInput = ({
  value,
  onChange,
  onPlaceSelect,
  placeholder,
  label,
  id
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete>(null);
  const placesLib = useMapsLibrary("places"); // 🟢 Wait for the places lib

  useEffect(() => {
    if (!inputRef.current || autocompleteRef.current || !placesLib) return;

    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current!,
      {
        types: ["geocode"], // Or '(cities)' or leave blank
      }
    );

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
    <>
      <Label className="mb-1">{label}</Label>
      <div className="flex justify-start items-center gap-3 mb-2 mt-1">
        {LOCATION_TYPE.map((item, i) => {
          return (
            <label>
              <input
                type="radio"
                name={`location-type-${id}`}
                id={`${i}-${item.value}`}
                value={item.value}
                className="peer hidden"
                defaultChecked={item.value == "search-all"}
              />
              <div className="peer-checked:bg-purple-600 cursor-pointer text-zinc-400 peer-checked:text-zinc-50 font-medium transition-colors rounded-[5px] px-2 py-0.5">
                <span className="text-[13px]">{item.label}</span>
              </div>
            </label>
          );
        })}
      </div>
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search location"}
        className="w-full border px-2 py-1 rounded"
      />
    </>
  );
};
