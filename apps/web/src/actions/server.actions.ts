"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connDb from "@/lib/connDb";
import { LocationType } from "@/models/reservation.model";
import {
  CreateUserReservationType,
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
      session.user.id
    );
    return { data: response };
  } catch (error) {
    return { error: "Error" };
  }
}

export async function updateReservationAction(data: UpdateOrderDataTypes) {
  try {
    const reservationService = new ReservationService();
    const session = await getServerSession(authOptions);
    if (!session) {
      return { error: "Invalid user" };
    }
    await reservationService.updateReservation(data);
    return { message: "success" };
  } catch (error) {
    return { error: "Error" };
  }
}
