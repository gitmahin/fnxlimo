"use client";

import { useReverseGeocode } from "@/hooks";
import { reservationServiceStore } from "@/services/store";
import { reservationSchema, ReservationType } from "@/types/reservation";
import { gql, useQuery } from "@apollo/client";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  useIsMobile,
} from "@fnx/ui";
import { observer } from "mobx-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import z from "zod";

const GetUserSingleReservations = gql`
  query GetUserSingleReservationQuery {
    queryUserSingleReservationOrderedData {
      bags
      createdAt
      passenger
      pickup_date
      pickup_time
      reserverd_car_woo_id
      stop_locations {
        lat
        lng
      }
      pickup_location {
        lat
        lng
      }
      dropoff_location {
        lat
        lng
      }
      car_details {
        brands {
          name
        }
        images {
          src
          name
          alt
        }
        name
        price
        sale_price
        status
        total_sales
        stock_quantity
        id
      }
      _id
    }
  }
`;

export const TableCellViewer = observer(() => {
  const isMobile = useIsMobile();

  const { data, error, loading } = useQuery(GetUserSingleReservations, {
    variables: {
      id: reservationServiceStore.reservationID,
    },
  });

  const [reservationData, setReservationData] = useState<ReservationType>();

  useEffect(() => {
    if (!loading) {
      setReservationData(data.queryUserSingleReservationOrderedData);
    }
  }, [data]);

  const pickupLocation = useReverseGeocode(
    Number(reservationData?.pickup_location.lat),
    Number(reservationData?.pickup_location.lng),
  );

  const dropOff = useReverseGeocode(
    Number(reservationData?.dropoff_location.lat),
    Number(reservationData?.dropoff_location.lng),
  );

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={reservationServiceStore.reservationID !== ""}
    >
      <DrawerContent draggable={false}>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{reservationData?.car_details.name}</DrawerTitle>
          <DrawerDescription>
            Details about {reservationData?.car_details.name}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <Image
            src={reservationData?.car_details.images[0]?.src || ""}
            alt={reservationData?.car_details.images[0]?.alt || ""}
            className="object-cover object-center w-full h-[250px]"
          />
          {loading && <p>Loading...</p>}
          <div>
            <p className="text-zinc-400 font-medium">Car Details</p>
            <div>
              <ul className="text-[17px] mt-2">
                <li>Passangers: {reservationData?.passenger}</li>
                <li>Bags: {reservationData?.bags}</li>
              </ul>
            </div>

            <p className="mt-5 text-zinc-400 font-medium">Location Details</p>
            <div>
              <ul className="text-[17px] mt-2">
                <li>Pickup Time: {reservationData?.pickup_time}</li>
                <li>Pickup From: {pickupLocation}</li>
                <li>Drop Off: {dropOff}</li>
              </ul>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Ok</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
