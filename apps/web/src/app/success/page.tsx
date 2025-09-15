"use client";
import {
  getSingleUserReservationAction,
  updateReservationAction,
} from "@/actions/server.actions";
import { useReverseGeocode } from "@/hooks";
import { UpdateOrderDataTypes } from "@/services";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const params = useSearchParams();
  const router = useRouter();
  const order_id = params.get("order");
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const geocodingLibrary = useMapsLibrary("geocoding");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");

  const handleGetSingleReservation = async () => {
    try {
      setLoading(true);

      const response = await getSingleUserReservationAction();
      if (response.error) {
        toast.error("Invalid user");
      }
      console.log("data mahin", response.data);
      setData(response.data);
    } catch (error) {
  
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateReservation = async () => {
    setLoading(true);
    try {
      const pickupDate = new Date(data.pickup_date);

      // Format as human-readable string
      const humanReadableDate = pickupDate.toLocaleDateString("en-US", {
        weekday: "long", // "Wednesday"
        year: "numeric",
        month: "long", // "August"
        day: "numeric", // "27"
      });

      const modifiedData: UpdateOrderDataTypes = {
        order_id: Number(order_id || 0),
        bags: data.bags,
        dropoff_location: dropoffAddress,
        passenger: data.passenger,
        pickup_date: humanReadableDate,
        pickup_time: data.pickup_time,
        pickup_location: pickupAddress,
        product_id: data.reserverd_car_woo_id,
      };
      const response = await updateReservationAction(modifiedData);
      if (response.message) {
        toast.success("Reservation created success");
        router.push("/auth/login");
      } else {
        toast.error("Cannot create reservation");
      }
    } catch (error) {
  
      toast.error("Something went wrong");
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetSingleReservation();
  }, []);

  useEffect(() => {
    if (!geocodingLibrary || !data?.pickup_location || !data?.dropoff_location)
      return;

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode(
      {
        location: {
          lat: data.pickup_location.lat,
          lng: data.pickup_location.lng,
        },
      },
      (results, status) => {
        if (status === "OK" && results?.[0]) {
          setPickupAddress(results[0].formatted_address);
        }
      }
    );

    geocoder.geocode(
      {
        location: {
          lat: data.dropoff_location.lat,
          lng: data.dropoff_location.lng,
        },
      },
      (results, status) => {
        if (status === "OK" && results?.[0]) {
          setDropoffAddress(results[0].formatted_address);
        }
      }
    );
  }, [geocodingLibrary, data]);

useEffect(() => {
  const fetchAndUpdate = async () => {
    if (!order_id || !data?.bags || !pickupAddress || !dropoffAddress) return;
    await handleUpdateReservation();
  };
  fetchAndUpdate();
}, [order_id, data, pickupAddress, dropoffAddress]);

  return (
    <div className="w-full flex justify-center flex-col items-center mt-24 ">
      {loading ? (
        <p className="text-center w-full mt-5 mb-10">Loading...</p>
      ) : (
        <p className="text-center w-full mt-5 mb-10">
          Reservation created success
        </p>
      )}
      <p className="text-center text-[20px] font-medium  w-full mt-16 mb-10">
        Please Wait For A Moment! Do not Close the Browser Or Tab! Setting up
        order...
      </p>
    </div>
  );
}
