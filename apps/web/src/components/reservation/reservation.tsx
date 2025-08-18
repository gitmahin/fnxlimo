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
  Button as FnxButton,
  RadioGroup,
  RadioGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@fnx/ui";
import {
  Clock,
  MapIcon,
  MapPin,
  MapPinMinusInside,
  MapPinPlus,
  MapPinPlusInside,
} from "lucide-react";
import { Calendar29 } from "@/components/date-picker";
import { PlaceAutocompleteInput } from "../placeAutoCompleteInput";
import { Button } from "@radix-ui/themes";
import { PassengerCounter } from "./passenger-counter";
import { BagsCounter } from "./bags-counter";
let directionsRenderer: google.maps.DirectionsRenderer | null = null;
let directionsService: google.maps.DirectionsService | null = null;
import { v4 as uuidv4 } from "uuid";
import { QuickReservation } from "./quick-reservation";
import { ValueOf } from "next/dist/shared/lib/constants";
import { TripDurationHours, TripDurationMins } from "./trip-duration";

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
      <MapPin size={24} className="text-zinc-50" />
    </Button>
  );
};

enum tripTimeCalculation {
  TRIP_HOURS = "TRIP_HOURS",
  DROP_OFF_TIME = "DROP_OFF_TIME",
}

enum priceQuoteTypeEnums {
  TRANSFER = "TRANSFER",
  HOURLY = "HOURLY",
}

export const Reservation = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showDirections, setShowDirections] = useState(false);
  const [stops, setStops] = useState<{ id: string; value: string }[]>([]);
  const [priceQuoteType, setPriceQuoteType] =
    useState<keyof typeof priceQuoteTypeEnums>("TRANSFER");

  const [tripTimeCal, setTripTimeCal] =
    useState<keyof typeof tripTimeCalculation>("TRIP_HOURS");

  const handleAddStop = () => {
    setStops((prev) => [...prev, { id: uuidv4(), value: "" }]);
  };

  const handleRemoveStop = (id: string) => {
    setStops((prev) => prev.filter((item) => id !== item.id));
  };

  const handleChange = (id: string, newValue: string) => {
    setStops((prev) =>
      prev.map((stop) => (stop.id === id ? { ...stop, value: newValue } : stop))
    );
  };

  const handlePlaceSelect = (id: string, place: any) => {
    console.log("Stop ID:", id, "Place:", place);
    // you can store place data per stop if needed
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDirections(true);
  };
  return (
    <div className="w-full h-full grid grid-cols-2 reservation-box ">
      <div className="h-full rmap">
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
      <div className="border-r h-full overflow-y-auto ">
        <Tabs defaultValue="price-quote">
          <TabsList className="mx-5 my-5 sticky top-5 z-20">
            <TabsTrigger value="price-quote">Price Quote</TabsTrigger>
            <TabsTrigger value="quick-receipt">Quick Receipt</TabsTrigger>
          </TabsList>

          <TabsContent value="price-quote">
            <Card className="!p-0 !rounded-none !border-0">
              <CardHeader>
                <CardTitle>Price Quote</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
                <div className="shrink-0 mt-5">
                  <RadioGroup
                    defaultValue={`${priceQuoteTypeEnums.TRANSFER}`}
                    onValueChange={(value: string) =>
                      setPriceQuoteType(value as priceQuoteTypeEnums)
                    }
                    className="flex justify-start items-center gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={`${priceQuoteTypeEnums.TRANSFER}`}
                        id="r1"
                      />
                      <Label htmlFor="r1">
                        <MapPin size={18} /> Transfer
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={`${priceQuoteTypeEnums.HOURLY}`}
                        id="r2"
                      />
                      <Label htmlFor="r2">
                        <Clock size={18} />
                        Hourly
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardHeader>
              <CardContent className="!p-0 overflow-y-auto h-full">
                
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

                {priceQuoteType === priceQuoteTypeEnums.HOURLY && (
                  <div className="w-full px-5 mb-10">
                    <div className="flex justify-start items-center gap-3">
                      <Label>Trip calculation</Label>
                      <RadioGroup
                        defaultValue={`${tripTimeCalculation.TRIP_HOURS}`}
                        onValueChange={(value: string) =>
                          setTripTimeCal(value as tripTimeCalculation)
                        }
                        className="flex justify-start items-center gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value={`${tripTimeCalculation.TRIP_HOURS}`}
                            id="t1"
                          />
                          <Label htmlFor="t1">Trip Hours</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value={`${tripTimeCalculation.DROP_OFF_TIME}`}
                            id="t2"
                          />
                          <Label htmlFor="t2">Dropoff Time</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {tripTimeCal === "TRIP_HOURS" ? (
                      <div className="w-full flex justify-start items-center mt-5 gap-5">
                        <div>
                          <Label className="mb-1 text-zinc-400">
                            Trip Duration Hours:
                          </Label>
                          <TripDurationHours />
                        </div>
                        <div>
                          <Label className="mb-1 text-zinc-400">
                            Trip Duration Mins:
                          </Label>
                          <TripDurationMins />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-start items-center gap-5 mt-5">
                        <div>
                          <Label className="mb-1 text-zinc-400">Dropoff Date: </Label>
                          <Calendar29 />
                        </div>
                        <div>
                          <Label className="mb-1 text-zinc-400">Dropoff Time: </Label>
                          <Input
                            type="time"
                            id="dropoff-time-picker"
                            step="1"
                            defaultValue="10:30:00"
                            className="bg-background appearance-none mt-1 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="w-full h-fit px-5">
                  <div>
                    <PlaceAutocompleteInput
                      id="pickup"
                      label="Pickup Location:"
                      value={origin}
                      onChange={setOrigin}
                      onPlaceSelect={(place) => {
                        // Optional: Use place.geometry?.location for lat/lng
                      }}
                      placeholder="Type origin"
                    />
                  </div>
                  <div className="mt-5 relative">
                    <div className="w-[1.5px] h-[calc(100%-50px)] bg-purple-600 absolute top-0 left-[15px]"></div>
                    {stops &&
                      stops.map((stop) => (
                        <div className="mb-5 relative pl-10" key={`${stop.id}`}>
                          <div
                            onClick={() => handleRemoveStop(stop.id)}
                            className="absolute group top-1/2 -translate-y-1/2 left-0 bg-purple-900 hover:bg-red-600 transition-colors flex justify-center items-center w-[30px] h-[30px] rounded-full"
                          >
                            <MapPinPlusInside
                              size={16}
                              className="group-hover:hidden"
                            />
                            <MapPinMinusInside
                              size={16}
                              className="hidden group-hover:flex "
                            />
                          </div>
                          <PlaceAutocompleteInput
                            key={stop.id}
                            id={`stop-${stop.id}`}
                            label="Stop Location:"
                            value={stop.value}
                            onChange={(val) => handleChange(stop.id, val)}
                            onPlaceSelect={(place) =>
                              handlePlaceSelect(stop.id, place)
                            }
                            placeholder="Type stop location"
                          />
                        </div>
                      ))}

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <FnxButton
                          type="button"
                          onClick={handleAddStop}
                          variant={"default"}
                          className="!rounded-full !w-[30px] !h-[30px] flex justify-center items-center !p-0 !bg-emerald-500 hover:!bg-emerald-600 active:ring-4 ring-emerald-800 text-zinc-950"
                        >
                          <MapPinPlus size={18} />
                        </FnxButton>
                      </TooltipTrigger>
                      <TooltipContent align="start">
                        <p>Add Stop Location</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="mt-5">
                    <PlaceAutocompleteInput
                      id="dropoff"
                      label="Dropoff Location:"
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
                <div className="p-5 pt-0 flex justify-center items-center gap-5">
                  <FnxButton variant="destructive" className="!w-full shrink">
                    Cancel
                  </FnxButton>
                  <FnxButton variant="secondary" className="!w-full shrink">
                    Get Quote
                  </FnxButton>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="quick-receipt">
            <Card className="!p-0 !rounded-none !border-0">
              <CardHeader>
                <CardTitle>Quick Receipt</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="!p-0 ">
                <QuickReservation />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
