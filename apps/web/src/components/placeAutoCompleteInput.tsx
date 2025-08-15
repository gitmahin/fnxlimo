"use client";
import { Input, Label } from "@fnx/ui";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef, useState } from "react";

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
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const serviceRef = useRef<google.maps.places.AutocompleteService | null>(
    null
  );
  const placesLib = useMapsLibrary("places");

  // Initialize AutocompleteService
  useEffect(() => {
    if (!placesLib) return;
    serviceRef.current = new google.maps.places.AutocompleteService();
  }, [placesLib]);

  // Handle input changes
  const handleInputChange = (val: string) => {
    onChange(val);
    if (val && serviceRef.current) {
      serviceRef.current.getPlacePredictions({ input: val }, (preds) => {
        setPredictions(preds || []);
      });
    } else {
      setPredictions([]);
    }
  };

  // Handle place selection
  const handleSelect = (pred: google.maps.places.AutocompletePrediction) => {
    onChange(pred.description);
    setPredictions([]);

    if (!inputRef.current) return;

    const service = new google.maps.places.PlacesService(
      inputRef.current
    );
    service.getDetails({ placeId: pred.place_id }, (place) => {
      if (place) onPlaceSelect(place);
    });
  };

  return (
    <>
      <Label className="mb-1">{label}</Label>
       {/* Location type radio buttons */}
      <div className="flex justify-start items-center gap-3 mb-2 mt-1">
        {LOCATION_TYPE.map((item, i) => (
          <label key={i}>
            <input
              type="radio"
              name={`location-type-${id}`}
              id={`${i}-${item.value}`}
              value={item.value}
              className="peer hidden"
              defaultChecked={item.value === "search-all"}
            />
            <div className="peer-checked:bg-purple-600 cursor-pointer text-zinc-400 peer-checked:text-zinc-50 font-medium transition-colors rounded-[5px] px-2 py-0.5">
              <span className="text-[13px]">{item.label}</span>
            </div>
          </label>
        ))}
      </div>

      {/* Input */}
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder || "Search location"}
        className="w-full border px-2 py-1 rounded"
      />

      {/* Suggestions dropdown */}
      {predictions.length > 0 && (
        <ul className=" z-50 bg-white border w-full mt-1 rounded shadow-md max-h-60 overflow-auto">
          {predictions.map((pred) => (
            <li
              key={pred.place_id}
              className="px-2 py-1 hover:bg-purple-600 hover:text-white cursor-pointer"
              onClick={() => handleSelect(pred)}
            >
              {pred.description}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
