"use client";
import React, { useRef, useState } from "react";
import { TogglePQType } from "./toggle-pg-type";
import {  Input, Label } from "@fnx/ui";
import {Button} from "@radix-ui/themes"
import { Calendar29 } from "./date-picker";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { MapIcon, MapPin } from "lucide-react";
import { PlaceAutocompleteInput } from "../../components";

let directionsRenderer: google.maps.DirectionsRenderer | null = null;
let directionsService: google.maps.DirectionsService | null = null;

const DirectionsController = ({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}) => {
  const map = useMap();

  React.useEffect(() => {
    if (!map || !origin || !destination) return;

    if (!directionsService) {
      directionsService = new google.maps.DirectionsService();
    }

    if (!directionsRenderer) {
      directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
    }

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer?.setDirections(result);
        } else {
          alert("Directions request failed due to " + status);
        }
      }
    );
  }, [origin, destination, map]);

  return null;
};

const PanToCurrentLocationButton = () => {
  const map = useMap(); // this gets the current map instance

  const panToCurrentLocation = () => {
    if (!map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.panTo(pos);
          map.setZoom(14);

          new google.maps.InfoWindow({
            content: "Location found.",
            position: pos,
          }).open(map);
        },
        () => {
          alert("Error: The Geolocation service failed.");
        }
      );
    } else {
      alert("Error: Your browser doesn't support geolocation.");
    }
  };

  return (
    <Button onClick={panToCurrentLocation}>
      <MapPin size={24} />
    </Button>
  );
};

const PriceQuote = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showDirections, setShowDirections] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDirections(true);
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className=" flex justify-center gap-5 items-center w-full defualt_layout_width">
        <div className=" w-full border rounded-2xl h-fit ">
          <div className="px-5 py-5 flex justify-between items-start">
            <h2 className="text-xl font-medium">Price Quote</h2>
            <div>
              <TogglePQType />
            </div>
          </div>

          <div className="border-t flex justify-center items-center gap-5 px-5 py-5 border-b">
            <Calendar29 />

            <div className="flex flex-col gap-3">
              <Input
                type="time"
                id="time-picker"
                step="1"
                defaultValue="10:30:00"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-1">
            <label className="px-3 py-3 rounded-md border ">
              Origin:

              <PlaceAutocompleteInput
              value={origin}
              onChange={setOrigin}
              onPlaceSelect={(place) => {
                // Optional: Use place.geometry?.location for lat/lng
              }}
              placeholder="Type origin"
            />
            </label>
            <label className="px-3 py-3 rounded-md border ">
              Destination:
              <PlaceAutocompleteInput
              value={destination}
              onChange={setDestination}
              onPlaceSelect={(place) => {
                // Optional: Use place.geometry?.location for lat/lng
              }}
              placeholder="Type destination"
            />
            </label>
            <div className="pb-0.5 px-0.5">

           <Button radius="large">
Get Directions
           </Button>
              </div>
          </form>
        </div>
        <div className="max-w-[500px] pt-[64px] h-screen w-full border">
          <div className="w-full h-[50px] px-4 flex justify-start items-center border-b bg-accent">
            <h2 className="text-xl font-medium">Route Map</h2>
          </div>
          <div className="h-[calc(100vh-115px)] relative">
            <APIProvider apiKey={""}>
              <Map
                mapId={"price_map"}
                style={{ width: "100%", height: "100vh" }}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={3}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
              >
                {showDirections && origin && destination && (
                  <DirectionsController
                    origin={origin}
                    destination={destination}
                  />
                )}
                <div className="absolute left-[100%] top-5 z-50  w-fit h-fit p-2">
                  <div className="border rounded-md bg-accent p-1 ">
                    <PanToCurrentLocationButton />
                  </div>
                </div>
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceQuote;
