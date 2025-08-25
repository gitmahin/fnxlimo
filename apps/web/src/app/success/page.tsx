"use client";
import {
  getSingleUserReservationAction,
  updateReservationAction,
} from "@/actions/server.actions";
import { useReverseGeocode } from "@/hooks";
import { UpdateOrderDataTypes } from "@/services";
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
  const {data: session, status} = useSession()

  const handleGetSingleReservation = async () => {
    try {
      setLoading(true);
  
      const response = await getSingleUserReservationAction();
      if (response.error) {
        toast.error("Invalid user");
      }
      setData(response.data);
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateReservation = async () => {
    setLoading(true);
    const dropoff_location = useReverseGeocode(
      data.dropoff_location.lat,
      data.dropoff_location.lng
    );

    const pickup_location = useReverseGeocode(
      data.pickup_location.lat,
      data.pickup_location.lng
    );

    const pickupDate = new Date(data.pickup_date);

    // Format as human-readable string
    const humanReadableDate = pickupDate.toLocaleDateString("en-US", {
      weekday: "long", // "Wednesday"
      year: "numeric",
      month: "long", // "August"
      day: "numeric", // "27"
    });

    const modifiedData: UpdateOrderDataTypes = {
      order_id: Number(order_id),
      bags: data.bags,
      dropoff_location,
      passenger: data.passenger,
      pickup_date: humanReadableDate,
      pickup_time: data.pickup_time,
      pickup_location,
      product_id: data.reserverd_car_woo_id,
    };

    try {
      const response = await updateReservationAction(modifiedData);
      if (response.message) {
        toast.success("Reservation created success");
        router.push("/auth/login");
      } else {
        toast.error("Cannot create reservation");
      }
    } catch (error) {
         console.log(error)
      toast.error("Something went wrong");
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("order id", order_id)
    handleGetSingleReservation();
  }, []);

  useEffect(() => {
    handleUpdateReservation();
  }, [data]);

  return (
    <div className="w-full flex justify-center items-center mt-24 ">
      {loading ? (
        <p className="text-center w-full mt-5 mb-10">Loading...</p>
      ) : (
        <p className="text-center w-full mt-5 mb-10">
          Reservation created success
        </p>
      )}
    </div>
  );
}
