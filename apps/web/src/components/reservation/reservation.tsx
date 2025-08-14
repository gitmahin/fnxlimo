"use client";
import { useCallback, useEffect, useState } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@fnx/ui";
import { Clock, MapIcon, MapPin } from "lucide-react";
import { Calendar29 } from "@/app/(main)/price-quote/date-picker";
import { PlaceAutocompleteInput } from "../placeAutoCompleteInput";
import { Button } from "@radix-ui/themes";
import { PassengerCounter } from "./passenger-counter";
import { BagsCounter } from "./bags-counter";
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

  useEffect(() => {
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

  const panToCurrentLocation = useCallback(() => {
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
            content: "You current location",
            position: pos,
          }).open(map);
        },
        () => {}
      );
    } else {
    }
  }, []);

  useEffect(() => {
    panToCurrentLocation();
  }, []);

  return (
    <Button
      color="gray"
      variant="surface"
      radius="large"
      className="!p-2 !rounded-lg !cursor-pointer"
      onClick={panToCurrentLocation}
    >
      <MapPin size={24} />
    </Button>
  );
};

export const Reservation = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showDirections, setShowDirections] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDirections(true);
  };
  return (
    <div className="w-full h-full grid grid-cols-2 ">
      <div className="border-r h-full">
        <Tabs defaultValue="transfer">
          <TabsList className="mx-5 my-5">
            <TabsTrigger value="transfer">
              <MapPin size={18} />
              Transfer
            </TabsTrigger>
            <TabsTrigger value="hourly">
              <Clock size={18} />
              Hourly
            </TabsTrigger>
          </TabsList>
          <TabsContent value="transfer">
            <Card className="!p-0 !rounded-none !border-0">
              <CardHeader>
                <CardTitle>Transfer</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="!p-0 overflow-y-auto h-full">
                <div className="px-5">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Location Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Location Types</SelectLabel>
                        <SelectItem value="search-all">Search All</SelectItem>
                        <SelectItem value="address">Address</SelectItem>
                        <SelectItem value="airport">Airport</SelectItem>
                        <SelectItem value="landmark">Landmark</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center items-center gap-5 p-5 w-full">
                  <div className="w-full ">
                    <Label className="mb-1">Pickup Date</Label>
                    <Calendar29 />
                  </div>

                  <div className="shrink-0">
                    <Label>Pickup Time</Label>

                    <Input
                      type="time"
                      id="time-picker"
                      step="1"
                      defaultValue="10:30:00"
                      className="bg-background appearance-none mt-1 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </div>
                </div>

                <div className="w-full h-fit px-5">
                  <div>
                    <Label className="mb-1">Pickup Location:</Label>
                    <PlaceAutocompleteInput
                      value={origin}
                      onChange={setOrigin}
                      onPlaceSelect={(place) => {
                        // Optional: Use place.geometry?.location for lat/lng
                      }}
                      placeholder="Type origin"
                    />
                  </div>
                  <div className="mt-5">
                    <Label className="mb-1">Dropoff Location:</Label>
                    <PlaceAutocompleteInput
                      value={destination}
                      onChange={setDestination}
                      onPlaceSelect={(place) => {
                        // Optional: Use place.geometry?.location for lat/lng
                      }}
                      placeholder="Type destination"
                    />
                  </div>
                </div>

                <div className="w-full flex justify-start items-center gap-5 px-5 py-5">
                  <div>
                    <Label className="mb-1">Passengers</Label>
                    <PassengerCounter />
                  </div>
                  <div>
                    <Label className="mb-1">Bags</Label>
                    <BagsCounter />
                  </div>
                </div>
                <div className="w-full flex justify-start items-center gap-5 px-5 py-5">
                  <div>
                    <Label className="mb-1">Passengers</Label>
                    <PassengerCounter />
                  </div>
                  <div>
                    <Label className="mb-1">Bags</Label>
                    <BagsCounter />
                  </div>
                </div>
                <div className="w-full flex justify-start items-center gap-5 px-5 py-5">
                  <div>
                    <Label className="mb-1">Passengers</Label>
                    <PassengerCounter />
                  </div>
                  <div>
                    <Label className="mb-1">Bags</Label>
                    <BagsCounter />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="hourly">
            <Card className="!p-0 !rounded-none !border-0">
              <CardHeader>
                <CardTitle>Hourly</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="!p-0 ">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Current password</Label>
                  <Input id="tabs-demo-current" type="password" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">New password</Label>
                  <Input id="tabs-demo-new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="h-full">
        <APIProvider apiKey={""}>
          <Map
            mapId={"price_map"}
            style={{ width: "100%", height: "100%" }}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            colorScheme="DARK"
            gestureHandling={"greedy"}
          >
            {showDirections && origin && destination && (
              <DirectionsController origin={origin} destination={destination} />
            )}
            <div className="absolute left-5 bottom-5 z-50  w-fit h-fit p-2">
              <PanToCurrentLocationButton />
            </div>
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};
