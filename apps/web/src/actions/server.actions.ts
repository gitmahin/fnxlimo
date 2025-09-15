"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connDb from "@/lib/connDb";
import { LocationType } from "@/models/reservation.model";
import {
  CreateUserReservationType,
  ResendService,
  ReservationService,
  UpdateOrderDataTypes,
} from "@/services";
import { ObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function checkServerhealth() {
  await connDb();
  return { message: "OK" };
}

export async function createReservation({
  reserverd_car_woo_id,
  pickup_date,
  pickup_time,
  pickup_location,
  dropoff_location,
  stop_locations,
  passenger,
  bags,
}: Omit<CreateUserReservationType, "objectId">) {
  try {
    const session = await getServerSession(authOptions);
    const reservationService = new ReservationService();
    await reservationService.createUserReservation({
      dropoff_location: pickup_location as LocationType,
      pickup_location: dropoff_location as LocationType,
      objectId: session.user.id,
      pickup_date: pickup_date,
      pickup_time: String(pickup_time) || "",
      reserverd_car_woo_id: String(reserverd_car_woo_id),
      stop_locations: stop_locations as LocationType[],
      passenger: passenger,
      bags: bags,
    });

    return { message: "Reservation Created" };
  } catch (error) {
    console.log(error);
    return { error: "SERVER ERROR" };
  }
}

export async function getSingleUserReservationAction() {
  try {
    const reservationService = new ReservationService();
    const session = await getServerSession(authOptions);
    if (!session) {
      return { error: "Invalid user" };
    }
    const response = await reservationService.getUserSingleReservation(
      session.user.id,
    );
    const plain = JSON.parse(JSON.stringify(response));
    return { data: plain };
  } catch (error) {
    return { error: "Error" };
  }
}

export async function updateReservationAction(data: UpdateOrderDataTypes) {
  try {
    const reservationService = new ReservationService();
    const resend = new ResendService();
    const session = await getServerSession(authOptions);
    if (!session) {
      return { error: "Invalid user" };
    }
    await reservationService.updateReservation(data, session.user.id);


    await resend.sendOrderConfirmationEmail(
      "Reservation Confirmed",
      "reservation",
      {
        name: session.user.name,
        email: session.user.email,
        subject: "Your reservation has been confirmed successfully",
      },
      {
        pickup_date: data.pickup_date.toString(),
        pickup_time: data.pickup_time.toString(),
        pickup_location: data.pickup_location.toString(),
        dropoff_location: data.dropoff_location.toString(),
        passenger: data.passenger.toString(),
        bags: data.bags.toString(),
        order_id: data?.order_id?.toString(),
      },
    );

    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { error: "Error" };
  }
}


export async function deleteReservationById(_id: string) {
  try {
    if(!_id) return {error: "Reservation id not provided"}
    const session = await getServerSession(authOptions)
    if(!session) {
      return {error: "Unauthorized User"}
    }
    const reservationService = new ReservationService()
    await reservationService.deleteUserReservations(_id, session.user.id)
    return {message: "Deleted Reservation successfully"}
  } catch (error) {
    return {error: "Server error"}
  }
}